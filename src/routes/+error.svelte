<script lang="ts">
	import { page } from '$app/state';
	import { theme as th } from '$lib/content';
	import { getLocale } from '$lib/paraglide/runtime';

	const lang = $derived(getLocale() === 'fi' ? 'fi' : 'en');

	const t = $derived(
		lang === 'fi'
			? {
					title: 'Hupsis',
					body: 'Sivu karkasi mukaan. Kissanpentu päätti, että täällä ei ole mitään nähtävää.',
					home: 'Takaisin etusivulle',
					seo: 'Sivua ei löydy · junttila.dev'
				}
			: {
					title: 'Whoops',
					body: 'This page wandered off. A kitten decided there was nothing to see here.',
					home: 'Back to home',
					seo: 'Not found · junttila.dev'
				}
	);

	const status = $derived(page.status || 404);
</script>

<svelte:head>
	<title>{t.seo}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main
	style:min-height="100vh"
	style:background={th.bg}
	style:color={th.ink}
	style:font-family={th.body}
	style:display="grid"
	style:place-items="center"
	style:padding="56px 24px"
	style:position="relative"
	style:overflow="hidden"
>
	<div
		aria-hidden="true"
		style:position="absolute"
		style:top="-90px"
		style:left="-90px"
		style:width="260px"
		style:height="260px"
		style:border-radius="50%"
		style:background={th.sun}
		style:border="3px solid {th.ink}"
		style:transform="rotate(-12deg)"
	></div>
	<div
		aria-hidden="true"
		style:position="absolute"
		style:bottom="-110px"
		style:right="-80px"
		style:width="300px"
		style:height="300px"
		style:border-radius="50%"
		style:background={th.mint}
		style:border="3px solid {th.ink}"
	></div>

	<div
		style:position="relative"
		style:display="flex"
		style:flex-direction="column"
		style:align-items="center"
		style:gap="28px"
		style:max-width="640px"
		style:text-align="center"
	>
		<div
			style:position="relative"
			style:display="flex"
			style:align-items="flex-end"
			style:justify-content="center"
			style:gap="10px"
		>
			<div
				style:transform="rotate(-6deg)"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="24px"
				style:padding="18px"
				style:box-shadow="6px 7px 0 {th.ink}"
			>
				<svg
					width="120"
					height="120"
					viewBox="0 0 200 200"
					aria-hidden="true"
					style:display="block"
				>
					<polygon
						points="60,60 70,22 95,58"
						fill={th.sun}
						stroke={th.ink}
						stroke-width="3"
						stroke-linejoin="round"
					/>
					<polygon
						points="105,58 130,22 140,60"
						fill={th.sun}
						stroke={th.ink}
						stroke-width="3"
						stroke-linejoin="round"
					/>
					<polygon points="68,55 74,38 84,55" fill={th.pink} />
					<polygon points="116,55 126,38 132,55" fill={th.pink} />
					<ellipse
						cx="100"
						cy="145"
						rx="58"
						ry="42"
						fill={th.sun}
						stroke={th.ink}
						stroke-width="3"
					/>
					<circle cx="100" cy="90" r="48" fill={th.sun} stroke={th.ink} stroke-width="3" />
					<path
						d="M55 165 Q40 160 38 140 Q42 138 50 152 Z"
						fill={th.sun}
						stroke={th.ink}
						stroke-width="2.5"
						stroke-linejoin="round"
					/>
					<ellipse cx="84" cy="88" rx="6" ry="9" fill={th.ink} />
					<ellipse cx="116" cy="88" rx="6" ry="9" fill={th.ink} />
					<circle cx="86" cy="84" r="2" fill={th.paper} />
					<circle cx="118" cy="84" r="2" fill={th.paper} />
					<path
						d="M95 105 L105 105 L100 112 Z"
						fill={th.pink}
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linejoin="round"
					/>
					<path
						d="M100 112 Q94 119 88 115"
						fill="none"
						stroke={th.ink}
						stroke-width="2"
						stroke-linecap="round"
					/>
					<path
						d="M100 112 Q106 119 112 115"
						fill="none"
						stroke={th.ink}
						stroke-width="2"
						stroke-linecap="round"
					/>
					<line
						x1="78"
						y1="102"
						x2="58"
						y2="98"
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linecap="round"
					/>
					<line
						x1="78"
						y1="108"
						x2="58"
						y2="112"
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linecap="round"
					/>
					<line
						x1="122"
						y1="102"
						x2="142"
						y2="98"
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linecap="round"
					/>
					<line
						x1="122"
						y1="108"
						x2="142"
						y2="112"
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linecap="round"
					/>
				</svg>
			</div>

			<div
				style:transform="rotate(8deg) translateY(-6px)"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="20px"
				style:padding="14px"
				style:box-shadow="5px 6px 0 {th.ink}"
			>
				<svg width="90" height="90" viewBox="0 0 200 200" aria-hidden="true" style:display="block">
					<polygon
						points="60,60 70,22 95,58"
						fill={th.mint}
						stroke={th.ink}
						stroke-width="3"
						stroke-linejoin="round"
					/>
					<polygon
						points="105,58 130,22 140,60"
						fill={th.mint}
						stroke={th.ink}
						stroke-width="3"
						stroke-linejoin="round"
					/>
					<polygon points="68,55 74,38 84,55" fill={th.pink} />
					<polygon points="116,55 126,38 132,55" fill={th.pink} />
					<ellipse
						cx="100"
						cy="145"
						rx="58"
						ry="42"
						fill={th.mint}
						stroke={th.ink}
						stroke-width="3"
					/>
					<circle cx="100" cy="90" r="48" fill={th.mint} stroke={th.ink} stroke-width="3" />
					<ellipse cx="84" cy="92" rx="4" ry="2.5" fill={th.ink} />
					<ellipse cx="116" cy="92" rx="4" ry="2.5" fill={th.ink} />
					<path
						d="M95 105 L105 105 L100 112 Z"
						fill={th.pink}
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linejoin="round"
					/>
					<path
						d="M88 115 Q100 124 112 115"
						fill="none"
						stroke={th.ink}
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</div>

			<div
				style:transform="rotate(-12deg) translateY(4px)"
				style:background={th.paper}
				style:border="2.5px solid {th.ink}"
				style:border-radius="20px"
				style:padding="14px"
				style:box-shadow="5px 6px 0 {th.ink}"
			>
				<svg width="78" height="78" viewBox="0 0 200 200" aria-hidden="true" style:display="block">
					<polygon
						points="60,60 70,22 95,58"
						fill={th.coral}
						stroke={th.ink}
						stroke-width="3"
						stroke-linejoin="round"
					/>
					<polygon
						points="105,58 130,22 140,60"
						fill={th.coral}
						stroke={th.ink}
						stroke-width="3"
						stroke-linejoin="round"
					/>
					<polygon points="68,55 74,38 84,55" fill={th.paper} />
					<polygon points="116,55 126,38 132,55" fill={th.paper} />
					<ellipse
						cx="100"
						cy="145"
						rx="58"
						ry="42"
						fill={th.coral}
						stroke={th.ink}
						stroke-width="3"
					/>
					<circle cx="100" cy="90" r="48" fill={th.coral} stroke={th.ink} stroke-width="3" />
					<path
						d="M76 88 L92 96 M92 88 L76 96"
						stroke={th.ink}
						stroke-width="2.5"
						stroke-linecap="round"
					/>
					<path
						d="M108 88 L124 96 M124 88 L108 96"
						stroke={th.ink}
						stroke-width="2.5"
						stroke-linecap="round"
					/>
					<path
						d="M95 105 L105 105 L100 112 Z"
						fill={th.paper}
						stroke={th.ink}
						stroke-width="1.5"
						stroke-linejoin="round"
					/>
					<path
						d="M88 118 Q100 110 112 118"
						fill="none"
						stroke={th.ink}
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</div>
		</div>

		<div
			style:display="inline-block"
			style:font-family={th.display}
			style:font-size="clamp(96px, 18vw, 180px)"
			style:line-height="0.9"
			style:font-weight="400"
			style:color={th.ink}
			style:letter-spacing="-4px"
		>
			{status}
		</div>

		<h1
			style:font-family={th.display}
			style:font-size="clamp(36px, 6vw, 56px)"
			style:line-height="1"
			style:margin="0"
			style:font-weight="400"
			style:color={th.ink}
		>
			{t.title}
		</h1>

		<p
			style:font-family={th.body}
			style:font-size="18px"
			style:line-height="1.55"
			style:color={th.inkSoft}
			style:margin="0"
			style:max-width="440px"
			style:text-wrap="pretty"
		>
			{t.body}
		</p>

		<a
			href="/"
			style:background={th.coral}
			style:color={th.paper}
			style:border="2.5px solid {th.ink}"
			style:border-radius="99px"
			style:padding="14px 24px"
			style:font-family={th.body}
			style:font-weight="800"
			style:font-size="16px"
			style:text-decoration="none"
			style:box-shadow="5px 5px 0 {th.ink}"
			style:display="inline-block"
		>
			← {t.home}
		</a>
	</div>
</main>
