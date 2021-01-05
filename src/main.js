import App from './App.svelte';

const Index = new App({
	target: document.body,
	props: {
		particlesConfig: {
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
		}
	}
});

export default Index;
