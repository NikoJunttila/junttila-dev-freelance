<script lang="ts">
	import type { Lang } from '$lib/content';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { lang }: { lang: Lang } = $props();
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
		<a
			href={resolve(localizeHref(page.url.pathname, { locale: l }) as Pathname)}
			data-sveltekit-reload
			style:padding="6px 14px"
			style:border-radius="99px"
			style:cursor="pointer"
			style:background={lang === l ? '#1a1a1a' : 'transparent'}
			style:color={lang === l ? '#fff' : '#1a1a1a'}
			style:text-transform="uppercase"
			style:text-decoration="none"
			aria-current={lang === l ? 'page' : undefined}
		>
			{l}
		</a>
	{/each}
</div>
