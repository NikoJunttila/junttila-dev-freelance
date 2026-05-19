<script lang="ts">
	import { COPY, theme as th, type Lang } from '$lib/content';
	import { getLocale } from '$lib/paraglide/runtime';
	import StickerNav from '$lib/components/StickerNav.svelte';
	import StickerHero from '$lib/components/StickerHero.svelte';
	import StickerServices from '$lib/components/StickerServices.svelte';
	import StickerWork from '$lib/components/StickerWork.svelte';
	import StickerAbout from '$lib/components/StickerAbout.svelte';
	import StickerProcess from '$lib/components/StickerProcess.svelte';
	import StickerTestimonials from '$lib/components/StickerTestimonials.svelte';
	// import StickerBlog from '$lib/components/StickerBlog.svelte';
	import StickerContact from '$lib/components/StickerContact.svelte';

	const lang = $derived(getLocale() as Lang);
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
		<StickerNav {t} {lang} />
		<StickerHero {t} />
		<StickerServices {t} />
		<StickerWork {t} {lang} />
		<StickerAbout {t} />
		<StickerProcess {t} />
		<StickerTestimonials {t} {lang} />
		<!-- <StickerBlog {t} /> -->
		<StickerContact {t} />
	</div>
</div>
