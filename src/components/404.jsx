import React from 'react';
import Particles from 'react-particles-js';
import { Link } from 'react-router-dom';

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
			</>
		);
	}
}
