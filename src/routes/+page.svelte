<script>
	import Footer from '../components/footer.svelte';
	import Project from '../components/project.svelte';
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

<div class="flex min-h-screen flex-col bg-main-img bg-cover bg-fixed bg-center text-white">
	<div class="flex flex-1 items-center justify-center">
		<div class="relative m-6 overflow-hidden rounded-xl border-[1px] border-gray-700 p-4 shadow-xl backdrop-blur-lg">
			<div class="relative z-50 text-center sm:text-left">
				<h1 class="my-3 text-2xl font-bold"><span class="hidden sm:inline"># </span>Charlie</h1>
				<h2 class="my-3 text-lg font-bold sm:text-xl">
					<span class="hidden sm:inline">## </span>Student/Full Stack Dev
				</h2>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>Hi! I'm charlie, you may also know me as chazzox!
				</p>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>I'm a full time Computer Science student @
					<a class="font-semibold underline" href="https://www.royalholloway.ac.uk/">RHUL</a>
					while doing freelance full Stack work on the side
				</p>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>Some of my previous work includes sites for<a
						class="pl-2 font-semibold underline"
						href="https://projectwaitless.io/">Project Waitless</a
					>, <a class="font-semibold underline" href="https://www.gosystem.co.uk/">goSystem</a> amd
					<a class="font-semibold underline" href="https://ukrepmed.com/">UKRepMed</a>
				</p>
				<p class="my-3">
					<span class="hidden sm:inline">- </span>Below are some of my projects in varying states of completion
					that i've tinkered with over the years<span class="hidden sm:inline">:</span>
				</p>
				<div class="sm:ml-3">
					<Project url='https://project-omikron.chazzox.uk' name='Project-Omikron' description='A game development project im currently working on, written in pure ANSI C!'/>

					<Project
						url="https://hydrova.chazzox.uk/"
						name="Hydrova"
						description="Alternative Reddit client"
					/><Project
						url="https://github.com/chazzox/discordify/"
						name="discordify"
						description="A Better Discord plugin"
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
					<Project url="https://shortcuts.chazzox.uk/" name="Shortcuts" description="Your bookmarks on one site" />
					<Project url="https://hack.chazzox.uk/" name="oxHack" description="My submission to oxford hack 22" />
					<Project url="https://replay.chazzox.uk/" name="Replay" description="A discover weekly backup tool" />
					<Project
						url="https://github.com/chazzox/BetterDiscordPlugins/"
						name="BetterDiscordPlugins"
						description="A Monorepo containing all my BDP stuff"
					/>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</div>
