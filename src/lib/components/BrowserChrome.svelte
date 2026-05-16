<script lang="ts">
	let { url, theme: themeMode = 'light' }: { url: string; theme?: 'light' | 'dark' } = $props();

	const bg = $derived(themeMode === 'dark' ? '#1a1a1a' : '#f6f3ec');
	const fg = $derived(themeMode === 'dark' ? '#888' : '#6b5d4e');
	const border = $derived(
		themeMode === 'dark' ? '1px solid #2a2a2a' : '1px solid rgba(0,0,0,0.08)'
	);
	const dotColors = ['#ff5f57', '#febc2e', '#28c840'];
</script>

<div
	style:background={bg}
	style:padding="10px 14px"
	style:display="flex"
	style:align-items="center"
	style:gap="10px"
	style:border-bottom={border}
>
	<div style:display="flex" style:gap="6px">
		{#each dotColors as c (c)}
			<div
				style:width="11px"
				style:height="11px"
				style:border-radius="50%"
				style:background={c}
			></div>
		{/each}
	</div>
	<div
		style:flex="1"
		style:text-align="center"
		style:font-size="11px"
		style:color={fg}
		style:letter-spacing="0.2px"
	>
		{url}
	</div>
	<div style:width="30px"></div>
</div>
