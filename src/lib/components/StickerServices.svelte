<script lang="ts">
	import type { Copy } from '$lib/content';
	import { theme as th } from '$lib/content';
	import StickerSection from './StickerSection.svelte';

	let { t }: { t: Copy } = $props();

	const tints = [th.mint, th.sun, th.pink, th.coral];
</script>

<div id="services" class="jd-section" style:background={th.bgAlt} style:position="relative">
	<StickerSection
		kicker={t.sectionKickers.services}
		title={t.servicesH}
		sub={t.servicesSub}
		color={th.sun}
	/>

	<div
		class="jd-grid-4"
		style:display="grid"
		style:grid-template-columns="repeat(4, 1fr)"
		style:gap="18px"
	>
		{#each t.services as s, i (s.tag)}
			{@const isCustom = i === 3}
			<div
				class="jd-card-hover"
				style:background={isCustom ? th.ink : th.paper}
				style:color={isCustom ? th.paper : th.ink}
				style:border="2.5px solid {th.ink}"
				style:border-radius="22px"
				style:padding="22px"
				style:display="flex"
				style:flex-direction="column"
				style:box-shadow="5px 6px 0 {th.ink}"
				style:min-height="340px"
				style:position="relative"
			>
				<div
					style:position="absolute"
					style:top="-14px"
					style:left="18px"
					style:background={tints[i]}
					style:border="2px solid {th.ink}"
					style:padding="4px 12px"
					style:border-radius="99px"
					style:font-family={th.mono}
					style:font-size="11px"
					style:font-weight="800"
					style:color={tints[i] === th.coral ? th.paper : th.ink}
					style:letter-spacing="1px"
				>
					{s.tag}
				</div>
				<div style:margin-top="10px">
					{#if s.from}
						<div
							style:font-family={th.body}
							style:font-size="10px"
							style:color={isCustom ? th.sun : th.inkSoft}
							style:text-transform="uppercase"
							style:letter-spacing="1px"
							style:font-weight="800"
							style:margin-bottom="2px"
						>
							{s.from}
						</div>
					{/if}
					<div
						style:font-family={th.display}
						style:font-size="32px"
						style:color={isCustom ? th.sun : th.coral}
						style:line-height="1"
					>
						{s.price}
					</div>
				</div>
				<div
					style:font-family={th.display}
					style:font-size="24px"
					style:line-height="1.05"
					style:margin-top="18px"
				>
					{s.title}
				</div>
				<div
					style:font-family={th.body}
					style:font-size="12px"
					style:color={isCustom ? '#dac3a8' : th.inkSoft}
					style:margin-top="4px"
					style:font-weight="600"
				>
					{s.sub}
				</div>
				<div
					style:font-family={th.body}
					style:font-size="13px"
					style:line-height="1.5"
					style:color={isCustom ? '#dac3a8' : th.inkSoft}
					style:flex="1"
					style:margin-top="14px"
				>
					{s.body}
				</div>
				<div style:display="flex" style:flex-wrap="wrap" style:gap="5px" style:margin-top="14px">
					{#each s.bullets as b (b)}
						<span
							style:font-family={th.body}
							style:font-size="10.5px"
							style:padding="3px 9px"
							style:border-radius="99px"
							style:background={isCustom ? `${th.paper}18` : tints[i]}
							style:color={isCustom ? th.paper : th.ink}
							style:font-weight="700"
							style:border="1.5px solid {isCustom ? th.paper + '40' : th.ink}"
						>
							{b}
						</span>
					{/each}
				</div>
				{#if s.examples && s.examples.length > 0}
					<div
						style:margin-top="14px"
						style:padding-top="12px"
						style:border-top="1.5px dashed {isCustom ? th.paper + '40' : th.ink + '33'}"
					>
						<div
							style:font-family={th.body}
							style:font-size="10px"
							style:font-weight="800"
							style:text-transform="uppercase"
							style:letter-spacing="1.2px"
							style:color={isCustom ? th.sun : th.inkSoft}
							style:margin-bottom="6px"
						>
							{t.servicesExampleLabel}
						</div>
						<div style:display="flex" style:flex-direction="column" style:gap="4px">
							{#each s.examples as ex (ex.url)}
								<a
									href={ex.url}
									target="_blank"
									rel="noopener noreferrer"
									style:font-family={th.mono}
									style:font-size="12px"
									style:color={isCustom ? th.sun : th.coral}
									style:font-weight="700"
									style:text-decoration="underline"
									style:text-underline-offset="3px"
									style:padding="6px 0"
									style:line-height="1"
									style:display="inline-block"
								>
									↗ {ex.label}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Hourly umbrella card -->
	<div style:margin-top="36px" style:position="relative">
		<div
			style:position="absolute"
			style:top="-16px"
			style:left="32px"
			style:background={th.coral}
			style:border="2.5px solid {th.ink}"
			style:padding="5px 14px"
			style:border-radius="99px"
			style:font-family={th.mono}
			style:font-size="11px"
			style:font-weight="800"
			style:color={th.paper}
			style:letter-spacing="1px"
			style:z-index="2"
		>
			{t.hourly.tag}
		</div>
		<div
			class="jd-hourly-grid"
			style:background={th.paper}
			style:border="2.5px solid {th.ink}"
			style:border-radius="26px"
			style:box-shadow="6px 7px 0 {th.ink}"
			style:overflow="hidden"
			style:display="grid"
			style:grid-template-columns="0.85fr 2fr"
			style:gap="0"
		>
			<div
				class="jd-hourly-left"
				style:background={th.sun}
				style:padding="40px 32px"
				style:border-right="2.5px solid {th.ink}"
				style:display="flex"
				style:flex-direction="column"
				style:justify-content="center"
				style:position="relative"
			>
				<div
					style:font-family={th.display}
					style:font-size="44px"
					style:color={th.ink}
					style:line-height="1"
				>
					{t.hourly.title}
				</div>
				<div
					style:font-family={th.body}
					style:font-size="14px"
					style:color={th.ink}
					style:margin-top="8px"
					style:font-weight="600"
				>
					{t.hourly.sub}
				</div>
				<div
					style:margin-top="24px"
					style:display="inline-flex"
					style:align-items="baseline"
					style:gap="0"
					style:background={th.paper}
					style:border="2.5px solid {th.ink}"
					style:border-radius="18px"
					style:padding="14px 22px"
					style:box-shadow="4px 4px 0 {th.ink}"
					style:align-self="flex-start"
				>
					<span
						style:font-family={th.display}
						style:font-size="56px"
						style:color={th.coral}
						style:line-height="1"
					>
						{t.hourly.price}
					</span>
				</div>
				<div
					style:margin-top="22px"
					style:font-family={th.body}
					style:font-size="14px"
					style:line-height="1.5"
					style:color={th.ink}
					style:font-weight="500"
				>
					{t.hourly.lead}
				</div>
				<div
					style:position="absolute"
					style:bottom="-18px"
					style:right="-18px"
					style:width="70px"
					style:height="70px"
					style:border-radius="50%"
					style:background={th.mint}
					style:border="2.5px solid {th.ink}"
					style:transform="rotate(-12deg)"
					style:display="grid"
					style:place-items="center"
					style:font-family={th.display}
					style:font-size="18px"
					style:color={th.ink}
					style:box-shadow="3px 3px 0 {th.ink}"
				>
					flex
				</div>
			</div>
			<div style:padding="32px 32px 28px" style:background={th.paper}>
				<div
					class="jd-hourly-items"
					style:display="grid"
					style:grid-template-columns="repeat(2, 1fr)"
					style:column-gap="18px"
					style:row-gap="14px"
				>
					{#each t.hourly.items as it (it.t)}
						<div
							style:display="flex"
							style:gap="12px"
							style:padding="12px 14px"
							style:background={th.bg}
							style:border-radius="14px"
							style:border="2px solid {th.ink}"
							style:align-items="flex-start"
						>
							<div style:font-size="22px" style:line-height="1" style:margin-top="2px">
								{it.icon}
							</div>
							<div style:flex="1">
								<div
									style:font-family={th.body}
									style:font-size="14px"
									style:color={th.ink}
									style:font-weight="800"
									style:line-height="1.2"
								>
									{it.t}
								</div>
								<div
									style:font-family={th.body}
									style:font-size="12px"
									style:color={th.inkSoft}
									style:margin-top="3px"
									style:line-height="1.4"
								>
									{it.d}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Hosting -->
	<div
		class="jd-hosting-grid"
		style:margin-top="36px"
		style:background={th.mint}
		style:border-radius="22px"
		style:padding="32px"
		style:border="2.5px solid {th.ink}"
		style:box-shadow="6px 7px 0 {th.ink}"
		style:display="grid"
		style:grid-template-columns="1.2fr 1fr 1fr"
		style:gap="22px"
		style:align-items="center"
	>
		<div>
			<div
				style:font-family={th.display}
				style:font-size="32px"
				style:color={th.ink}
				style:line-height="1"
			>
				{t.hostingTitle}
			</div>
			<div
				style:font-family={th.body}
				style:font-size="14px"
				style:color={th.ink}
				style:margin-top="10px"
				style:line-height="1.5"
			>
				{t.hostingBody}
			</div>
		</div>
		{#each [t.hostingA, t.hostingB] as h (h.title)}
			<div
				style:padding="18px"
				style:background={th.paper}
				style:border-radius="14px"
				style:border="2px solid {th.ink}"
			>
				<div
					style:font-family={th.body}
					style:font-size="11px"
					style:letter-spacing="1.5px"
					style:text-transform="uppercase"
					style:color={th.inkSoft}
					style:font-weight="800"
				>
					{h.title}
				</div>
				<div
					style:font-family={th.display}
					style:font-size="24px"
					style:color={th.coral}
					style:margin-top="4px"
				>
					{h.price}
				</div>
				<div
					style:font-family={th.body}
					style:font-size="13px"
					style:color={th.inkSoft}
					style:margin-top="8px"
					style:line-height="1.5"
				>
					{h.body}
				</div>
			</div>
		{/each}
	</div>
</div>
