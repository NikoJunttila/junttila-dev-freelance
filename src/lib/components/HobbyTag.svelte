<script lang="ts">
	let { color, icon, label }: { color: string; icon: string; label: string } = $props();
</script>

<div
	style:display="inline-flex"
	style:align-items="center"
	style:gap="8px"
	style:background={color}
	style:border="2.5px solid #1a1a1a"
	style:border-radius="99px"
	style:padding="8px 16px"
	style:font-family='"Plus Jakarta Sans", sans-serif'
	style:font-weight="700"
	style:font-size="14px"
	style:color="#1a1a1a"
	style:box-shadow="3px 3px 0 #1a1a1a"
>
	<span style:font-size="18px">{icon}</span>{label}
</div>
