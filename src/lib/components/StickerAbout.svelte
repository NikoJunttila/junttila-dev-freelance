<script lang="ts">
	import type { Copy } from '$lib/content';
	import { theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';
	import HobbyTag from './HobbyTag.svelte';

	let { t }: { t: Copy } = $props();
</script>

<div
	id="about"
	class="jd-section jd-about-grid"
	style:background="{th.sun}40"
	style:position="relative"
	style:display="grid"
	style:grid-template-columns="minmax(0, 1.3fr) minmax(0, 1fr)"
	style:gap="56px"
	style:align-items="start"
	style:min-width="0"
	style:overflow="hidden"
>
	<div>
		<StickerSection kicker={t.sectionKickers.about} title={t.aboutH} color={th.pink} />
		<div
			style:font-family={th.body}
			style:font-size="17px"
			style:line-height="1.6"
			style:color={th.ink}
			style:max-width="620px"
			style:text-wrap="pretty"
		>
			<p style:margin="0">{t.aboutBody1}</p>
			<p style:margin-top="16px">{t.aboutBody2}</p>
			<p style:margin-top="16px" style:color={th.inkSoft}>{t.aboutBody3}</p>
		</div>
		<div
			class="jd-about-stats"
			style:display="grid"
			style:grid-template-columns="repeat(3, minmax(0, 1fr))"
			style:gap="14px"
			style:margin-top="36px"
			style:max-width="600px"
		>
			{#each t.aboutStats as [n, l] (l)}
				<div
					style:padding="18px"
					style:background={th.paper}
					style:border-radius="16px"
					style:border="2px solid {th.ink}"
					style:box-shadow="3px 4px 0 {th.ink}"
				>
					<div
						style:font-family={th.display}
						style:font-size="38px"
						style:color={th.coral}
						style:line-height="1"
					>
						{n}
					</div>
					<div
						style:font-family={th.body}
						style:font-size="13px"
						style:color={th.ink}
						style:margin-top="6px"
						style:font-weight="600"
					>
						{l}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="jd-about-portrait" style:position="relative" style:padding-top="40px" style:max-width="320px">
		<div
			style:width="280px"
			style:height="320px"
			style:border-radius="24px"
			style:background={th.mint}
			style:border="3px solid {th.ink}"
			style:box-shadow="8px 10px 0 {th.ink}"
			style:position="relative"
			style:overflow="hidden"
			style:transform="rotate(2deg)"
		>
			<img
				src="/niko.webp"
				alt="Niko"
				style:position="absolute"
				style:inset="0"
				style:width="100%"
				style:height="100%"
				style:object-fit="cover"
			/>
		</div>
		<div
			class="jd-about-stickers"
			style:position="absolute"
			style:top="0"
			style:right="0"
			style:transform="rotate(8deg)"
		>
			<HobbyTag color={th.coral} icon="💪" label="sali" />
		</div>
		<div
			class="jd-about-stickers"
			style:position="absolute"
			style:bottom="60px"
			style:left="-30px"
			style:transform="rotate(-8deg)"
		>
			<HobbyTag color={th.sun} icon="🥾" label="vaellus" />
		</div>
		<div
			class="jd-about-stickers"
			style:position="absolute"
			style:bottom="-10px"
			style:right="20px"
			style:transform="rotate(5deg)"
		>
			<HobbyTag color={th.pink} icon="🏊" label="uinti" />
		</div>
	</div>
</div>
