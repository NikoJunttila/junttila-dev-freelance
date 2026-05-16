<script lang="ts">
	import type { Copy, Lang } from '$lib/content';
	import { PORTFOLIO, theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';
	import PortfolioCardB from './PortfolioCardB.svelte';

	let { t, lang }: { t: Copy; lang: Lang } = $props();

	const rotations = [-2, 1.5, -1, 2, -1.5];
</script>

<div id="work" class="jd-section" style:background={th.bg}>
	<StickerSection
		kicker={t.sectionKickers.work}
		title={t.workH}
		sub={t.workSub}
		color={th.coral}
	/>
	<div
		class="jd-grid-3"
		style:display="grid"
		style:grid-template-columns="repeat(3, 1fr)"
		style:gap="36px"
		style:padding-top="10px"
		style:justify-items="center"
	>
		{#each PORTFOLIO as item, i (item.id)}
			<PortfolioCardB {item} {lang} rotate={rotations[i]} />
		{/each}
	</div>
</div>
