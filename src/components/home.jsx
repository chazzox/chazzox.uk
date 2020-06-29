import React from 'react';
import Particles from 'react-particles-js';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import shortcutPreview from '../assets/websiteScreenshots/shortcuts.jpg';
import cipherPreview from '../assets/websiteScreenshots/cipher.jpg';
import battleshipsPreview from '../assets/websiteScreenshots/battleships.jpg';
import patternPreview from '../assets/websiteScreenshots/pattern.jpg';

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
						<Link to="/cipher" className="project" style={{ backgroundColor: '#9f7ed5' }}>
							<div className="pseudoElement" style={{ backgroundImage: `url(${cipherPreview})` }} />
							<span className="absCenter">Cipher Translator</span>
						</Link>
						<Link to="/pattern" className="project" style={{ backgroundColor: '#ac70a6' }}>
							<div className="pseudoElement" style={{ backgroundImage: `url(${patternPreview})` }} />
							<span className="absCenter">Android pattern lock PoC</span>
						</Link>
						<Link to="/battleships" className="project" style={{ backgroundColor: '#ff849d' }}>
							<div className="pseudoElement" style={{ backgroundImage: `url(${battleshipsPreview})` }} />
							<span className="absCenter">Battleships</span>
						</Link>
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
