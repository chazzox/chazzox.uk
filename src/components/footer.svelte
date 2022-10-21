<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { backInOut } from 'svelte/easing';
	import FooterLink from './footer-link.svelte';
	import copy from 'copy-to-clipboard';

	const show = tweened(-32, {
		duration: 400,
		easing: backInOut
	});

	const bounceHandle = () => {
		copy('chazzox#1001');
		show.set(5);
		setTimeout(() => show.set(-32), 800);
	};
</script>

<div class="fixed flex w-full justify-center" style={`top: ${$show}px`}>
	<div class="rounded-lg bg-green-600 py-0.5 px-1 text-white">Copied: chazzox#1001!</div>
</div>
<div
	class="relative mx-6 my-9 overflow-hidden rounded-xl border-[0.5px] border-black shadow-2xl backdrop-blur-lg sm:mx-auto sm:bg-transparent"
>
	<div class="z-1 relative z-50 flex flex-row flex-wrap justify-center">
		<FooterLink url="https://github.com/chazzox" className="from-githubTwo to-githubOne" displayText="Github" />
		<FooterLink
			url="https://open.spotify.com/user/lntwtvllegk9frl5rn3elv0dk"
			className="to-spotifyOne from-spotifyTwo"
			displayText="Spotify"
		/>
		<FooterLink className="from-discordOne to-discordTwo" onClick={bounceHandle} displayText="Discord" />
		<FooterLink
			url="https://www.linkedin.com/in/chazzox/"
			className="from-linkedinOne to-linkedinTwo"
			displayText="LinkedIn"
		/>
	</div>
</div>
