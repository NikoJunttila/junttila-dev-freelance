<script lang="ts">
	import { page } from '$app/state';
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
	const ogUrl = $derived(page.url.origin + page.url.pathname);
	const ogImage = $derived(page.url.origin + '/og-image.svg');
</script>

<svelte:head>
	<title>{t.seo.title}</title>
	<meta name="description" content={t.seo.description} />
	<link rel="canonical" href={ogUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content={lang === 'fi' ? 'fi_FI' : 'en_US'} />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:title" content={t.seo.title} />
	<meta property="og:description" content={t.seo.description} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={t.seo.title} />
	<meta name="twitter:description" content={t.seo.description} />
	<meta name="twitter:image" content={ogImage} />

	<style>
		html {
			scroll-behavior: smooth;
		}
	</style>
</svelte:head>

<main id="site-wrap">
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
</main>
