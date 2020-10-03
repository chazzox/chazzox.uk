import React from 'react'
import { isMobile } from 'react-device-detect'
import Particles from 'react-particles-js'

import Header from '../components/header'

import '../components/styles/main.scss'

export default function Home() {
	return (
		<>
			<Header />
			<div className="class404 absCenter">
				<p style={{ color: 'black' }}>
					This site does not exist, please navigate back to the home page by using your browsers back button or
					clicking the logo at the top left
				</p>
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
	)
}
