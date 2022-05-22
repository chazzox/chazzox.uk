module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				githubOne: '#040d21',
				githubTwo: '#3a3da0',
				spotifyOne: '#1db954',
				spotifyTwo: '#181818',
				redditOne: '#ff4c02',
				redditTwo: '#ed0a21',
				twitterOne: '#55acef',
				twitterTwo: '#0a76e7',
				discordOne: '#7289da',
				discordTwo: '#21357d',
				linkedinOne: '#0077B5',
				linkedinTwo: '#00A0DC',
				accent: '#062326'
			},
			backgroundImage: {
				'main-img': 'url("/images/bg.webp")'
			},
			fontFamily: { sans: ['Fira Code', 'monospace'] }
		}
	},
	plugins: []
};
