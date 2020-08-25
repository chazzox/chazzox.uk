import React from 'react';
import Header from './header';

export default class Privacy extends React.PureComponent {
	render() {
		return (
			<div id="main">
				<Header />
				<div className="generalContainer">
					<h1>Privacy Policy for Chazzox inc</h1>
					<p>
						At Shortcuts, accessible from{' '}
						<a
							style={{ color: 'LightBlue', textDecoration: 'underline' }}
							href={'https://chazzox.github.io/shortcuts/'}
						>
							here
						</a>
						, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains
						types of information that is collected and recorded by Shortcuts and how we use it. If you have
						additional questions or require more information about our Privacy Policy, do not hesitate to contact
						us. This Privacy Policy applies only to our online activities and is valid for visitors to our
						website with regards to the information that they shared and/or collect in Shortcuts. This policy is
						not applicable to any information collected offline or via channels other than this website.
					</p>
					<h2>Consent</h2>
					<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
				</div>
				<div className="generalContainer">
					<h1>Information we collect</h1>
					<p>
						The personal information that you are asked to provide, and the reasons why you are asked to provide
						it, will be made clear to you at the point we ask you to provide your personal information.
					</p>
					<p>
						If you contact us directly, we may receive additional information about you such as your name, email
						address, phone number, the contents of the message and/or attachments you may send us, and any other
						information you may choose to provide.
					</p>
					<p>
						All the Data That you use is stored on your computer, we don't have access to any of it, nor can we
						gain access to it
					</p>
				</div>
				<div className="generalContainer">
					<h1>How we use your information</h1>
					<p>The site uses you data to function. without it, you would not be able to use the website</p>
					<p>
						We do not analyze your data, nor sell it anyone else (we can't even see it!!). Also, we don't log any
						of your data
					</p>
				</div>
			</div>
		);
	}
}
