<script lang="ts">
	export let url: string = '';
	export let displayText: string;
	export let classString: string;
	export let onClick: undefined | (() => void) = undefined;
</script>

<a
	target="_blank"
	href={url}
	on:click={onClick}
	class={'flex-1 y-1 px-2 dark:text-white p-2 sm:bg-none hover:bg-gradient-to-r transition-colors font-semibold text-center hover:text-white ' +
		classString}
	>{displayText}
</a>
