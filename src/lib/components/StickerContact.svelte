<script lang="ts">
	import type { Copy } from '$lib/content';
	import { CONTACT, theme as th } from '$lib/content';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let { t }: { t: Copy } = $props();

	let submitting = $state(false);

	type FormResult = {
		success?: boolean;
		errors?: Record<string, string>;
		sendError?: boolean;
		values?: { name: string; email: string; message: string };
	};

	const result = $derived(page.form as FormResult | null);

	function fieldError(key: 'name' | 'email' | 'message'): string | null {
		const code = result?.errors?.[key];
		if (!code) return null;
		if (code === 'invalid') return t.contactForm.invalidEmail;
		return t.contactForm.required;
	}
</script>

<div
	id="contact"
	class="jd-section"
	style:background={th.coral}
	style:color={th.ink}
	style:position="relative"
	style:overflow="hidden"
>
	<div
		style:position="absolute"
		style:left="-60px"
		style:top="-60px"
		style:width="220px"
		style:height="220px"
		style:border-radius="50%"
		style:background={th.sun}
		style:border="3px solid {th.ink}"
		style:transform="rotate(15deg)"
	></div>
	<div
		style:position="absolute"
		style:right="-40px"
		style:bottom="-80px"
		style:width="280px"
		style:height="280px"
		style:border-radius="50%"
		style:background={th.mint}
		style:border="3px solid {th.ink}"
	></div>

	<div style:position="relative" style:max-width="820px">
		<div
			style:display="inline-block"
			style:background={th.paper}
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
			{t.sectionKickers.contact}
		</div>
		<h2
			class="jd-contact-h2"
			style:font-family={th.display}
			style:font-size="96px"
			style:line-height="0.95"
			style:margin="0"
			style:font-weight="400"
			style:letter-spacing="-2px"
			style:color={th.ink}
		>
			{t.contactH}
		</h2>
		<p
			style:font-family={th.body}
			style:font-size="19px"
			style:line-height="1.5"
			style:color={th.ink}
			style:margin-top="22px"
			style:max-width="540px"
			style:font-weight="500"
		>
			{t.contactBody}
		</p>

		{#if result?.success}
			<div
				class="jd-contact-callout"
				style:margin-top="36px"
				style:background={th.mint}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="22px 26px"
				style:box-shadow="5px 6px 0 {th.ink}"
				style:max-width="540px"
				style:font-family={th.body}
				style:font-size="17px"
				style:line-height="1.5"
				style:color={th.ink}
				style:font-weight="600"
			>
				{t.contactForm.success}
			</div>
		{:else}
			<form
				method="POST"
				action="?/contact"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
				class="jd-contact-form"
				style:margin-top="36px"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="26px"
				style:box-shadow="5px 6px 0 {th.ink}"
				style:max-width="540px"
				style:display="flex"
				style:flex-direction="column"
				style:gap="16px"
			>
				<label style:display="flex" style:flex-direction="column" style:gap="6px">
					<span
						style:font-family={th.body}
						style:font-size="12px"
						style:letter-spacing="1px"
						style:text-transform="uppercase"
						style:color={th.inkSoft}
						style:font-weight="800"
					>
						{t.contactForm.name}
					</span>
					<input
						name="name"
						type="text"
						required
						autocomplete="name"
						value={result?.values?.name ?? ''}
						class="jd-input"
						aria-invalid={fieldError('name') ? 'true' : undefined}
					/>
					{#if fieldError('name')}
						<span class="jd-field-error" style:color={th.coral}>{fieldError('name')}</span>
					{/if}
				</label>

				<label style:display="flex" style:flex-direction="column" style:gap="6px">
					<span
						style:font-family={th.body}
						style:font-size="12px"
						style:letter-spacing="1px"
						style:text-transform="uppercase"
						style:color={th.inkSoft}
						style:font-weight="800"
					>
						{t.contactForm.email}
					</span>
					<input
						name="email"
						type="email"
						required
						autocomplete="email"
						value={result?.values?.email ?? ''}
						class="jd-input"
						aria-invalid={fieldError('email') ? 'true' : undefined}
					/>
					{#if fieldError('email')}
						<span class="jd-field-error" style:color={th.coral}>{fieldError('email')}</span>
					{/if}
				</label>

				<label style:display="flex" style:flex-direction="column" style:gap="6px">
					<span
						style:font-family={th.body}
						style:font-size="12px"
						style:letter-spacing="1px"
						style:text-transform="uppercase"
						style:color={th.inkSoft}
						style:font-weight="800"
					>
						{t.contactForm.message}
					</span>
					<textarea
						name="message"
						required
						rows="5"
						value={result?.values?.message ?? ''}
						class="jd-input jd-textarea"
						aria-invalid={fieldError('message') ? 'true' : undefined}
					></textarea>
					{#if fieldError('message')}
						<span class="jd-field-error" style:color={th.coral}>{fieldError('message')}</span>
					{/if}
				</label>

				<!-- Honeypot: real visitors leave this blank. -->
				<div class="jd-honeypot" aria-hidden="true">
					<label>
						Website
						<input name="website" type="text" tabindex={-1} autocomplete="off" />
					</label>
				</div>

				{#if result?.sendError}
					<div
						style:font-family={th.body}
						style:font-size="14px"
						style:color={th.coral}
						style:font-weight="700"
					>
						{t.contactForm.error}
					</div>
				{/if}

				<button
					type="submit"
					disabled={submitting}
					class="jd-btn jd-shadow-ink"
					style:background={th.ink}
					style:color={th.paper}
					style:border="3px solid {th.ink}"
					style:border-radius="99px"
					style:padding="16px 28px"
					style:font-family={th.body}
					style:font-weight="800"
					style:font-size="16px"
					style:box-shadow="5px 5px 0 {th.paper}"
					style:align-self="flex-start"
					style:opacity={submitting ? '0.7' : '1'}
				>
					{submitting ? t.contactForm.submitting : `${t.contactForm.submit} →`}
				</button>
			</form>
		{/if}

		<div style:display="flex" style:gap="14px" style:margin-top="36px" style:flex-wrap="wrap">
			<a
				href="mailto:{CONTACT.email}"
				class="jd-card-hover jd-link"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="18px"
				style:padding="18px 22px"
				style:box-shadow="5px 5px 0 {th.ink}"
				style:display="block"
			>
				<div
					style:font-family={th.body}
					style:font-size="11px"
					style:letter-spacing="1.5px"
					style:text-transform="uppercase"
					style:color={th.inkSoft}
					style:font-weight="800"
				>
					Email
				</div>
				<div
					style:font-family={th.display}
					style:font-size="26px"
					style:color={th.ink}
					style:margin-top="4px"
				>
					{CONTACT.email}
				</div>
			</a>
			<a
				href="tel:{CONTACT.phoneClean}"
				class="jd-card-hover jd-link"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="18px"
				style:padding="18px 22px"
				style:box-shadow="5px 5px 0 {th.ink}"
				style:display="block"
			>
				<div
					style:font-family={th.body}
					style:font-size="11px"
					style:letter-spacing="1.5px"
					style:text-transform="uppercase"
					style:color={th.inkSoft}
					style:font-weight="800"
				>
					{t.contactPhoneLabel}
				</div>
				<div
					style:font-family={th.display}
					style:font-size="22px"
					style:color={th.ink}
					style:margin-top="4px"
				>
					{CONTACT.phone}
				</div>
			</a>
		</div>
	</div>
	<div
		style:position="relative"
		style:margin-top="80px"
		style:padding-top="24px"
		style:border-top="2.5px solid {th.ink}"
		style:display="flex"
		style:justify-content="space-between"
		style:align-items="center"
		style:font-family={th.body}
		style:font-size="13px"
		style:color={th.ink}
		style:font-weight="600"
	>
		<div>{t.footer}</div>
		<div style:display="flex" style:gap="24px">
			<a
				href="https://{CONTACT.github}"
				target="_blank"
				rel="noopener"
				class="jd-text-link"
			>
				{CONTACT.github}
			</a>
		</div>
	</div>
</div>

<style>
	.jd-input {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 16px;
		color: #1a1a1a;
		background: #fffcf3;
		border: 2px solid #1a1a1a;
		border-radius: 12px;
		padding: 12px 14px;
		width: 100%;
		font-weight: 500;
		transition: box-shadow 0.15s ease;
	}
	.jd-input:focus {
		outline: none;
		box-shadow: 3px 3px 0 #1a1a1a;
	}
	.jd-input[aria-invalid='true'] {
		border-color: #f08a5d;
		background: #fff7f0;
	}
	.jd-textarea {
		resize: vertical;
		min-height: 120px;
		font-family: 'Plus Jakarta Sans', sans-serif;
	}
	.jd-field-error {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		font-weight: 700;
	}
	.jd-honeypot {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
