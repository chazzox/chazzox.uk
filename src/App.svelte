<script>
	import Particles from 'svelte-particles';
	import Header from './Header.svelte';

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

<style type="text/scss">
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

	* {
		font-family: 'Open Sans', sans-serif;
		box-sizing: border-box;
		color: white;
	}

	.absCenter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	:global(html) {
		background: linear-gradient(153deg, #667eff 5%, #ff849d 100%);
		background-repeat: no-repeat;
		background-size: cover;
	}

	:global(body) {
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.bigBox {
		width: calc(100vw - 20px);
		max-width: 900px;
		background-color: #f7eaea;
		box-shadow: 27px 43px 92px -6px rgba(0, 0, 0, 0.75);
		width: 100%;
		height: calc(100vh - 200px);
		padding: 15px;
		box-sizing: border-box;
		border-radius: 55px;
		#mainContent {
			position: absolute;
			right: 30px;
			top: 30px;
			height: calc(100% - 30px);
			width: calc(50% - 60px);
			height: 100%;
			h1 {
				margin-bottom: 10px;
			}
			h2 {
				margin-top: 0px;
				margin-bottom: 30px;
			}
		}
		#sidebar {
			position: absolute;
			left: 30px;
			top: 30px;
			width: calc(50% - 60px);
			height: calc(100% - 60px);
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.project {
				&:first-child {
					border-radius: 40px 40px 0 0;
				}
				&:last-child {
					border-radius: 0 0 40px 40px;
				}
				text-decoration: none;
				width: 100%;
				display: block;
				text-align: center;
				flex: 1;
				overflow: hidden;
				position: relative;
				transition: all 0.3s ease;
				-webkit-transition: all 0.3s ease;
				-moz-transition: all 0.3s ease;
				-o-transition: all 0.3s ease;
				-ms-transition: all 0.3s ease;
				span {
					display: block;
					font-size: 24px;
					transform: translate(-50%, -50%) rotate(-60deg) scale(0.5);
					opacity: 0;
					transition: all 0.3s ease;
					-webkit-transition: all 0.3s ease;
					-moz-transition: all 0.3s ease;
					-o-transition: all 0.3s ease;
					-ms-transition: all 0.3s ease;
				}
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
					transition: all 0.3s ease;
					-webkit-transition: all 0.3s ease;
					-moz-transition: all 0.3s ease;
					-o-transition: all 0.3s ease;
					-ms-transition: all 0.3s ease;
				}

				&:hover {
					flex: 2;
					.pseudoElement {
						opacity: 1 !important;
						background-size: 130%;
						transform: rotate(10deg);
					}
					span {
						opacity: 1;
						transform: rotate(0deg) translate(-50%, -50%) scale(1);
					}
				}
			}
			&:hover {
				.project {
					height: 30%;
					.pseudoElement {
						opacity: 0.6;
					}
				}
			}
		}
		h1,
		h2,
		p {
			color: #875fb3;
		}

		h1 {
			font-size: 40pt;
			font-weight: 900;
		}

		p {
			font-size: 14pt;
		}
	}
</style>

<Header />
<div class="bigBox absCenter">
	<div id="mainContent">
		<h1>Charlie</h1>
		<h2>Hobbyist programmer</h2>
		<p>Hi, i'm chazzox, also known as charlie.</p>
		<p>
			I like to make things, I learn languages as I go depending on where a project takes me, check out a couple of my
			projects to see what I'm working on right now.
		</p>
	</div>

	<div id="sidebar">
		<a href="https://chazzox.github.io/shortcuts/" class="project" style="background-color: #667eff">
			<div class="pseudoElement" style="background-image: url('images/shortcuts.jpg') " />
			<span class="absCenter">Shortcuts</span>
		</a>
		<a href="https://chazzox.github.io/organiseMe/" class="project" style=" background-color: #776FD9">
			<div class="pseudoElement" style="background-image: url('images/organiseMe.jpg')" />
		</a>
		<a href="https://chazzox.github.io/Hydrova/" class="project" style="background-color: #875fb3">
			<div
				class="pseudoElement"
				style="background-image:url('images/hydrova.jpg'); transform: translate(-10%, -60px) rotate(30deg)" />
		</a>
	</div>
</div>
<Particles id="tsparticles" options={particlesConfig} />

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>
