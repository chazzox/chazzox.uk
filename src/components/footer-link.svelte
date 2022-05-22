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
	class={'flex-1 y-1 px-2 text-white p-2 sm:bg-none hover:bg-gradient-to-r hover:transition-all hover:duration-1000 font-semibold text-center ' +
		classString}
	>{displayText}
</a>
