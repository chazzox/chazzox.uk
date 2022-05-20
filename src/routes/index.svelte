<script>
	import Footer from '../components/footer.svelte';
	import Project from '../components/project.svelte';
</script>

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>
<div class="flex flex-col min-h-screen dark:bg-slate-600 dark:text-white">
	<div class="flex-1">
		<div>
			<h1>Charlie</h1>
			<h2>Hobbyist programmer</h2>
			<p>Hi! I'm chazzox, you may also know me as charlie!</p>
			<p>
				I'm currently a full time student but I like to work on pojects from time to time. Feel free to checkout some
				of my previous projects below : )
			</p>
		</div>
		<div id="projectContainer">
			<Project
				url="https://github.com/chazzox/discordify/"
				name="discordify - A Betterdiscord plugin"
				img="https://betterdiscord.app/resources/branding/logo_small.svg"
				iconOnly
				iconGradientFrom="#14151b"
				iconGradientTo="#0c0d10"
			/>
			<Project
				url="https://hydrova.chazzox.uk/"
				background="#875fb3"
				img="images/hydrova.jpg"
				name="Hydrova - High perfomance reddit client"
			/>
			<Project
				url="https://github.com/rhul-compsoc/twitter-stream/"
				background="#1da1f2"
				img="images/twitter.png"
				name="Twitter feed made for a RHUL SU night"
			/>
			<Project
				url="https://github.com/chazzox/faster-panopto/"
				name="Browser extension for panopto lectures"
				iconOnly
			/>
			<Project
				url="https://chazzox.uk/shortcuts/"
				background="#667eff"
				img="images/shortcuts.jpg"
				name="Shortcuts - Your bookmarks on one site!"
			/>
			<Project
				url="https://chazzox.uk/RePLAY/"
				background="#1db954"
				img="images/replay.jpg"
				name="Replay - A discover weekly backup tool"
			/>
			<Project
				url="https://github.com/chazzox/BetterDiscordPlugins/"
				name="A collection of my other smaller bd plugins"
				img="https://betterdiscord.app/resources/branding/logo_small.svg"
				iconOnly
				iconGradientFrom="#14151b"
				iconGradientTo="#0c0d10"
			/>
		</div>
	</div>

	<Footer />
</div>
