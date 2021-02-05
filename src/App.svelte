<script>
	import Particles from 'svelte-particles';
	import Footer from './Footer.svelte';

	export let particlesConfig;
</script>

<div class="center">
	<div class="container">
		<div id="projectContainer">
			<a href="https://chazzox.github.io/shortcuts/" class="project" style="background-color: #667eff">
				<div
					class="pseudoElement"
					style="background-image: url('images/shortcuts.jpg'); transform: translate(-10%, -60px) rotate(30deg)"
				/>
			</a>
			<a href="https://chazzox.github.io/Hydrova/" class="project" style="background-color: #875fb3">
				<div
					class="pseudoElement"
					style="background-image:url('images/hydrova.jpg'); transform: translate(-10%, -60px) rotate(30deg)"
				/>
			</a>
		</div>
		<div>
			<h1>Charlie</h1>
			<h2>Hobbyist programmer</h2>
			<p>Hi, I'm chazzox, also known as charlie.</p>
			<p>
				I like to make things, I learn languages as I go depending on where a project takes me, check out a couple of
				my projects to see what I'm working on right now.
			</p>
		</div>
	</div>
</div>
<Footer />
<Particles id="tsparticles" options={particlesConfig} />

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>

<style type="text/scss">
	:global(body, html) {
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	:global(html) {
		background: linear-gradient(153deg, #667eff 5%, #ff849d 100%);
		background-repeat: no-repeat;
		background-size: cover;
	}
	:global(#tsparticles) {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -999;
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1 0 auto;
		align-self: auto;
	}
	.container {
		max-width: 900px;
		background-color: #f7eaea;
		box-shadow: 27px 43px 92px -6px rgba(0, 0, 0, 0.75);
		width: calc(100vw - 50px);
		height: calc(100vh - 200px);
		padding: 30px;
		box-sizing: border-box;
		border-radius: 55px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap-reverse;
		> #projectContainer {
			z-index: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			border-radius: 40px;
			.project {
				&,
				.pseudoElement {
					transition: all 0.3s ease;
					-webkit-transition: all 0.3s ease;
					-o-transition: all 0.3s ease;
					-ms-transition: all 0.3s ease;
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
		}
		> div {
			width: calc(50% - 30px);
		}
	}
</style>
