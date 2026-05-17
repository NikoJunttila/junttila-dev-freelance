<script lang="ts">
	import { browser } from '$app/environment';
	import type { Copy, Lang } from '$lib/content';
	import { PORTFOLIO, theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';
	import BrowserChrome from './BrowserChrome.svelte';

	let { t, lang }: { t: Copy; lang: Lang } = $props();

	const AUTO_MS = 6000;

	let index = $state(0);
	let paused = $state(false);
	const total = PORTFOLIO.length;
	const current = $derived(PORTFOLIO[index]);

	const visitCta = $derived(lang === 'fi' ? 'Vieraile sivulla' : 'Visit site');
	const prevLabel = $derived(lang === 'fi' ? 'Edellinen työ' : 'Previous work');
	const nextLabel = $derived(lang === 'fi' ? 'Seuraava työ' : 'Next work');
	const counter = $derived(`${index + 1} / ${total}`);

	let tick = $state(0);
	let cardEl = $state<HTMLDivElement | null>(null);

	function go(delta: number) {
		index = (index + delta + total) % total;
		tick++;
	}

	function jump(i: number) {
		index = i;
		tick++;
	}

	function jumpAndScroll(i: number) {
		jump(i);
		if (!browser || !cardEl) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		cardEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
	}

	function onKey(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
		if (e.key === 'ArrowLeft') go(-1);
		else if (e.key === 'ArrowRight') go(1);
	}

	$effect(() => {
		if (!browser) return;
		// re-run when paused flips or when tick changes (manual nav resets the timer)
		tick;
		if (paused) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = window.setInterval(() => {
			index = (index + 1) % total;
		}, AUTO_MS);
		return () => window.clearInterval(id);
	});
</script>

<svelte:window onkeydown={onKey} />

<div id="work" class="jd-section" style:background={th.bg}>
	<StickerSection
		kicker={t.sectionKickers.work}
		title={t.workH}
		sub={t.workSub}
		color={th.coral}
	/>

	<div
		style:position="relative"
		onpointerenter={() => (paused = true)}
		onpointerleave={() => (paused = false)}
		onfocusin={() => (paused = true)}
		onfocusout={() => (paused = false)}
		role="region"
		aria-roledescription="carousel"
		aria-label={t.workH}
	>
		<div
			bind:this={cardEl}
			class="jd-work-card"
			style:border-radius="22px"
			style:overflow="hidden"
			style:background="#fff"
			style:border="2.5px solid {th.ink}"
			style:box-shadow="10px 12px 0 {th.ink}"
		>
			<BrowserChrome url={current.url} />

			<a
				class="jd-work-image-wrap"
				href={current.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={current.name}
				style:display="block"
				style:position="relative"
				style:background={current.palette[3]}
				style:border-bottom="2px solid {th.ink}"
			>
				{#if Array.isArray(current.image)}
					<div class="jd-work-image-pair">
						<img src={current.image[0]} alt={current.name} loading="lazy" />
						<img src={current.image[1]} alt={current.name} loading="lazy" />
					</div>
				{:else}
					<img
						src={current.image}
						alt={current.name}
						loading="lazy"
						style:width="100%"
						style:height="100%"
						style:object-fit="contain"
						style:display="block"
					/>
				{/if}
			</a>

			<div class="jd-work-meta">
				<div>
					<div
						style:display="flex"
						style:gap="10px"
						style:align-items="center"
						style:flex-wrap="wrap"
						style:margin-bottom="14px"
					>
						<span
							style:display="inline-block"
							style:background={current.palette[0]}
							style:color={th.ink}
							style:font-size="11px"
							style:letter-spacing="1.2px"
							style:text-transform="uppercase"
							style:padding="5px 12px"
							style:border-radius="99px"
							style:border="2px solid {th.ink}"
							style:font-weight="800">{current.tag[lang]}</span
						>
						<span
							style:font-family={th.mono}
							style:font-size="12px"
							style:color={th.inkSoft}
							style:font-weight="700"
							style:letter-spacing="1px">{current.year}</span
						>
					</div>
					<div
						class="jd-work-title"
						style:font-family={th.display}
						style:line-height="1.05"
						style:color={th.ink}
						style:font-weight="400"
					>
						{current.name}
					</div>
					<p
						style:font-size="16px"
						style:line-height="1.55"
						style:color={th.inkSoft}
						style:margin="12px 0 0"
						style:max-width="640px"
						style:text-wrap="pretty"
					>
						{current.desc[lang]}
					</p>
				</div>
				<a
					class="jd-btn jd-shadow-ink"
					href={current.href}
					target="_blank"
					rel="noopener noreferrer"
					style:background={th.sun}
					style:color={th.ink}
					style:border="2.5px solid {th.ink}"
					style:border-radius="99px"
					style:padding="14px 22px"
					style:font-weight="800"
					style:text-decoration="none"
					style:box-shadow="5px 5px 0 {th.ink}"
					style:white-space="nowrap"
					style:display="inline-flex"
					style:align-items="center"
					style:gap="8px"
					style:justify-self="end"
					style:align-self="end"
				>
					{visitCta} →
				</a>
			</div>
		</div>

		<div
			style:display="flex"
			style:align-items="center"
			style:justify-content="center"
			style:gap="20px"
			style:margin-top="34px"
			style:flex-wrap="wrap"
		>
			<button
				class="jd-btn jd-shadow-ink jd-arrow"
				aria-label={prevLabel}
				onclick={() => go(-1)}
				style:background={th.paper}
				style:color={th.ink}
				style:border="2.5px solid {th.ink}"
				style:border-radius="99px"
				style:cursor="pointer"
				style:box-shadow="4px 4px 0 {th.ink}">←</button
			>

			<div
				style:display="flex"
				style:gap="10px"
				style:align-items="center"
				style:padding="0 4px"
			>
				{#each PORTFOLIO as item, i (item.id)}
					<button
						class="jd-dot"
						aria-label={item.name}
						aria-current={i === index}
						onclick={() => jump(i)}
						style:height="12px"
						style:border-radius="99px"
						style:border="2px solid {th.ink}"
						style:background={i === index ? th.coral : th.paper}
						style:cursor="pointer"
						style:padding="0"
						style:width={i === index ? '34px' : '12px'}
					></button>
				{/each}
			</div>

			<button
				class="jd-btn jd-shadow-ink jd-arrow"
				aria-label={nextLabel}
				onclick={() => go(1)}
				style:background={th.paper}
				style:color={th.ink}
				style:border="2.5px solid {th.ink}"
				style:border-radius="99px"
				style:cursor="pointer"
				style:box-shadow="4px 4px 0 {th.ink}">→</button
			>

			<span
				style:font-family={th.mono}
				style:font-size="12px"
				style:color={th.inkSoft}
				style:font-weight="700"
				style:letter-spacing="1.5px"
				style:margin-left="6px">{counter}</span
			>
		</div>

		<div class="jd-work-thumbs">
			{#each PORTFOLIO as item, i (item.id)}
				<button
					class="jd-thumb"
					class:active={i === index}
					onclick={() => jumpAndScroll(i)}
					aria-label={item.name}
					aria-current={i === index}
				>
					<img
						src={Array.isArray(item.image) ? item.image[0] : item.image}
						alt=""
						loading="lazy"
						style:background={item.palette[3]}
					/>
					<span class="jd-thumb-label">{item.name}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.jd-work-card {
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.jd-work-image-wrap {
		min-height: 360px;
		max-height: 620px;
		height: 56vw;
	}

	.jd-work-image-wrap img {
		max-height: 620px;
	}

	.jd-work-image-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		width: 100%;
		height: 100%;
		padding: 8px;
		box-sizing: border-box;
	}

	.jd-work-image-pair img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		min-height: 0;
	}

	.jd-work-meta {
		padding: 30px 36px;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 28px;
		align-items: end;
	}

	.jd-work-title {
		font-size: clamp(26px, 3.4vw, 38px);
	}

	.jd-arrow {
		width: 54px;
		height: 54px;
		font-size: 22px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.jd-dot {
		transition:
			width 0.25s ease,
			background 0.25s ease;
	}

	.jd-work-thumbs {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 14px;
		margin-top: 34px;
	}

	.jd-thumb {
		padding: 0;
		cursor: pointer;
		background: transparent;
		border: 2px solid #1a1a1a;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 3px 3px 0 #1a1a1a;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
		display: flex;
		flex-direction: column;
		opacity: 0.78;
	}

	.jd-thumb:hover {
		transform: translate(-2px, -2px);
		box-shadow: 5px 5px 0 #1a1a1a;
		opacity: 1;
	}

	.jd-thumb.active {
		opacity: 1;
		border-color: #f08a5d;
		box-shadow: 4px 4px 0 #f08a5d;
	}

	.jd-thumb img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		object-position: top center;
		display: block;
	}

	.jd-thumb-label {
		display: block;
		padding: 8px 10px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.3px;
		color: #1a1a1a;
		background: #fffcf3;
		border-top: 2px solid #1a1a1a;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (max-width: 1024px) {
		.jd-work-meta {
			grid-template-columns: 1fr;
			padding: 24px 24px;
			gap: 22px;
			align-items: start;
		}
		.jd-work-image-wrap {
			min-height: 280px;
			height: 60vw;
		}
		.jd-work-thumbs {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 640px) {
		.jd-work-image-wrap {
			min-height: 220px;
			height: 64vw;
		}
		.jd-work-image-pair {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}
		.jd-work-meta {
			padding: 22px 20px;
		}
		.jd-work-thumbs {
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
		}
		.jd-thumb-label {
			font-size: 10px;
			padding: 6px 8px;
		}
		.jd-arrow {
			width: 46px;
			height: 46px;
		}
	}
</style>
