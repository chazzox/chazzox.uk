import React from 'react';
import Particles from 'react-particles-js';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Header from './header';
import '../styles/main.scss';

export default class NoPageFound extends React.PureComponent {
	render() {
		return (
			<>
				<Header />
				<div className="bigBox">
					<h1>this site does not exist!!</h1>
					<p>click the button below to be redirected to the homepage</p>
					<Link to="/">go back</Link>
				</div>
				{isMobile ? null : (
					<Particles
						style={{ position: 'fixed', top: 0, zIndex: -1 }}
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
