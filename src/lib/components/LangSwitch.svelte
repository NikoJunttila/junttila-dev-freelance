<script lang="ts">
	import type { Lang } from '$lib/content';

	let { lang = $bindable() }: { lang: Lang } = $props();
	const langs: Lang[] = ['fi', 'en'];
</script>

<div
	style:display="inline-flex"
	style:background="#fff"
	style:border="2px solid #1a1a1a"
	style:border-radius="99px"
	style:padding="3px"
	style:font-family='"Plus Jakarta Sans", sans-serif'
	style:font-size="13px"
	style:font-weight="700"
>
	{#each langs as l (l)}
		<button
			type="button"
			onclick={() => (lang = l)}
			style:padding="6px 14px"
			style:border-radius="99px"
			style:cursor="pointer"
			style:border="none"
			style:background={lang === l ? '#1a1a1a' : 'transparent'}
			style:color={lang === l ? '#fff' : '#1a1a1a'}
			style:text-transform="uppercase"
		>
			{l}
		</button>
	{/each}
</div>
