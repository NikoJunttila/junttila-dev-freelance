<script lang="ts">
	import { browser } from '$app/environment';
	import { COPY, theme as th, type Lang } from '$lib/content';
	import StickerNav from '$lib/components/StickerNav.svelte';
	import StickerHero from '$lib/components/StickerHero.svelte';
	import StickerServices from '$lib/components/StickerServices.svelte';
	import StickerWork from '$lib/components/StickerWork.svelte';
	import StickerAbout from '$lib/components/StickerAbout.svelte';
	import StickerProcess from '$lib/components/StickerProcess.svelte';
	import StickerTestimonials from '$lib/components/StickerTestimonials.svelte';
	import StickerBlog from '$lib/components/StickerBlog.svelte';
	import StickerContact from '$lib/components/StickerContact.svelte';

	let lang = $state<Lang>('fi');

	$effect(() => {
		if (!browser) return;
		const saved = localStorage.getItem('jd_lang');
		if (saved === 'fi' || saved === 'en') lang = saved;
	});

	$effect(() => {
		if (browser) localStorage.setItem('jd_lang', lang);
	});

	const t = $derived(COPY[lang]);
</script>

<svelte:head>
	<style>
		html {
			scroll-behavior: smooth;
		}
	</style>
</svelte:head>

<div id="site-wrap">
	<div
		style:width="100%"
		style:background={th.bg}
		style:font-family={th.body}
		style:color={th.ink}
		style:position="relative"
	>
		<StickerNav {t} bind:lang />
		<StickerHero {t} />
		<StickerServices {t} />
		<StickerWork {t} {lang} />
		<StickerAbout {t} />
		<StickerProcess {t} />
		<StickerTestimonials {t} {lang} />
		<StickerBlog {t} />
		<StickerContact {t} />
	</div>
</div>
