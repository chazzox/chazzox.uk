<script>
	import { onMount } from 'svelte';

	import Footer from '../components/footer.svelte';
	import Project from '../components/project.svelte';

	let bgClassString = 'chrome';

	onMount(async () => {
		if (
			!(
				window.navigator.userAgent.includes('Chrome') ||
				window.navigator.userAgent.includes('Safari')
			)
		) {
			bgClassString = 'firefox';
		}
	});
</script>

<svelte:head>
	<title>Chazzox's Website</title>
	<meta property="og:title" content="chazzox's personal website" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Portfolio site for my projects" />
	<meta name="description" content="Portfolio site for my projects" />
	<meta property="og:image" content="/images/screenshot.jpg" />
	<meta property="og:url" content="/" />
	<meta name="twitter:card" content="/images/screenshot.jpg" />
</svelte:head>

<div class="flex flex-col dark:text-white min-h-screen bg-cover bg-main-img bg-center bg-fixed">
	<div class="flex-1 flex justify-center items-center">
		<div
			class={'border-[1px] border-gray-700 p-4 rounded-xl shadow-xl m-6 relative overflow-hidden bg-extends-white ' +
				bgClassString}
		>
			<div class="relative z-50 text-center sm:text-left">
				<h1 class="text-2xl font-bold my-3"><span class="hidden sm:inline"># </span>Charlie</h1>
				<h2 class="text-lg sm:text-xl font-bold my-3">
					<span class="hidden sm:inline">## </span>Student/Full Stack Dev
				</h2>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>Hi! I'm chazzox, you may also know me as charlie!
				</p>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>I'm a full time Computer Science student @
					<a class="underline font-semibold" href="https://www.royalholloway.ac.uk/">RHUL</a>
					while doing full Stack work on the side
				</p>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>Working part time for<a
						class="underline pl-2 px-1 font-semibold"
						href="https://projectwaitless.com/">Project Waitless</a
					>
					and
					<a class="underline px-1 font-semibold" href="https://www.gosystem.co.uk/">goSystem</a>
				</p>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>Below are some of my projects in varying states of
					completion that i've tinkered with over the years<span class="hidden sm:inline">:</span>
				</p>
				<div class="sm:ml-3">
					<Project
						url="https://github.com/chazzox/discordify/"
						name="discordify"
						description="A Betterdiscord plugin"
					/>
					<Project
						url="https://hydrova.chazzox.uk/"
						name="Hydrova"
						description="High perfomance reddit client"
					/>
					<Project
						url="https://github.com/rhul-compsoc/twitter-stream/"
						name="Twitter Stream"
						description="Twitter feed made for a RHUL SU night"
					/>
					<Project
						url="https://github.com/chazzox/faster-panopto/"
						name="Faster Panopto"
						description="Browser extension for panopto lectures"
					/>
					<Project
						url="https://shortcuts.chazzox.uk/"
						name="Shortcuts"
						description="Your bookmarks on one site"
					/>
					<Project
						url="https://hack.chazzox.uk/"
						name="oxHack"
						description="My submission to oxford hack 22"
					/>
					<Project
						url="https://replay.chazzox.uk/"
						name="Replay"
						description="A discover weekly backup tool"
					/>
					<Project
						url="https://github.com/chazzox/BetterDiscordPlugins/"
						name="BetterDiscordPlugins"
						description="A Monorepo containing all my BDP stuff"
					/>
				</div>
			</div>
		</div>
	</div>
	<Footer blurTechnique={bgClassString} />
</div>
