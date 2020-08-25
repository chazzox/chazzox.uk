import React from 'react'
import { Link } from 'gatsby'

import './styles/header.scss'

export default function Header() {
	return (
		<ul className="headul">
			<li className="headli">
				<Link to="/">
					<img className="logo" src={'../logo.png'} alt="my logo" />
				</Link>
			</li>
			<li className="headli">
				<h1>Charlie's website</h1>
			</li>
		</ul>
	)
}
