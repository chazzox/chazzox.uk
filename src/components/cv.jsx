import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import arrow from '../assets/cv/arrow.png';
import hamburger from '../assets/cv/hamburger.png';

import python from '../assets/cv/python.png';
import c from '../assets/cv/c.png';
import javascript from '../assets/cv/javascript.png';

import '../styles/cv.scss';

export default class CV extends React.PureComponent  {
	constructor(props) {
		super(props);

		this.state = {
			educationShow: false,
			primaryShow: true,
			infantShow: false,
			gcseShow: false,
			hamburgerOpen: false
		};
	}

	hamburger() {
		if (this.state.hamburgerOpen) {
			this.setState({ hamburgerOpen: false });
		} else {
			this.setState({ hamburgerOpen: true });
		}
	}
	componentDidMount() {
		document.getElementById('educationInfoArrow').style.marginLeft = 'calc(50% - 20px)';
		document.getElementById('gmapCanvas').src =
			'https://maps.google.com/maps?q=potters%20gate%20primary&t=&z=17&ie=UTF8&iwloc=&output=embed';
	}

	displayPrimary() {
		this.setState(this.setState({ educationShow: false, primaryShow: true, infantShow: false, gcseShow: false }));
		document.getElementById('gmapCanvas').src =
			'https://maps.google.com/maps?q=potters%20gate%20primary&t=&z=17&ie=UTF8&iwloc=&output=embed';
	}

	displayInfant() {
		this.setState(this.setState({ educationShow: false, primaryShow: false, infantShow: true, gcseShow: false }));
		document.getElementById('gmapCanvas').src =
			'https://maps.google.com/maps?q=Vinehall%20Preparatory&t=&z=17&ie=UTF8&iwloc=&output=embed';
	}

	displayGCSE() {
		this.setState(this.setState({ educationShow: false, primaryShow: false, infantShow: false, gcseShow: true }));
		document.getElementById('gmapCanvas').src =
			'https://maps.google.com/maps?q=weydon%20school&t=&z=17&ie=UTF8&iwloc=&output=embed';
	}

	render() {
		return (
			<div id="cvContainer">
				<img
					alt=""
					id="hamburger"
					style={this.state.hamburgerOpen ? { position: 'absolute' } : { position: 'fixed' }}
					src={!this.state.hamburgerOpen ? arrow : hamburger}
					onClick={() => this.hamburger()}
				/>

				<Sidebar style={this.state.hamburgerOpen ? { left: 'calc(-85% - 11px)' } : { left: '0' }} />

				<div className="header" id="header">
					<h1>Charlie Aylott</h1>
					<h2>Programmer</h2>
				</div>

				<div className="mainContent">
					<div className="subtitle">About</div>

					<p>
						Hello, my name is Charlie. I'm an aspiring programmer based in Surrey who is always open to join a
						project for experience. You can get in touch with me using the contact details located on the
						sidebar.
					</p>

					<div className="subtitle">Education</div>

					<table className="cleanTable">
						<tbody>
							<tr>
								<td onClick={() => this.displayInfant()} className="hoverCell" title="Click for More Info">
									<h4>Vinehall Preparatory</h4>
									Robertsbridge, East Sussex
									<br />
									Reception to Year 2
								</td>
								<td onClick={() => this.displayPrimary()} className="hoverCell" title="Click for More Info">
									<h4>Potters Gate CofE</h4>
									Potters Gate, Farnham
									<br />
									Year 3 to Year 6
								</td>
								<td onClick={() => this.displayGCSE()} className="hoverCell" title="Click for More Info">
									<h4>Weydon Academy</h4>
									Weydon Ln, Farnham
									<br />
									Year 7 to 11
								</td>
							</tr>
						</tbody>
					</table>

					<div id="educationInfoArrow" />

					<div className="educationInfoContainer">
						<div
							className="educationInfoContent"
							id="infant"
							style={this.state.infantShow ? { display: 'inline-block' } : { display: 'none' }}
						>
							<p style={{ width: '50%', marginTop: '45px' }}>
								Vinehall Preparatory Primary School
								<br />
								Reception to Year 2
							</p>

							<a href="https://www.vinehallschool.com/">
								<div className="bigBox">
									<div className="packageIconHolder">
										<img alt="" src="/assets/cv/pictures/vinehall.png" className="packageicon" />
									</div>
									<div className="packageContentHolder">
										<span className="packageTitle">Vinehall Proparatory</span>
										<br />
										<span className="packageDescription">vinehallschool.com</span>
										<br />
										<span className="packageGreyDescription">Visit Website</span>
									</div>
								</div>
							</a>
						</div>

						<div
							className="educationInfoContent"
							id="primary"
							style={this.state.primaryShow ? { display: 'inline-block' } : { display: 'none' }}
						>
							<p style={{ width: '50%', marginTop: '45px' }}>
								Potters Gate Church of England School
								<br />
								Year 3 to Year 6
							</p>

							<a href="https://www.potters-gate.surrey.sch.uk/">
								<div className="bigBox">
									<div className="packageIconHolder">
										<img alt="" src="/assets/cv/pictures/pottersgate.png" className="packageicon" />
									</div>
									<div className="packageContentHolder">
										<span className="packageTitle">Potters Gate</span>
										<br />
										<span className="packageDescription">potters-gate.surrey.sch.uk</span>
										<br />
										<span className="packageGreyDescription">Visit Website</span>
									</div>
								</div>
							</a>
						</div>

						<div
							className="educationInfoContent"
							id="gcse"
							style={this.state.gcseShow ? { display: 'inline-block' } : { display: 'none' }}
						>
							<Grades />
						</div>

						<div className="mapPreview">
							<div className="gmapCanvas">
								<iframe title="maps" id="gmapCanvas" src="" frameBorder="0"></iframe>
							</div>
						</div>
					</div>

					<div className="subtitle">Experience</div>
					<table className="cleanTable">
						<tbody>
							<tr>
								<td>
									<h4>Sound & Lighting Technician</h4>
									Student Position
									<br />
									Weydon Medici Theatre
								</td>
								<td>
									<h4>Stage Lighting Department</h4>
									Work Experience
									<br />
									Festival Theatre, Chichester
								</td>
							</tr>
						</tbody>
					</table>

					<div className="subtitle">Skillset</div>

					<p>
						I have a Gold Scout award 2016 from the 3rd Farnham Scout Group. In 2017, I competed in the Floorball
						- National champions for under 18s. I regularly play field hockey at Aldershot &amp; Farnham Hockey
						Club for the Mens 3’s and Under 18 teams. National Citizenship Service Graduate Summer 2018. I've
						been writing websites for the last couple years using reactJS and have experience using nodeJS,
						python and c#
					</p>
				</div>
			</div>
		);
	}
}

