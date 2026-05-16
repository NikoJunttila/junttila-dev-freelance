<script lang="ts">
	import type { Copy } from '$lib/content';
	import { theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';

	let { t }: { t: Copy } = $props();

	const colors = [th.mint, th.sun, th.pink];
	const rotations = [-1.5, 1, -0.5];
</script>

<div id="testimonials" class="jd-section" style:background={th.bgAlt}>
	<StickerSection
		kicker={t.sectionKickers.testimonials}
		title={t.testimonialsH}
		color={th.coral}
	/>
	<div
		class="jd-grid-3"
		style:display="grid"
		style:grid-template-columns="repeat(3, 1fr)"
		style:gap="22px"
	>
		{#each t.testimonials as tt, i (tt.who)}
			<div
				style:background={colors[i]}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="26px"
				style:box-shadow="5px 6px 0 {th.ink}"
				style:transform="rotate({rotations[i]}deg)"
				style:display="flex"
				style:flex-direction="column"
			>
				<div
					style:font-family={th.display}
					style:font-size="64px"
					style:color={th.ink}
					style:line-height="0.5"
					style:margin-bottom="6px"
				>
					"
				</div>
				<div
					style:font-family={th.body}
					style:font-size="16px"
					style:line-height="1.5"
					style:color={th.ink}
					style:flex="1"
					style:font-weight="500"
					style:text-wrap="pretty"
				>
					{tt.q}
				</div>
				<div
					style:margin-top="20px"
					style:padding-top="16px"
					style:border-top="2px dashed {th.ink}40"
				>
					<div
						style:font-family={th.body}
						style:font-weight="800"
						style:color={th.ink}
						style:font-size="15px"
					>
						{tt.who}
					</div>
					<div
						style:font-family={th.body}
						style:font-size="12px"
						style:color={th.inkSoft}
						style:margin-top="2px"
					>
						{tt.sub}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
