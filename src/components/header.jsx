import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/nav.scss';
import logo from '../assets/logo.png';

export default class Header extends React.PureComponent  {
	render() {
		return (
			<ul className="headul">
				<li className="headli">
					<Link to="/">
						<img className="logo" src={logo} alt="my logo" width="150" height="150" />
					</Link>
				</li>
				<li className="headli">
					<h1>Charlie's website</h1>
				</li>
			</ul>
		);
	}
}
