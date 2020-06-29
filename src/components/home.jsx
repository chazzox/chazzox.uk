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
export default class Home extends React.PureComponent {
	render() {
		return (
			<>
				<Header />

				<div className="bigBox">
					<h1>hey,</h1>
					<p>i am currently redesigning the site, come back later to see the new style changes</p>
					<div className="oldProjects">
						<p>
							these are some of the of my old projects, i have recently ported them to reactJS so i cant
							guarantee that they're working. i wrote a couple of these when i was first learning to program so
							this isn't exactly a great representation of what i can do now
						</p>
						<div className="projectContainer">
							<a href="https://chazzox.github.io/shortcuts/" className="project">
								<div className="pseudoElement" style={{ backgroundImage: `url(${shortcutPreview})` }} />
								<div>Shortcuts</div>
							</a>
							<Link to="/cipher" className="project">
								<div className="pseudoElement" style={{ backgroundImage: `url(${cipherPreview})` }} />
								<div>Cipher Translator</div>
							</Link>
							<Link to="/pattern" className="project">
								<div className="pseudoElement" style={{ backgroundImage: `url(${patternPreview})` }} />
								<div>Android pattern lock PoC</div>
							</Link>
							<Link to="/battleships" className="project">
								<div className="pseudoElement" style={{ backgroundImage: `url(${battleshipsPreview})` }} />
								<div>Battleships</div>
							</Link>
						</div>
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
			</>
		);
	}
}
