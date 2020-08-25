import React from 'react';
import Particles from 'react-particles-js';
import { isMobile } from 'react-device-detect';

import shortcutPreview from '../assets/websiteScreenshots/shortcuts.jpg';

import Header from './header';
import '../styles/main.scss';
import '../styles/global.scss';

export default class Home extends React.PureComponent {
	render() {
		return (
			<div id="homepageBackground">
				<Header />

				<div className="bigBox absCenter">
					<div id="mainContent">
						<h1>hey,</h1>
						<p>i am currently redesigning the site, come back later to see the new style changes</p>
						<p>
							these are some of the of my old projects, i have recently ported them to reactJS so i cant
							guarantee that they're working. i wrote a couple of these when i was first learning to program so
							this isn't exactly a great representation of what i can do now
						</p>
					</div>

					<div id="sidebar">
						<a
							href="https://chazzox.github.io/shortcuts/"
							className="project"
							style={{ backgroundColor: '#667eff' }}
						>
							<div className="pseudoElement" style={{ backgroundImage: `url(${shortcutPreview})` }} />
							<span className="absCenter">Shortcuts</span>
						</a>
						<a
							href="https://chazzox.github.io/organiseMe/"
							className="project"
							style={{ backgroundColor: '#667eff' }}
						>
							<div className="pseudoElement" style={{ backgroundImage: `url(${shortcutPreview})` }} />
							<span className="absCenter">Shortcuts</span>
						</a>
						<a
							href="https://chazzox.github.io/Hydrova/"
							className="project"
							style={{ backgroundColor: '#667eff' }}
						>
							<div className="pseudoElement" style={{ backgroundImage: `url(${shortcutPreview})` }} />
							<span className="absCenter">Shortcuts</span>
						</a>
					</div>
				</div>

				{isMobile ? null : (
					<Particles
						style={{ position: 'fixed', top: 0, zIndex: -99 }}
						params={{
							particles: {
								number: {
									value: 100,
									density: {
										enable: true,
										value_area: 1000
									}
								}
							}
						}}
					/>
				)}
			</div>
		);
	}
}
