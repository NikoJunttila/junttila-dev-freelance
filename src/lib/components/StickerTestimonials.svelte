<script lang="ts">
	import type { Copy, Lang, PortfolioItem, Testimonial } from '$lib/content';
	import { PORTFOLIO, theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';

	let { t, lang }: { t: Copy; lang: Lang } = $props();

	const rotations = [-1, 0.6, -0.4];
	const fallback: Array<PortfolioItem['palette']> = [
		[th.mint, th.mintDeep, th.ink, '#E6F1E9'],
		[th.sun, '#C99529', th.ink, '#FDF1D2'],
		[th.pink, '#C97A7A', th.ink, '#FBE0E0']
	];

	function initials(name: string): string {
		const parts = name.trim().split(/\s+/);
		if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
		return parts
			.slice(0, 2)
			.map((p) => p[0] ?? '')
			.join('')
			.toUpperCase();
	}

	function project(tt: Testimonial): PortfolioItem | undefined {
		return tt.portfolioId ? PORTFOLIO.find((p) => p.id === tt.portfolioId) : undefined;
	}

	const visitCta = $derived(lang === 'fi' ? 'Katso sivu' : 'View site');
</script>

<div id="testimonials" class="jd-section" style:background={th.bgAlt}>
	<StickerSection
		kicker={t.sectionKickers.testimonials}
		title={t.testimonialsH}
		color={th.coral}
	/>
	<div
		class="jd-grid-3"
		style:display="grid"
		style:grid-template-columns="repeat(3, 1fr)"
		style:gap="26px"
	>
		{#each t.testimonials as tt, i (tt.who)}
			{@const p = project(tt)}
			{@const pal = p?.palette ?? fallback[i % fallback.length]}
			<div
				class="jd-card-hover jd-testimonial-card"
				style:background={pal[3]}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="28px 26px 22px"
				style:box-shadow="6px 7px 0 {th.ink}"
				style:transform="rotate({rotations[i]}deg)"
				style:display="flex"
				style:flex-direction="column"
				style:gap="16px"
			>
				<div
					aria-hidden="true"
					style:display="flex"
					style:gap="3px"
					style:color={th.coral}
					style:font-size="16px"
					style:letter-spacing="2px"
					style:line-height="1"
				>
					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
				</div>

				<div style:position="relative">
					<div
						aria-hidden="true"
						style:font-family={th.display}
						style:font-size="72px"
						style:line-height="0.6"
						style:color={pal[1]}
						style:opacity="0.55"
						style:margin-bottom="2px"
					>
						“
					</div>
					<p
						style:font-family={th.body}
						style:font-size="16px"
						style:line-height="1.55"
						style:color={th.ink}
						style:margin="0"
						style:font-weight="500"
						style:text-wrap="pretty"
					>
						{tt.q}
					</p>
				</div>

				<div
					style:margin-top="auto"
					style:padding-top="18px"
					style:border-top="2px dashed {th.ink}40"
					style:display="flex"
					style:flex-direction="column"
					style:gap="12px"
				>
					<div style:display="flex" style:align-items="center" style:gap="12px">
						<div
							class="jd-avatar"
							aria-hidden="true"
							style:background="linear-gradient(135deg, {pal[0]}, {pal[1]})"
							style:border="2px solid {th.ink}"
						>
							{initials(tt.who)}
						</div>
						<div style:min-width="0" style:flex="1">
							<div
								style:font-family={th.body}
								style:font-weight="800"
								style:color={th.ink}
								style:font-size="15px"
								style:line-height="1.2"
							>
								{tt.who}
							</div>
							<div
								style:font-family={th.body}
								style:font-size="12px"
								style:color={th.inkSoft}
								style:margin-top="3px"
								style:line-height="1.3"
							>
								{tt.sub}
							</div>
						</div>
					</div>
					{#if p}
						<a
							class="jd-text-link jd-testimonial-link"
							href={p.href}
							target="_blank"
							rel="noopener noreferrer"
							style:font-family={th.mono}
							style:font-size="12px"
							style:color={th.ink}
							style:font-weight="700"
							style:letter-spacing="0.3px"
							style:align-self="flex-start"
						>
							{visitCta} → <span style:color={th.inkSoft}>{p.url}</span>
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.jd-testimonial-card {
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		will-change: transform;
	}
	.jd-testimonial-card:hover {
		box-shadow: 8px 9px 0 #1a1a1a !important;
	}

	.jd-avatar {
		width: 38px;
		height: 38px;
		flex: 0 0 38px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-weight: 800;
		font-size: 13px;
		color: #fffcf3;
		letter-spacing: 0.5px;
		text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
		box-shadow: 2px 2px 0 #1a1a1a;
	}

	.jd-testimonial-link {
		text-decoration: none;
		border-bottom: 2px solid transparent;
	}
	.jd-testimonial-link:hover {
		border-bottom-color: #1a1a1a;
	}
</style>
