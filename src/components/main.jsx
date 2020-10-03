import React from 'react'

import './styles/main.scss'

export default function Home() {
	return (
		<div className="bigBox absCenter">
			<div id="mainContent">
				<h1>Charlie</h1>
				<h2>Hobbyist programmer</h2>
				<p>Hi, i'm chazzox, also known as charlie.</p>
				<p>
					I like to make things, I learn languages as I go depending on where a project takes me, check out a
					couple of my projects to see what I'm working on right now.
				</p>
			</div>

			<div id="sidebar">
				<a href="https://chazzox.github.io/shortcuts/" className="project" style={{ backgroundColor: '#667eff' }}>
					<div className="pseudoElement" style={{ backgroundImage: `url('../shortcuts.jpg')` }} />
					<span className="absCenter">Shortcuts</span>
				</a>
				<a href="https://chazzox.github.io/organiseMe/" className="project" style={{ backgroundColor: '#776FD9' }}>
					<div className="pseudoElement" style={{ backgroundImage: `url('../organiseMe.jpg')` }} />
					<span className="absCenter" style={{ color: 'black' }}>
						organiseMe
					</span>
				</a>
				<a href="https://chazzox.github.io/Hydrova/" className="project" style={{ backgroundColor: '#875fb3' }}>
					<div
						className="pseudoElement"
						style={{
							backgroundImage: `url('../hydrova.jpg')`,
							transform: 'translate(-10%, -60px) rotate(30deg)'
						}}
					/>
				</a>
			</div>
		</div>
	)
}
