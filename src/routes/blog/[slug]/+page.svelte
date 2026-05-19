<script lang="ts">
	import { COPY, theme as th, type Lang } from '$lib/content';
	import { getLocale } from '$lib/paraglide/runtime';
	import LangSwitch from '$lib/components/LangSwitch.svelte';

	let { data } = $props();

	const lang = $derived(getLocale() as Lang);
	const t = $derived(COPY[lang]);
	const post = $derived(data.post[lang]);
</script>

<svelte:head>
	<title>{post.t} · junttila.dev</title>
</svelte:head>

<div id="site-wrap">
	<div
		style:width="100%"
		style:background={th.bg}
		style:font-family={th.body}
		style:color={th.ink}
		style:min-height="100vh"
	>
		<header
			style:display="flex"
			style:align-items="center"
			style:padding="20px 56px"
			style:gap="16px"
			style:border-bottom="2px solid {th.ink}"
			class="jd-blog-header"
		>
			<a
				href="/"
				class="jd-link"
				style:display="flex"
				style:align-items="center"
				style:gap="12px"
			>
				<div
					style:width="44px"
					style:height="44px"
					style:background={th.sun}
					style:border="2px solid {th.ink}"
					style:border-radius="14px"
					style:display="grid"
					style:place-items="center"
					style:font-family={th.display}
					style:font-size="22px"
					style:color={th.ink}
					style:transform="rotate(-6deg)"
					style:box-shadow="3px 3px 0 {th.ink}"
				>
					n
				</div>
				<div
					style:font-family={th.body}
					style:font-weight="800"
					style:color={th.ink}
					style:font-size="18px"
				>
					junttila.dev
				</div>
			</a>
			<div style:flex="1"></div>
			<LangSwitch {lang} />
		</header>

		<article class="jd-section">
			<div
				style:display="flex"
				style:align-items="center"
				style:gap="12px"
				style:margin-bottom="20px"
				style:flex-wrap="wrap"
			>
				<span
					style:background={th.mint}
					style:border="2px solid {th.ink}"
					style:font-family={th.body}
					style:font-size="12px"
					style:letter-spacing="1px"
					style:text-transform="uppercase"
					style:color={th.ink}
					style:font-weight="800"
					style:padding="4px 12px"
					style:border-radius="99px"
				>
					{post.tag}
				</span>
				<span style:font-family={th.mono} style:font-size="12px" style:color={th.inkSoft}>
					{post.date} · {post.d}
				</span>
			</div>

			<h1
				class="jd-section-h2"
				style:font-family={th.display}
				style:font-size="60px"
				style:line-height="1.05"
				style:letter-spacing="-1px"
				style:margin="0 0 32px"
				style:color={th.ink}
				style:font-weight="400"
				style:max-width="820px"
				style:text-wrap="balance"
			>
				{post.t}
			</h1>

			<div
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="32px"
				style:box-shadow="5px 6px 0 {th.ink}"
				style:max-width="820px"
			>
				<p
					style:font-family={th.body}
					style:font-size="17px"
					style:line-height="1.6"
					style:color={th.inkSoft}
					style:margin="0"
					style:text-wrap="pretty"
				>
					{t.blogPlaceholder}
				</p>
			</div>

			<div style:margin-top="40px">
				<a href="/" class="jd-text-link" style:font-family={th.body} style:font-weight="700">
					{t.blogBack}
				</a>
			</div>
		</article>
	</div>
</div>

<style>
	@media (max-width: 1024px) {
		.jd-blog-header {
			padding: 16px 32px !important;
		}
	}
	@media (max-width: 640px) {
		.jd-blog-header {
			padding: 12px 20px !important;
		}
	}
</style>