class Sidebar extends React.PureComponent  {
	render() {
		return (
			<div id="sidebar">
				<Link to="/">
					<img alt="" src={logo} title="Return to Homepage" className="logo" />
				</Link>

				<div className="sidebarSection">
					<div className="sidebarTitle">Contact</div>

					<p className="sidebarContent">
						07514728808
						<br />
						caylott@outlook.com
					</p>
				</div>

				<div className="sidebarSection">
					<div className="sidebarTitle">Personal Skills</div>
					<p className="sidebarContent">
						• Work Well Under Pressure
						<br />• Leadership Skills <br />• Good Communication <br />• Hardworking
					</p>
				</div>

				<div className="sidebarSection">
					<div className="sidebarTitle">Technical Skills</div>

					<p className="sidebarContent">
						<img alt="" src={python} className="skillPhoto" float="left;" />
						Python
					</p>

					<p className="sidebarContent">
						<img alt="" src={c} className="skillPhoto" />
						C#
					</p>

					<p className="sidebarContent">
						<img alt="" src={javascript} className="skillPhoto" />
						Javascript
					</p>
				</div>
			</div>
		);
	}
}

class Grades extends React.PureComponent  {
	render() {
		return (
			<table className="educationGrades" id="gcse">
				<tbody>
					<tr>
						<th>GCSE Subject</th>
						<th>Grade</th>
					</tr>
					<tr>
						<th>Combined Science</th>
						<th>7</th>
					</tr>
					<tr>
						<th>Computer Science</th>
						<th>7</th>
					</tr>
					<tr>
						<th>Mathmatics</th>
						<th>7</th>
					</tr>
					<tr>
						<th>English Language</th>
						<th>5</th>
					</tr>
					<tr>
						<th>English Literature</th>
						<th>5</th>
					</tr>
					<tr>
						<th>Combined Science</th>
						<th>6</th>
					</tr>
					<tr>
						<th>Product Design</th>
						<th>B</th>
					</tr>
					<tr>
						<th>Drama</th>
						<th>4</th>
					</tr>
					<tr>
						<th>Music</th>
						<th>4</th>
					</tr>
				</tbody>
			</table>
		);
	}
}
