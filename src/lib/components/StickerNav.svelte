<script lang="ts">
	import type { Copy, Lang } from '$lib/content';
	import { theme as th } from '$lib/content';
	import LangSwitch from './LangSwitch.svelte';

	let { t, lang }: { t: Copy; lang: Lang } = $props();

	const navKeys: ('services' | 'work' | 'about' | 'process' | 'blog')[] = [
		'services',
		'work',
		'about',
		'process'
		// 'blog'
	];
</script>

<nav class="jd-nav">
	<div
		class="jd-nav-row"
		style:display="flex"
		style:align-items="center"
		style:padding="20px 56px"
		style:gap="16px"
	>
		<a href="#top" class="jd-link" style:display="flex" style:align-items="center">
			<img
				src="/junttila_dev.webp"
				alt="junttila.dev"
				width="300"
				height="250"
				class="jd-nav-logo"
				style:height="64px"
				style:width="auto"
				style:display="block"
			/>
		</a>
		<div
			class="jd-nav-center"
			style:flex="1"
			style:display="flex"
			style:justify-content="center"
			style:gap="6px"
			style:font-family={th.body}
			style:font-size="14px"
			style:font-weight="600"
		>
			{#each navKeys as k (k)}
				<a
					href={k === 'blog' ? '#blog' : `#${k}`}
					class="jd-nav-link"
					style:padding="8px 14px"
					style:border-radius="99px"
					style:color={th.ink}
					style:background="transparent"
					style:border="2px solid transparent"
				>
					{t.nav[k]}
				</a>
			{/each}
		</div>
		<div style:display="flex" style:align-items="center" style:gap="14px">
			<LangSwitch {lang} />
			<a
				href="#contact"
				class="jd-btn jd-shadow-sun"
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
				style:display="inline-block"
			>
				{t.nav.contact} →
			</a>
		</div>
	</div>
</nav>
