<script>
	// import DeviceDetector from 'svelte-device-detector';
	import Particles from 'svelte-particles';
	import Footer from '../components/Footer.svelte';
	let particlesConfig = {
		particles: {
			number: {
				value: 100,
				density: {
					enable: true,
					value_area: 1000
				},
				max: -1
			},
			color: { value: '#FFF' },
			shape: {
				type: 'circle',
				polygon: { sides: 5 },
				image: { src: '', width: 100, height: 100 }
			},
			stroke: { width: 0, color: '#000000' },
			opacity: {
				value: 0.5,
				random: !1,
				anim: { enable: !0, speed: 1, minimumValue: 0.1, sync: !1 }
			},
			size: {
				value: 1,
				random: !1,
				anim: { enable: !1, speed: 40, minimumValue: 0, sync: !1 }
			},
			links: {
				enable: !0,
				distance: 150,
				color: '#FFF',
				opacity: 0.6,
				width: 1,
				shadow: { enable: !1, blur: 5, color: 'lime' }
			},
			move: {
				enable: !0,
				speed: 3,
				direction: 'none',
				random: !1,
				straight: !1,
				outMode: 'bounce',
				bounce: !0,
				attract: { enable: !1, rotateX: 3e3, rotateY: 3e3 }
			}
		},
		detectRetina: !0,
		fpsLimit: 999,
		polygon: {
			enable: !1,
			scale: 1,
			type: 'inline',
			inline: { arrangement: 'onePerPoint' },
			draw: {
				enable: !1,
				stroke: { width: 0.5, color: 'rgba(255, 255, 255, .1)' }
			},
			move: { radius: 10, type: 'path' },
			url: ''
		}
	};
</script>

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>

<section class="app">
	<div class="center">
		<div class="container">
			<div id="projectContainer">
				<a
					href="https://chazzox.github.io/shortcuts/"
					class="project"
					style="background-color: #667eff"
					target="_parent"
				>
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
				<a href="./tutoring" class="project" style="background-color: #875fb3"><div class="text">Tutoring</div></a>
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
					and spend a good amount of time on the projects though, as they are things that I aim to eventually use
					(I already use Hydrova)
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
<!-- <DeviceDetector showInDevice="desktop"> -->
<!-- <Particles id="tsparticles" options={particlesConfig} /> -->

<!-- </DeviceDetector> -->
<style type="text/scss">
	:global(#tsparticles) {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -999;
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
				text-decoration: none;
				&,
				.pseudoElement {
					transition: all 0.3s ease;
					-webkit-transition: all 0.3s ease;
					-o-transition: all 0.3s ease;
					-ms-transition: all 0.3s ease;
				}
				.text {
					display: flex;
					width: 100%;
					height: 100%;
					justify-content: center;
					align-items: center;
					font-weight: 700;
					font-size: 50px;
					color: white;
					text-decoration: none;
					transform: rotate(45deg);
					transition: all 0.1s linear;
					-webkit-transition: all 0.1s linear;
					-o-transition: all 0.1s linear;
					-ms-transition: all 0.1s linear;
				}
				.text:hover {
					font-size: 75px;
					transform: rotate(0deg);
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
