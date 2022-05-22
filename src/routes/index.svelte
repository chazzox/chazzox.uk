<script>
	import Footer from '../components/footer.svelte';
	import Project from '../components/project.svelte';
</script>

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>
<div class="flex flex-col min-h-screen bg-cover bg-main-bg bg-center">
	<div class="flex-1 flex text-white justify-center items-center">
		<div class="backdrop-blur-sm border-[1px] border-gray-700 p-4 rounded-xl shadow-xl m-6 overflow-hidden">
			<div
				class="fixed -top-[10%] -left-[10%] h-[120%] w-[120%] -z-20 bg-center bg-main-bg bg-fixed bg-cover blur-md"
			/>
			<div>
				<h1 class="text-2xl font-bold my-3"><span class="hidden sm:inline"># </span>Charlie</h1>
				<h2 class="text-lg sm:text-xl font-bold my-3">
					<span class="hidden sm:inline">## </span>Student/Full Stack Dev
				</h2>
				<p class="my-3"><span class="hidden sm:inline">- </span>Hi! I'm chazzox, you may also know me as charlie!</p>
				<p>
					<span class="hidden sm:inline">- </span>I'm a full time Computer Science student
					<a class="underline font-semibold" href="https://www.royalholloway.ac.uk/">@RHUL</a>
					while doing full Stack work on the side
				</p>
				<p class="py-1.5">
					<span class="hidden sm:inline">- </span>Working part time for<a
						class="underline pl-2 px-1 font-semibold"
						href="https://projectwaitless.com/">Project Waitless</a
					>
					and
					<a class="underline px-1 font-semibold" href="https://www.gosystem.co.uk/">goSystem</a>
				</p>
				<p class="py-1.5">
					<span class="hidden sm:inline">- </span>Below are some of my projects i've tinkered with over the years:
				</p>
			</div>
			<div class="sm:ml-7">
				<Project
					url="https://github.com/chazzox/discordify/"
					name="discordify"
					description="A Betterdiscord plugin"
				/>
				<Project url="https://hydrova.chazzox.uk/" name="Hydrova" description="High perfomance reddit client" />
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
				<Project url="https://chazzox.uk/shortcuts/" name="Shortcuts" description="Your bookmarks on one site!" />
				<Project url="https://chazzox.uk/RePLAY/" name="Replay" description="A discover weekly backup tool" />
				<Project
					url="https://github.com/chazzox/BetterDiscordPlugins/"
					name="BetterDiscordPlugins"
					description="A monorepo containing all my BDP stuff"
				/>
			</div>
		</div>
	</div>
	<Footer />
</div>
