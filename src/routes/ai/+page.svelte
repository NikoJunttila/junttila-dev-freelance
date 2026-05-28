<script lang="ts">
	import { page } from '$app/state';
	import { COPY, theme as th, type Lang } from '$lib/content';
	import { getLocale } from '$lib/paraglide/runtime';
	import LangSwitch from '$lib/components/LangSwitch.svelte';
	import FloatSticker from '$lib/components/FloatSticker.svelte';

	const lang = $derived(getLocale() as Lang);
	const t = $derived(COPY[lang]);
	const ogUrl = $derived(page.url.origin + page.url.pathname);

	type ChatMessage = { role: 'user' | 'assistant'; content: string };

	let messages = $state<ChatMessage[]>([]);
	let input = $state('');
	let streaming = $state(false);
	let errorMsg = $state<string | null>(null);
	let listEl: HTMLDivElement | undefined = $state();

	const userTurns = $derived(messages.filter((m) => m.role === 'user').length);
	const showCta = $derived(userTurns >= 2 && !streaming);
	const canSend = $derived(input.trim().length > 0 && input.length <= 1000 && !streaming);

	function scrollToBottom() {
		queueMicrotask(() => {
			if (listEl) listEl.scrollTop = listEl.scrollHeight;
		});
	}

	async function send() {
		const text = input.trim();
		if (!text || streaming) return;
		errorMsg = null;
		input = '';
		messages = [...messages, { role: 'user', content: text }, { role: 'assistant', content: '' }];
		streaming = true;
		scrollToBottom();

		try {
			const res = await fetch('/ai', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					locale: lang,
					messages: messages
						.slice(0, -1)
						.filter((m) => m.content.length > 0)
						.map((m) => ({ role: m.role, content: m.content }))
				})
			});

			if (res.status === 429) {
				errorMsg = t.ai.errorRateLimit;
				messages = messages.slice(0, -1);
				streaming = false;
				return;
			}
			if (!res.ok || !res.body) {
				errorMsg = t.ai.errorGeneric;
				messages = messages.slice(0, -1);
				streaming = false;
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value, { stream: true });
				if (!chunk) continue;
				const last = messages[messages.length - 1];
				messages[messages.length - 1] = { role: 'assistant', content: last.content + chunk };
				scrollToBottom();
			}
		} catch (e) {
			console.error(e);
			errorMsg = t.ai.errorGeneric;
			messages = messages.slice(0, -1);
		} finally {
			streaming = false;
		}
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}

	function clearChat() {
		if (streaming) return;
		messages = [];
		errorMsg = null;
	}

	function useExample(text: string) {
		if (streaming) return;
		input = text;
	}
</script>

<svelte:head>
	<title>{t.ai.title} · junttila.dev</title>
	<meta name="description" content={t.ai.sub} />
	<link rel="canonical" href={ogUrl} />
	<meta name="robots" content="noindex" />
</svelte:head>

<main
	style:min-height="100vh"
	style:background={th.bg}
	style:color={th.ink}
	style:font-family={th.body}
	style:position="relative"
	style:overflow="hidden"
