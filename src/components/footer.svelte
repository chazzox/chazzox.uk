<script>
	import { tweened } from 'svelte/motion';
	import { backInOut } from 'svelte/easing';
	import classname from 'classnames';
	import copy from 'copy-to-clipboard';

	const show = tweened(-32, {
		duration: 400,
		easing: backInOut
	});
</script>

<div class="fixed">Copied: chazzox#1001!</div>
<div
	class="flex flex-col text-white sm:bg-slate-200 sm:text-black sm:flex-row sm:mx-auto sm:my-6  sm:rounded-xl sm:overflow-hidden"
>
	<a
		class="bg-gradient-to-r from-githubOne to-githubTwo py-1 px-2 sm:bg-none sm:hover:bg-black sm:hover:text-white sm:p-2 sm:hover:bg-gradient-to-r transition-colors duration-300"
		href="https://github.com/chazzox">Github</a
	>
	<a
		class="bg-gradient-to-r from-spotifyOne to-spotifyTwo py-1 px-2 sm:bg-none sm:hover:bg-black sm:hover:text-white sm:p-2 sm:hover:bg-gradient-to-r transition-colors duration-300"
		href="https://open.spotify.com/user/lntwtvllegk9frl5rn3elv0dk">Spotify</a
	>
	<a
		class="bg-gradient-to-r from-redditOne to-redditTwo py-1 px-2 sm:bg-none sm:hover:bg-black sm:hover:text-white sm:p-2 sm:hover:bg-gradient-to-r transition-colors duration-300"
		href="https://hydrova.netlify.app/u/chazzox">Reddit</a
	>
	<a
		class="bg-gradient-to-r from-twitterOne to-twitterTwo py-1 px-2 sm:bg-none sm:hover:bg-black sm:hover:text-white sm:p-2 sm:hover:bg-gradient-to-r transition-colors duration-300"
		href="https://twitter.com/_chazzox_">Twitter</a
	>

	<span
		class="bg-gradient-to-r from-discordOne to-discordTwo py-1 px-2 sm:bg-none sm:hover:bg-black sm:hover:text-white sm:p-2 sm:hover:bg-gradient-to-r transition-colors duration-300 cursor-pointer"
		id="discord"
		on:click={() => {
			copy('chazzox#1001');
			show.set(5);
			setTimeout(() => show.set(-32), 800);
		}}
		>Discord
	</span>
</div>
