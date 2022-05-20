<script>
	export let url;
	export let img = 'images/github.svg';
	export let background;
	export let name;

	export let iconOnly = false;

	export let iconGradientFrom = '#040d21';
	export let iconGradientTo = '#3a3da0';
</script>

<div class="projectContainer">
	<a href={url} target="_blank" />
	<p>{name}</p>
</div>

<style lang="scss">
</style>
