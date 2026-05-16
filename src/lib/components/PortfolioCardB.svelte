<script lang="ts">
	import type { Lang, PortfolioItem } from '$lib/content';
	import BrowserChrome from './BrowserChrome.svelte';
	import PortfolioScene from './PortfolioScene.svelte';

	let {
		item,
		lang,
		width = 360,
		height = 260,
		rotate = 0
	}: { item: PortfolioItem; lang: Lang; width?: number; height?: number; rotate?: number } =
		$props();

	const p = $derived(item.palette);
</script>

<div
	class="jd-card-hover"
	style:width="100%"
	style:max-width="{width}px"
	style:transform="rotate({rotate}deg)"
	style:transform-origin="center"
>
	<div
		style:border-radius="22px"
		style:overflow="hidden"
		style:background="#fff"
		style:border="2px solid #1a1a1a"
		style:box-shadow="6px 8px 0 #1a1a1a"
	>
		<BrowserChrome url={item.url} />
		<div
			style:aspect-ratio="{width} / {height}"
			style:background={p[3]}
			style:position="relative"
			style:overflow="hidden"
		>
			<PortfolioScene id={item.id} palette={p} />
		</div>
	</div>
	<div style:margin-top="14px" style:padding="0 6px">
		<div
			style:display="inline-block"
			style:background={p[0]}
			style:color="#1a1a1a"
			style:font-size="11px"
			style:letter-spacing="1.2px"
			style:text-transform="uppercase"
			style:padding="4px 10px"
			style:border-radius="99px"
			style:border="2px solid #1a1a1a"
			style:font-weight="700"
		>
			{item.tag[lang]}
		</div>
		<div
			style:font-family='Caprasimo, serif'
			style:font-size="22px"
			style:line-height="1.15"
			style:color="#1a1a1a"
			style:margin-top="10px"
		>
			{item.name}
		</div>
		<div style:font-size="13px" style:line-height="1.45" style:color="#3a3530" style:margin-top="6px">
			{item.desc[lang]}
		</div>
	</div>
</div>
