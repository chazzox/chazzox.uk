<script>
	export let url;
	export let img;
	export let background;
</script>

<a href={url} class="project" style={`background-color: ${background}`}>
	<div class="pseudoElement" style={`background-image:url(${img}); transform: translate(-10%, -60px) rotate(30deg)`} />
</a>

<style type="text/scss">
	.project {
		text-decoration: none;
		&,
		.pseudoElement {
			transition: all 0.3s ease;
		}
		flex: 1;
		overflow: hidden;
		position: relative;
		.pseudoElement {
			position: absolute;
			height: 250%;
			width: 250%;
			top: -50%;
			left: -50%;
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center;
			transform: rotate(30deg);
		}
		&:hover {
			flex: 2;
			.pseudoElement {
				opacity: 1 !important;
				background-size: 130%;
				transform: rotate(10deg);
			}
		}
	}
</style>
