<script lang="ts">
	import type { Copy } from '$lib/content';
	import { theme as th } from '$lib/content';
	import FloatSticker from './FloatSticker.svelte';

	let { t }: { t: Copy } = $props();

	const dotColors = [th.coral, th.mintDeep, th.sun];
</script>

<div
	id="top"
	class="jd-hero"
	style:padding="40px 56px 80px"
	style:position="relative"
	style:overflow="hidden"
>
	<div
		class="jd-hero-stickers"
		style:position="absolute"
		style:right="60px"
		style:top="60px"
		style:transform="rotate(8deg)"
	>
		<FloatSticker color={th.coral} text="500€" />
	</div>
	<div
		class="jd-hero-stickers"
		style:position="absolute"
		style:right="240px"
		style:top="200px"
		style:transform="rotate(-6deg)"
	>
		<FloatSticker color={th.mint} text="200€" />
	</div>
	<div
		class="jd-hero-stickers"
		style:position="absolute"
		style:right="120px"
		style:top="340px"
		style:transform="rotate(4deg)"
	>
		<FloatSticker color={th.sun} text="hei!" />
	</div>

	<div
		style:display="inline-flex"
		style:align-items="center"
		style:gap="10px"
		style:padding="8px 16px"
		style:border-radius="99px"
		style:background={th.paper}
		style:border="2px solid {th.ink}"
		style:font-family={th.body}
		style:font-size="13px"
		style:color={th.ink}
		style:margin-bottom="32px"
		style:font-weight="600"
		style:box-shadow="3px 3px 0 {th.ink}"
	>
		<span
			style:width="10px"
			style:height="10px"
			style:border-radius="50%"
			style:background={th.mintDeep}
			style:animation="pulse 2s infinite"
		></span>
		{t.hero.kicker}
	</div>
	<h1
		class="jd-hero-h1"
		style:font-family={th.display}
		style:font-size="112px"
		style:line-height="0.95"
		style:letter-spacing="-2px"
		style:margin="0"
		style:color={th.ink}
		style:max-width="920px"
		style:font-weight="400"
	>
		{t.hero.title1}<br />
		<span
			style:display="inline-block"
			style:background={th.mint}
			style:padding="0 22px"
			style:border-radius="24px"
			style:border="3px solid {th.ink}"
			style:transform="rotate(-1.5deg)"
			style:box-shadow="6px 7px 0 {th.ink}"
			style:line-height="1"
		>
			{t.hero.title2}
		</span>
	</h1>
	<p
		style:font-family={th.body}
		style:font-size="19px"
		style:line-height="1.55"
		style:color={th.inkSoft}
		style:max-width="620px"
		style:margin-top="36px"
		style:text-wrap="pretty"
	>
		{t.hero.body}
	</p>
	<div style:display="flex" style:gap="14px" style:margin-top="36px" style:flex-wrap="wrap">
		<a
			href="#contact"
			class="jd-btn jd-shadow-ink"
			style:background={th.coral}
			style:color={th.ink}
			style:border="2.5px solid {th.ink}"
			style:border-radius="99px"
			style:padding="16px 28px"
			style:font-family={th.body}
			style:font-weight="800"
			style:font-size="16px"
			style:box-shadow="5px 5px 0 {th.ink}"
			style:text-decoration="none"
			style:display="inline-block"
		>
			{t.hero.cta1} →
		</a>
		<a
			href="#work"
			class="jd-btn jd-shadow-ink"
			style:background={th.paper}
			style:color={th.ink}
			style:border="2.5px solid {th.ink}"
			style:border-radius="99px"
			style:padding="16px 28px"
			style:font-family={th.body}
			style:font-weight="700"
			style:font-size="16px"
			style:text-decoration="none"
			style:display="inline-block"
			style:box-shadow="0 0 0 transparent"
		>
			{t.hero.cta2}
		</a>
	</div>
	<div style:display="flex" style:gap="16px" style:margin-top="56px" style:flex-wrap="wrap">
		{#each t.hero.meta as m, i (m)}
			<div
				style:padding="8px 14px"
				style:background={th.paper}
				style:border="2px solid {th.ink}"
				style:border-radius="99px"
				style:font-family={th.body}
				style:font-size="13px"
				style:color={th.ink}
				style:font-weight="600"
				style:display="flex"
				style:align-items="center"
				style:gap="8px"
			>
				<span
					style:width="6px"
					style:height="6px"
					style:border-radius="50%"
					style:background={dotColors[i]}
				></span>
				{m}
			</div>
		{/each}
	</div>
</div>
