<script>
	import copy from 'copy-to-clipboard';
	import { tweened } from 'svelte/motion';
	import { backInOut, linear } from 'svelte/easing';
	const show = tweened(-32, {
		duration: 400,
		easing: backInOut
	});
	const text = tweened(0, {
		duration: 40,
		easing: linear
	});
</script>

<div id="success" style={`z-index:999; top: ${$show}px`}>Copied!</div>

<div class="footerWrapper">
	<div class="footerContainer">
		<a class="profileLink" id="github" href="https://github.com/chazzox">Github</a>
		<a class="profileLink" id="spotify" href="https://open.spotify.com/user/lntwtvllegk9frl5rn3elv0dk">Spotify</a>
		<a class="profileLink" id="reddit" href="https://hydrova.netlify.app/u/chazzox">Reddit</a>
		<a class="profileLink" id="twitter" href="https://twitter.com/_chazzox_">Twitter</a>
		<span
			class="profileLink"
			id="discord"
			on:click={() => {
				copy('chazzox#1001');
				show.set(5);
				setTimeout(() => show.set(-32), 800);
			}}
			on:mouseenter={() => text.set(': chazzox#1001'.length)}
			on:mouseleave={() => text.set(0)}
			>Discord{': chazzox#1001'.slice(0, $text)}
		</span>
	</div>
</div>

<style lang="scss">
	#success {
		color: white;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		padding: 2px 5px;
		border-radius: 5px;
		background-color: #43b581;
	}
	.footerWrapper {
		display: flex;
		justify-content: center;
		margin-top: 60px;
		margin-bottom: 15px;
	}
	.footerContainer {
		background-color: #f7eaea;
		padding: 15px;
		border-radius: 55px;
	}
	.profileLink {
		text-decoration: none;
		border-radius: 55px;
		padding: 5px;
		color: white;
		font-size: 15px;
		font-weight: bold;
		transition: padding 0.2s ease;
		line-height: 18px;
		&:hover {
			font-size: 18px;
			padding: 7px 10px;
		}
	}
	#github {
		background: linear-gradient(to right, #040d21, #3a3da0);
	}
	#spotify {
		background: linear-gradient(to right, #1db954, #181818);
	}
	#reddit {
		background: linear-gradient(to right, #ff4c02, #ed0a21);
	}
	#twitter {
		background: linear-gradient(to right, #55acef, #0a76e7);
	}
	#discord {
		background: linear-gradient(to right, #7289da, #21357d);
		cursor: pointer;
	}
</style>
