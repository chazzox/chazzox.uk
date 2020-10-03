import React from 'react'
import Particles from 'react-particles-js'
import { isMobile } from 'react-device-detect'

import Header from '../components/header'
import Main from '../components/main'

export default function Home() {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Chazzox's personal website</title>
				<meta name="description" http-equiv="description" content="Personal Repo Site of Charlie Aylott/Chazzox" />
			</Helmet>
			<div id="homepageBackground">
				<Header />
				<Main />
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
		</>
	)
}
