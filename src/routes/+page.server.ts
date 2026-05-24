import { fail, type Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { CONTACT } from '$lib/content';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
  contact: async ({ request }) => {
    const data = await request.formData();
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const honeypot = String(data.get('website') ?? '');

    if (honeypot) return { success: true };

    const errors: Record<string, string> = {};
    if (!name) errors.name = 'required';
    if (!email) errors.email = 'required';
    else if (!EMAIL_RE.test(email)) errors.email = 'invalid';
    if (!message) errors.message = 'required';
    if (Object.keys(errors).length) {
      return fail(400, { errors, values: { name, email, message } });
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set — cannot send contact email.');
      return fail(502, { sendError: true, values: { name, email, message } });
    }

    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'junttila.dev <contact@junttila.dev>',
          to: [CONTACT.email],
          reply_to: email,
          subject: `junttila.dev — ${name}`,
          text: `${message}\n\n— ${name} <${email}>`
        })
      });
      if (!r.ok) {
        console.error('Resend error', r.status, await r.text());
        return fail(502, { sendError: true, values: { name, email, message } });
      }
    } catch (e) {
      console.error('Resend fetch failed', e);
      return fail(502, { sendError: true, values: { name, email, message } });
    }

    return { success: true };
  }
};
