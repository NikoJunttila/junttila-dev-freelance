<script lang="ts">
	import type { Copy } from '$lib/content';
	import { theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';

	let { t }: { t: Copy } = $props();

	const tints = [th.mint, th.sun, th.pink];
</script>

<div id="blog" class="jd-section" style:background={th.bg}>
	<StickerSection
		kicker={t.sectionKickers.reading}
		title={t.blogH}
		sub={t.blogSub}
		color={th.sun}
	/>
	<div
		class="jd-grid-3"
		style:display="grid"
		style:grid-template-columns="repeat(3, 1fr)"
		style:gap="22px"
	>
		{#each t.blog as b, i (b.t)}
			<a
				href="/blog/{b.slug}"
				class="jd-card-hover jd-link"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="24px"
				style:box-shadow="4px 5px 0 {th.ink}"
				style:display="flex"
				style:flex-direction="column"
				style:min-height="220px"
			>
				<div
					style:display="flex"
					style:justify-content="space-between"
					style:align-items="center"
					style:margin-bottom="18px"
				>
					<span
						style:background={tints[i]}
						style:border="2px solid {th.ink}"
						style:font-family={th.body}
						style:font-size="11px"
						style:letter-spacing="1px"
						style:text-transform="uppercase"
						style:color={th.ink}
						style:font-weight="800"
						style:padding="3px 10px"
						style:border-radius="99px"
					>
						{b.tag}
					</span>
					<span style:font-family={th.mono} style:font-size="11px" style:color={th.inkSoft}>
						{b.date}
					</span>
				</div>
				<div
					style:font-family={th.display}
					style:font-size="22px"
					style:line-height="1.15"
					style:color={th.ink}
					style:text-wrap="pretty"
					style:flex="1"
				>
					{b.t}
				</div>
				<div
					style:margin-top="18px"
					style:font-family={th.body}
					style:font-size="13px"
					style:color={th.inkSoft}
					style:display="flex"
					style:justify-content="space-between"
					style:align-items="center"
					style:font-weight="600"
				>
					<span>{b.d}</span>
					<span
						style:background={th.ink}
						style:color={th.paper}
						style:width="28px"
						style:height="28px"
						style:border-radius="50%"
						style:display="grid"
						style:place-items="center"
					>
						→
					</span>
				</div>
			</a>
		{/each}
	</div>
</div>