>
	<header
		class="jd-ai-header"
		style:display="flex"
		style:align-items="center"
		style:justify-content="space-between"
		style:padding="20px 56px"
		style:gap="16px"
	>
		<div style:display="flex" style:align-items="center" style:gap="14px">
			<a
				href="/"
				class="jd-link"
				style:display="flex"
				style:align-items="center"
				style:text-decoration="none"
				style:color={th.ink}
				aria-label={t.blogBack}
			>
				<img
					src="/junttila_dev.webp"
					alt="junttila.dev"
					width="300"
					height="250"
					style:height="56px"
					style:width="auto"
					style:display="block"
				/>
			</a>
			<a
				href="/"
				class="jd-back-home"
				style:display="inline-flex"
				style:align-items="center"
				style:gap="4px"
				style:background={th.paper}
				style:color={th.ink}
				style:border="2px solid {th.ink}"
				style:border-radius="99px"
				style:padding="9px 16px"
				style:font-family={th.body}
				style:font-weight="700"
				style:font-size="13px"
				style:box-shadow="3px 3px 0 {th.ink}"
				style:text-decoration="none"
			>
				{t.blogBack}
			</a>
		</div>
		<div style:display="flex" style:gap="14px" style:align-items="center">
			<LangSwitch {lang} />
			<a
				href="/#contact"
				class="jd-btn"
				style:background={th.ink}
				style:color={th.paper}
				style:border="2px solid {th.ink}"
				style:border-radius="99px"
				style:padding="10px 18px"
				style:font-family={th.body}
				style:font-weight="700"
				style:font-size="13px"
				style:box-shadow="3px 3px 0 {th.sun}"
				style:text-decoration="none"
			>
				{t.nav.contact} →
			</a>
		</div>
	</header>

	<section class="jd-ai-wrap">
		<div
			style:position="absolute"
			style:right="-40px"
			style:top="120px"
			style:z-index="0"
			style:transform="rotate(10deg)"
		>
			<FloatSticker color={th.coral} text="AI" />
		</div>

		<div style:position="relative" style:z-index="1">
			<div
				style:display="inline-block"
				style:background={th.mint}
				style:padding="6px 14px"
				style:border-radius="99px"
				style:border="2px solid {th.ink}"
				style:font-family={th.body}
				style:font-size="12px"
				style:letter-spacing="1px"
				style:text-transform="uppercase"
				style:color={th.ink}
				style:font-weight="800"
				style:margin-bottom="18px"
			>
				{t.ai.kicker}
			</div>
			<h1
				class="jd-ai-h1"
				style:font-family={th.display}
				style:font-size="64px"
				style:line-height="1"
				style:letter-spacing="-1.5px"
				style:margin="0"
				style:font-weight="400"
				style:color={th.ink}
				style:max-width="760px"
			>
				{t.ai.title}
			</h1>
			<p
				style:font-family={th.body}
				style:font-size="17px"
				style:line-height="1.55"
				style:color={th.inkSoft}
				style:max-width="640px"
				style:margin-top="18px"
			>
				{t.ai.sub}
			</p>

			<div
				class="jd-ai-disclaimer"
				style:margin-top="24px"
				style:background={th.sun}
				style:border="2.5px solid {th.ink}"
				style:border-radius="14px"
				style:padding="12px 18px"
				style:font-size="14px"
				style:font-weight="600"
				style:max-width="720px"
				style:box-shadow="4px 4px 0 {th.ink}"
			>
				⚠️ {t.ai.disclaimer}
			</div>
		</div>

		<div
			class="jd-ai-chat"
			style:margin-top="36px"
			style:background={th.paper}
			style:border="2.5px solid {th.ink}"
			style:border-radius="22px"
			style:padding="22px"
			style:box-shadow="6px 7px 0 {th.ink}"
			style:max-width="720px"
			style:position="relative"
			style:z-index="1"
		>
			<div
				class="jd-ai-list"
				bind:this={listEl}
				style:display="flex"
				style:flex-direction="column"
				style:gap="14px"
				style:max-height="500px"
				style:overflow-y="auto"
				style:padding="4px"
			>
				<div
					class="jd-bubble jd-bubble-assistant"
					style:align-self="flex-start"
					style:background={th.bgAlt}
					style:border="2px solid {th.ink}"
					style:border-radius="16px 16px 16px 4px"
					style:padding="12px 16px"
					style:max-width="86%"
					style:font-size="15px"
					style:line-height="1.5"
				>
					{t.ai.intro}
				</div>

				{#if messages.length === 0}
					<div
						style:display="flex"
						style:flex-wrap="wrap"
						style:gap="8px"
						style:margin-top="6px"
						style:padding="0 4px"
					>
						{#each t.ai.examples as ex (ex)}
							<button
								type="button"
								class="jd-chip"
								onclick={() => useExample(ex)}
								style:background={th.paper}
								style:border="2px solid {th.ink}"
								style:border-radius="99px"
								style:padding="8px 14px"
								style:font-family={th.body}
								style:font-size="13px"
								style:font-weight="600"
								style:cursor="pointer"
								style:color={th.ink}
							>
								{ex}
							</button>
						{/each}
					</div>
				{/if}

				{#each messages as m, i (i)}
					<div
						class="jd-bubble"
						class:jd-bubble-user={m.role === 'user'}
						class:jd-bubble-assistant={m.role === 'assistant'}
						style:align-self={m.role === 'user' ? 'flex-end' : 'flex-start'}
						style:background={m.role === 'user' ? th.mint : th.bgAlt}
						style:border="2px solid {th.ink}"
						style:border-radius={m.role === 'user'
							? '16px 16px 4px 16px'
							: '16px 16px 16px 4px'}
						style:padding="12px 16px"
						style:max-width="86%"
						style:font-size="15px"
						style:line-height="1.5"
						style:white-space="pre-wrap"
					>
						{#if m.role === 'assistant' && m.content === '' && streaming}
							<span style:opacity="0.6" style:font-style="italic">{t.ai.thinking}</span>
						{:else}
							{m.content}
						{/if}
					</div>
				{/each}
			</div>

			{#if errorMsg}
				<div
					style:margin-top="14px"
					style:background={th.pink}
					style:border="2px solid {th.ink}"
					style:border-radius="12px"
					style:padding="10px 14px"
					style:font-size="14px"
					style:font-weight="600"
				>
					{errorMsg}
				</div>
			{/if}

			{#if showCta}
				<a
					href="/#contact"
					class="jd-btn jd-cta-pulse"
					style:display="inline-block"
					style:margin-top="14px"
					style:background={th.coral}
					style:color={th.paper}
					style:border="2.5px solid {th.ink}"
					style:border-radius="99px"
					style:padding="12px 22px"
					style:font-family={th.body}
					style:font-weight="800"
					style:font-size="14px"
					style:box-shadow="4px 4px 0 {th.ink}"
					style:text-decoration="none"
				>
					{t.ai.ctaContact}
				</a>
			{/if}

			<div
				class="jd-composer"
				style:margin-top="18px"
				style:display="flex"
				style:gap="10px"
				style:align-items="flex-end"
			>
				<textarea
					bind:value={input}
					onkeydown={onKey}
					placeholder={t.ai.placeholder}
					disabled={streaming}
					rows="2"
					maxlength="1000"
					class="jd-input jd-textarea"
					style:flex="1"
				></textarea>
				<button
					type="button"
					onclick={send}
					disabled={!canSend}
					class="jd-btn"
					style:background={th.ink}
					style:color={th.paper}
					style:border="2.5px solid {th.ink}"
					style:border-radius="14px"
					style:padding="14px 22px"
					style:font-family={th.body}
					style:font-weight="800"
					style:font-size="14px"
					style:box-shadow="4px 4px 0 {th.coral}"
					style:cursor={canSend ? 'pointer' : 'not-allowed'}
					style:opacity={canSend ? '1' : '0.55'}
				>
					{streaming ? t.ai.sending : `${t.ai.send} →`}
				</button>
			</div>

			{#if messages.length > 0}
				<button
					type="button"
					onclick={clearChat}
					disabled={streaming}
					class="jd-link-btn"
					style:margin-top="12px"
					style:background="transparent"
					style:border="none"
					style:font-family={th.body}
					style:font-size="13px"
					style:color={th.inkSoft}
					style:cursor={streaming ? 'not-allowed' : 'pointer'}
					style:text-decoration="underline"
				>
					{t.ai.clearChat}
				</button>
			{/if}
		</div>

		<div
			style:margin-top="40px"
			style:padding-top="20px"
			style:border-top="2px solid {th.ink}"
			style:max-width="720px"
			style:font-size="13px"
			style:color={th.inkSoft}
		>
			{t.footer}
		</div>
	</section>
</main>

<style>
	.jd-ai-wrap {
		max-width: 880px;
		margin: 0 auto;
		padding: 30px 56px 80px;
		position: relative;
	}
	.jd-input {
		font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
			Arial, sans-serif;
		font-size: 15px;
		color: #1a1a1a;
		background: #fffcf3;
		border: 2px solid #1a1a1a;
		border-radius: 12px;
		padding: 12px 14px;
		font-weight: 500;
		transition: box-shadow 0.15s ease;
	}
	.jd-input:focus {
		outline: none;
		box-shadow: 3px 3px 0 #1a1a1a;
	}
	.jd-textarea {
		resize: vertical;
		min-height: 56px;
		max-height: 200px;
	}
	.jd-chip:hover {
		background: #a8d5b8;
	}
	.jd-cta-pulse {
		animation: jd-pulse 1.6s ease-in-out infinite alternate;
	}
	@keyframes jd-pulse {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-2px);
		}
	}
	@media (max-width: 640px) {
		.jd-ai-header {
			padding: 16px 20px !important;
		}
		.jd-ai-wrap {
			padding: 20px 20px 60px !important;
		}
		.jd-ai-h1 {
			font-size: 40px !important;
		}
	}
</style>
