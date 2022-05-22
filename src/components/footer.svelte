<script>
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

<div class="fixed w-full flex justify-center" style={`top: ${$show}px`}>
	<div class="bg-green-600 py-0.5 px-1 rounded-lg">Copied: chazzox#1001!</div>
</div>
<div
	class="flex flex-row flex-wrap justify-center text-black mx-3 sm:mx-auto my-9 rounded-xl overflow-hidden shadow-2xl relative border-black border-[0.5px]"
>
	<FooterLink url="https://github.com/chazzox" classString="from-githubTwo to-githubOne" displayText="Github" />
	<FooterLink
		url="https://open.spotify.com/user/lntwtvllegk9frl5rn3elv0dk"
		classString="to-spotifyOne from-spotifyTwo"
		displayText="Spotify"
	/>
	<FooterLink url="https://hydrova.netlify.app/u/chazzox" classString="from-redditOne to-redditTwo" displayText="Reddit" />
	<FooterLink url="https://twitter.com/_chazzox_" classString="from-twitterOne to-twitterTwo" displayText="Twitter" />
	<FooterLink classString="from-discordOne to-discordTwo cursor-pointer" on:click={bounceHandle} displayText="Discord" />
	<FooterLink
		url="https://www.linkedin.com/in/chazzox/"
		classString="from-linkedinOne to-linkedinTwo"
		displayText="LinkedIn"
	/>
</div>
