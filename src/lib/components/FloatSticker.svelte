<script lang="ts">
	let { color, text }: { color: string; text: string } = $props();
</script>

<div
	style:width="100px"
	style:height="100px"
	style:border-radius="50%"
	style:background={color}
	style:border="3px solid #1a1a1a"
	style:display="grid"
	style:place-items="center"
	style:font-family='ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
	style:font-size="22px"
	style:color="#1a1a1a"
	style:box-shadow="5px 6px 0 #1a1a1a"
>
	{text}
</div>
