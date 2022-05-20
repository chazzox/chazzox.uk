<script>
	export let url;
	export let displayText;
	export let classString;
</script>

<a
	target="_blank"
	href={url}
	class={'flex-1 y-1 px-2 hover:bg-black hover:text-white p-2 hover:bg-gradient-to-r transition-colors duration-400 font-semibold text-center ' +
		classString}
	>{displayText}
</a>
