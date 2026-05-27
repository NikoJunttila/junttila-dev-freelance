<script lang="ts">
	import { theme as th } from '$lib/content';

	let {
		kicker,
		title,
		sub = '',
		color = th.mint
	}: { kicker: string; title: string; sub?: string; color?: string } = $props();

	const kickerInk = $derived(color === th.coral ? th.paper : th.ink);
</script>

<div style:margin-bottom="44px">
	<div
		style:display="inline-block"
		style:background={color}
		style:padding="6px 14px"
		style:border-radius="99px"
		style:border="2px solid {th.ink}"
		style:font-family={th.body}
		style:font-size="12px"
		style:letter-spacing="1px"
		style:text-transform="uppercase"
		style:color={kickerInk}
		style:font-weight="800"
		style:margin-bottom="18px"
	>
		{kicker}
	</div>
	<h2
		class="jd-section-h2"
		style:font-family={th.display}
		style:font-size="60px"
		style:line-height="1"
		style:letter-spacing="-1px"
		style:margin="0"
		style:color={th.ink}
		style:font-weight="400"
		style:max-width="800px"
	>
		{title}
	</h2>
	{#if sub}
		<p
			style:font-family={th.body}
			style:font-size="17px"
			style:line-height="1.55"
			style:color={th.inkSoft}
			style:max-width="640px"
			style:margin-top="18px"
			style:text-wrap="pretty"
		>
			{sub}
		</p>
	{/if}
</div>
