<script lang="ts">
	export let url: string;
	export let name: string;
	export let description: string;
</script>

<div class="projectContainer my-4">
	<p class="py-1 hidden sm:block">
		<a href={url} target="_blank" class="underline">{name}</a> - {description}
	</p>
	<a href={url} target="_blank" class="underline text-lg sm:hidden text-center block">{name}</a>
	<p class="sm:hidden text-center">{description}</p>
</div>
