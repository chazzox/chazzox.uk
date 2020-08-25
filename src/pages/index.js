import React from 'react'
import Particles from 'react-particles-js'
import { isMobile } from 'react-device-detect'

import Header from '../components/header'
import Main from '../components/main'

export default function Home() {
	return (
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
	)
}
