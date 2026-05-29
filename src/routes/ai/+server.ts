import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { check as rateLimit } from '$lib/server/rate-limit';
import { buildSystemPrompt } from '$lib/server/system-prompt';
import type { RequestHandler } from './$types';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { role: ChatRole; content: string };

const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;
const UPSTREAM_TIMEOUT_MS = 25_000;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const ip = getClientAddress();
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return new Response(JSON.stringify({ error: 'rate_limit', retryAfterSec: limit.retryAfterSec }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(limit.retryAfterSec)
      }
    });
  }

  let payload: { messages?: unknown; locale?: unknown };
  try {
    payload = await request.json();
  } catch {
    throw error(400, 'invalid_json');
  }

  const locale = payload.locale === 'fi' ? 'fi' : 'en';
  const today = new Date().toISOString().slice(0, 10);

  const messages = payload.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    throw error(400, 'invalid_messages');
  }

  const cleaned: ChatMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== 'object') throw error(400, 'invalid_message_shape');
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== 'user' && role !== 'assistant') throw error(400, 'invalid_role');
    if (typeof content !== 'string' || content.length === 0 || content.length > MAX_CHARS) {
      throw error(400, 'invalid_content');
    }
    cleaned.push({ role, content });
  }

  const apiKey = env.MOONSHOT_API_KEY;
  if (!apiKey) {
    console.error('MOONSHOT_API_KEY is not set — /ai endpoint cannot reach the model.');
    throw error(500, 'missing_api_key');
  }
  const upstreamBody = {
    model: 'moonshot-v1-32k',
    stream: true,
    temperature: 0.4,
    max_tokens: 800,
    messages: [
      { role: 'system' as const, content: buildSystemPrompt({ locale, today }) },
      ...cleaned
    ]
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch('https://api.moonshot.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(upstreamBody),
      signal: controller.signal
    });
  } catch (e) {
    clearTimeout(timeout);
    console.error('Moonshot fetch failed', e);
    throw error(502, 'upstream_unreachable');
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout);
    const detail = await upstream.text().catch(() => '');
    console.error('Moonshot error', upstream.status, detail);
    throw error(502, 'upstream_error');
  }

  // Once we have a streaming response, the connect-timeout has done its job.
  // The stream itself can take as long as the model needs.
  clearTimeout(timeout);

  const stream = new ReadableStream<Uint8Array>({
    async start(controllerOut) {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      const reader = upstream.body!.getReader();
      let buf = '';

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buf.indexOf('\n')) >= 0) {
            const rawLine = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!rawLine.startsWith('data:')) continue;
            const data = rawLine.slice(5).trim();
            if (data === '[DONE]') {
              controllerOut.close();
              return;
            }
            try {
              const parsed = JSON.parse(data) as {
                choices?: { delta?: { content?: string } }[];
              };
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) controllerOut.enqueue(encoder.encode(delta));
            } catch {
              // Skip malformed SSE chunks rather than killing the stream.
            }
          }
        }
        controllerOut.close();
      } catch (e) {
        console.error('Stream pipe error', e);
        try {
          controllerOut.close();
        } catch {
          // already closed
        }
      }
    },
    cancel() {
      controller.abort();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no'
    }
  });
};
