<script lang="ts">
	import type { Copy } from '$lib/content';
	import { theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';

	let { t }: { t: Copy } = $props();

	const colors = [th.mint, th.sun, th.coral, th.pink];
	const rotations = [-0.8, 0.6, -0.4, 0.5];
</script>

<div id="process" class="jd-section" style:background={th.bg}>
	<StickerSection
		kicker={t.sectionKickers.process}
		title={t.processH}
		sub={t.processSub}
		color={th.mint}
	/>
	<div
		class="jd-grid-4"
		style:display="grid"
		style:grid-template-columns="repeat(4, 1fr)"
		style:gap="18px"
	>
		{#each t.process as p, i (p.n)}
			<div
				class="jd-card-hover"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="24px"
				style:box-shadow="5px 6px 0 {th.ink}"
				style:transform="rotate({rotations[i]}deg)"
			>
				<div
					style:width="56px"
					style:height="56px"
					style:border-radius="50%"
					style:background={colors[i]}
					style:border="2.5px solid {th.ink}"
					style:display="grid"
					style:place-items="center"
					style:font-family={th.display}
					style:font-size="22px"
					style:color={th.ink}
					style:margin-bottom="16px"
				>
					{p.n}
				</div>
				<div
					style:font-family={th.display}
					style:font-size="24px"
					style:color={th.ink}
					style:line-height="1.1"
				>
					{p.t}
				</div>
				<div
					style:font-family={th.body}
					style:font-size="14px"
					style:color={th.inkSoft}
					style:margin-top="10px"
					style:line-height="1.5"
				>
					{p.d}
				</div>
			</div>
		{/each}
	</div>
</div>
