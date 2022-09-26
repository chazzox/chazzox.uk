<script lang="ts">
	export let url: string;
	export let name: string;
	export let description: string;
</script>

<div class="projectContainer my-4">
	<p class="sm:py-1">
		<a href={url} target="_blank" class="underline text-lg sm:text-base">{name}</a><span class="hidden sm:inline-block whitespace-pre px-3">-</span><span class="block sm:inline-block">{description}</span>
	</p>
</div>
