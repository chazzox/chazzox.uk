<script>
	export let url;
	export let displayText;
	export let classString;
	export let onClick = undefined;
</script>

<a
	target="_blank"
	href={url}
	on:click={onClick}
	class={'flex-1 y-1 px-2 dark:text-white p-2 sm:bg-none hover:bg-gradient-to-r transition-colors font-semibold text-center hover:text-white ' +
		classString}
	>{displayText}
</a>
