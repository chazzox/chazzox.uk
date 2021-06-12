<script>
	import DeviceDetector from 'svelte-device-detector';
	import Particles from 'svelte-particles';
	import Footer from './Footer.svelte';

	export let particlesConfig;
</script>

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>

<section class="app">
	<div class="center">
		<div class="container">
			<div id="projectContainer">
				<a href="https://chazzox.github.io/shortcuts/" class="project" style="background-color: #667eff">
					<div
						class="pseudoElement"
						style="background-image: url('images/shortcuts.jpg'); transform: translate(-10%, -60px) rotate(30deg)"
					/>
				</a>
				<a href="https://hydrova.netlify.app/" class="project" style="background-color: #875fb3">
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
					I like to make things. I learn languages as I go depending on where a project takes me, check out a
					couple of my projects to see what I'm working on right now.
				</p>
				<p>
					I'm currently a full time student. So my time is shared between these projects and my work at uni, I try
					and spend a good amount of time on the projects though, as they are things that I aim to eventually use (I
					already use Hydrova)
				</p>
				<p>
					My interests lie in web development, software engineering and cyber security. And I usually make projects
					around these interests. If you want to contact me on a project then email me at
					<a href="mailto:31caylo13@gmail.com">31caylo13@gmail.com</a>
				</p>
			</div>
		</div>
	</div>
	<Footer />
</section>
<DeviceDetector showInDevice="desktop">
	<Particles id="tsparticles" options={particlesConfig} />
</DeviceDetector>

<style type="text/scss">
	:global(body, html) {
		margin: 0;
		padding: 0;
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
	.app {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: auto;
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
		padding: 30px;
		box-sizing: border-box;
		border-radius: 55px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap-reverse;
		> #projectContainer {
			z-index: 1;
			min-height: 600px;
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
			flex: 1 1 250px;
			margin: 15px;
		}
	}
</style>
