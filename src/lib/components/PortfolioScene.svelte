<script lang="ts">
	import type { PortfolioItem } from '$lib/content';

	let { id, palette: p }: { id: PortfolioItem['id']; palette: PortfolioItem['palette'] } =
		$props();

	const dotsBooking = [0, 1, 2, 3];
	const cellsBooking = [0, 1, 2, 3, 4, 5, 6];
	const analyticsX = [40, 80, 120, 160, 200, 240, 280, 320, 360];
</script>

{#if id === 'saj'}
	<svg
		style="width:100%;height:100%;position:absolute;inset:0"
		viewBox="0 0 400 300"
		preserveAspectRatio="xMidYMid slice"
	>
		<rect width="400" height="300" fill={p[3]} />
		<rect x="20" y="20" width="100" height="14" rx="3" fill={p[2]} opacity="0.9" />
		<rect x="20" y="42" width="60" height="6" rx="2" fill={p[2]} opacity="0.4" />
		<rect x="20" y="70" width="220" height="170" rx="10" fill={p[0]} />
		<circle cx="130" cy="135" r="32" fill={p[1]} />
		<path d="M85 200 Q130 170 175 200 L175 240 L85 240 Z" fill={p[1]} />
		<circle cx="120" cy="130" r="3" fill={p[2]} />
		<circle cx="140" cy="130" r="3" fill={p[2]} />
		<rect x="258" y="70" width="120" height="10" rx="2" fill={p[2]} opacity="0.8" />
		<rect x="258" y="88" width="100" height="6" rx="2" fill={p[2]} opacity="0.35" />
		<rect x="258" y="100" width="110" height="6" rx="2" fill={p[2]} opacity="0.35" />
		<rect x="258" y="112" width="80" height="6" rx="2" fill={p[2]} opacity="0.35" />
		<rect x="258" y="140" width="100" height="26" rx="13" fill={p[1]} />
		<rect x="20" y="258" width="55" height="28" rx="4" fill={p[1]} opacity="0.85" />
		<rect x="83" y="258" width="55" height="28" rx="4" fill={p[0]} />
		<rect x="146" y="258" width="55" height="28" rx="4" fill={p[1]} opacity="0.85" />
		<rect x="209" y="258" width="55" height="28" rx="4" fill={p[0]} />
		<rect x="272" y="258" width="55" height="28" rx="4" fill={p[1]} opacity="0.85" />
	</svg>
{:else if id === 'esan'}
	<svg
		style="width:100%;height:100%;position:absolute;inset:0"
		viewBox="0 0 400 300"
		preserveAspectRatio="xMidYMid slice"
	>
		<rect width="400" height="300" fill={p[3]} />
		<rect x="20" y="20" width="120" height="14" rx="3" fill={p[2]} opacity="0.9" />
		<rect x="20" y="42" width="80" height="6" rx="2" fill={p[2]} opacity="0.4" />
		<rect x="20" y="70" width="360" height="140" rx="8" fill={p[1]} />
		<path
			d="M150 175 L150 130 Q150 110 170 110 L230 110 Q250 110 250 130 L250 175 L260 175 L260 195 L140 195 L140 175 Z"
			fill={p[0]}
		/>
		<rect x="160" y="135" width="80" height="40" rx="6" fill={p[1]} opacity="0.4" />
		<rect x="20" y="225" width="85" height="55" rx="6" fill={p[0]} />
		<rect x="115" y="225" width="85" height="55" rx="6" fill={p[1]} />
		<rect x="210" y="225" width="85" height="55" rx="6" fill={p[0]} />
		<rect x="305" y="225" width="75" height="55" rx="6" fill={p[1]} />
	</svg>
{:else if id === 'luxus'}
	<svg
		style="width:100%;height:100%;position:absolute;inset:0"
		viewBox="0 0 400 300"
		preserveAspectRatio="xMidYMid slice"
	>
		<rect width="400" height="300" fill={p[3]} />
		<rect x="20" y="20" width="100" height="14" rx="3" fill={p[2]} opacity="0.9" />
		<rect x="20" y="42" width="140" height="6" rx="2" fill={p[2]} opacity="0.4" />
		<rect x="20" y="70" width="200" height="140" rx="10" fill={p[1]} opacity="0.85" />
		<g transform="translate(120 140)">
			<ellipse cx="-22" cy="-10" rx="22" ry="28" fill={p[0]} />
			<ellipse cx="22" cy="-10" rx="22" ry="28" fill={p[0]} />
			<ellipse cx="-18" cy="18" rx="16" ry="20" fill={p[0]} opacity="0.8" />
			<ellipse cx="18" cy="18" rx="16" ry="20" fill={p[0]} opacity="0.8" />
			<rect x="-2" y="-30" width="4" height="60" rx="2" fill={p[2]} />
		</g>
		<rect x="234" y="70" width="146" height="44" rx="8" fill={p[0]} opacity="0.4" />
		<rect x="234" y="118" width="146" height="44" rx="8" fill={p[0]} opacity="0.4" />
		<rect x="234" y="166" width="146" height="44" rx="8" fill={p[0]} opacity="0.4" />
		<circle cx="248" cy="92" r="6" fill={p[0]} />
		<circle cx="248" cy="140" r="6" fill={p[0]} />
		<circle cx="248" cy="188" r="6" fill={p[0]} />
		<rect x="20" y="225" width="140" height="40" rx="20" fill={p[1]} />
		<rect x="40" y="240" width="100" height="10" rx="3" fill={p[3]} opacity="0.95" />
	</svg>
{:else if id === 'booking'}
	<svg
		style="width:100%;height:100%;position:absolute;inset:0"
		viewBox="0 0 400 300"
		preserveAspectRatio="xMidYMid slice"
	>
		<rect width="400" height="300" fill={p[3]} />
		<rect x="20" y="20" width="120" height="14" rx="3" fill={p[2]} opacity="0.9" />
		<rect x="20" y="42" width="100" height="6" rx="2" fill={p[2]} opacity="0.4" />
		<rect
			x="20"
			y="70"
			width="240"
			height="200"
			rx="10"
			fill="#fff"
			stroke={p[1]}
			stroke-width="1.5"
		/>
		<rect x="20" y="70" width="240" height="34" rx="10" fill={p[1]} />
		<rect x="34" y="84" width="60" height="8" rx="2" fill="#fff" opacity="0.95" />
		{#each dotsBooking as r (r)}
			{#each cellsBooking as c (c)}
				{@const filled = (r === 1 && c === 3) || (r === 2 && c === 1)}
				<rect
					x={32 + c * 32}
					y={118 + r * 34}
					width="24"
					height="24"
					rx="4"
					fill={filled ? p[0] : p[3]}
					stroke={p[1]}
					stroke-width="0.8"
				/>
			{/each}
		{/each}
		<rect x="275" y="70" width="105" height="22" rx="4" fill={p[0]} opacity="0.85" />
		<rect x="275" y="98" width="105" height="22" rx="4" fill={p[3]} stroke={p[1]} stroke-width="1" />
		<rect
			x="275"
			y="126"
			width="105"
			height="22"
			rx="4"
			fill={p[3]}
			stroke={p[1]}
			stroke-width="1"
		/>
		<rect
			x="275"
			y="154"
			width="105"
			height="22"
			rx="4"
			fill={p[3]}
			stroke={p[1]}
			stroke-width="1"
		/>
		<rect
			x="275"
			y="182"
			width="105"
			height="22"
			rx="4"
			fill={p[3]}
			stroke={p[1]}
			stroke-width="1"
		/>
		<rect x="275" y="234" width="105" height="36" rx="6" fill={p[1]} />
	</svg>
{:else if id === 'analytics'}
	<svg
		style="width:100%;height:100%;position:absolute;inset:0"
		viewBox="0 0 400 300"
		preserveAspectRatio="xMidYMid slice"
	>
		<rect width="400" height="300" fill={p[3]} />
		<rect x="20" y="20" width="120" height="14" rx="3" fill={p[2]} opacity="0.85" />
		<rect x="20" y="42" width="80" height="6" rx="2" fill={p[2]} opacity="0.4" />
		<rect x="20" y="70" width="115" height="50" rx="8" fill="#fff" stroke={p[2]} stroke-opacity="0.18" />
		<rect x="143" y="70" width="115" height="50" rx="8" fill="#fff" stroke={p[2]} stroke-opacity="0.18" />
		<rect x="266" y="70" width="114" height="50" rx="8" fill={p[1]} />
		<rect x="32" y="82" width="40" height="6" rx="2" fill={p[2]} opacity="0.5" />
		<rect x="32" y="96" width="60" height="12" rx="2" fill={p[2]} />
		<rect x="155" y="82" width="40" height="6" rx="2" fill={p[2]} opacity="0.5" />
		<rect x="155" y="96" width="60" height="12" rx="2" fill={p[2]} />
		<rect x="278" y="82" width="40" height="6" rx="2" fill={p[0]} opacity="0.85" />
		<rect x="278" y="96" width="60" height="12" rx="2" fill={p[0]} />
		<rect x="20" y="135" width="360" height="135" rx="8" fill="#fff" stroke={p[2]} stroke-opacity="0.18" />
		<path
			d="M40 235 L80 215 L120 220 L160 195 L200 200 L240 170 L280 175 L320 145 L360 155"
			fill="none"
			stroke={p[1]}
			stroke-width="2.5"
			stroke-linejoin="round"
			stroke-linecap="round"
		/>
		<path
			d="M40 235 L80 215 L120 220 L160 195 L200 200 L240 170 L280 175 L320 145 L360 155 L360 255 L40 255 Z"
			fill={p[1]}
			opacity="0.12"
		/>
		{#each analyticsX as x, i (x)}
			<circle cx={x} cy={i === 7 ? 145 : 235 - i * 5} r={i === 7 ? 4 : 2.5} fill={p[1]} />
		{/each}
	</svg>
{/if}
