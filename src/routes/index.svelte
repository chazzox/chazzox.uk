<script>
	import Footer from '../components/footer.svelte';
	import Project from '../components/project.svelte';
</script>

<svelte:head>
	<title>Chazzox's Website</title>
</svelte:head>

<div class="center">
	<div class="container">
		<div id="projectContainer">
			<Project url="https://chazzox.github.io/shortcuts/" background="#667eff" img="'images/shortcuts.jpg'" />
			<Project url="https://hydrova.netlify.app/" background="#875fb3" img="'images/hydrova.jpg'" />
		</div>
		<div>
			<h1>Charlie</h1>
			<h2>Hobbyist programmer</h2>
			<p>Hi, I'm chazzox, also known as charlie.</p>
			<p>
				I like to make things. I learn languages as I go depending on where a project takes me, check out a couple of
				my projects to see what I'm working on right now.
			</p>
			<p>
				I'm currently a full time student. So my time is shared between these projects and my work at uni, I try and
				spend a good amount of time on the projects though, as they are things that I aim to eventually use (I
				already use Hydrova)
			</p>
			<p>
				My interests lie in web development, software engineering and cyber security. And I usually make projects
				around these interests. If you want to contact me on a project then email me at
				<a href="mailto:31caylo13@gmail.com">31caylo13@gmail.com</a>
			</p>
		</div>
	</div>
</div>
<Footer />

<style type="text/scss">
	:global(#tsparticles) {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -999;
	}

	.container {
		max-width: 900px;
		background-color: #f7eaea;
		box-shadow: 27px 43px 92px -6px rgba(0, 0, 0, 0.75);
		width: calc(100vw - 50px);
		padding: 30px;
		box-sizing: border-box;
		border-radius: 55px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap-reverse;
		> #projectContainer {
			z-index: 1;
			min-height: 600px;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			border-radius: 40px;
		}
		> div {
			flex: 1 1 250px;
			margin: 15px;
		}
	}
</style>
