import React from 'react';

import Header from './header';
import * as conversions from '../assets/morse';
import '../styles/cipher.scss';

const hexReg = /^((([0-9]|[a-f]){2},)*([0-9]|[a-f]){2}||([0-9]|[a-f]){2})$/;

export default class Cipher extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			// morse values
			isMorse: true,
			isInputText: true,
			// caesar values
			isCaesar: false,
			caesarShift: 0,
			// vernam values
			isVernam: false,
			isOutputHex: true,
			oneTimePad: '',
			oneTimePadType: 'hex',
			// other
			plaintext: '',
			cipherText: '',
			error: ''
		};
	}

	convertInt(arr, base) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = parseInt(arr[i], base);
		}
	}

	checkBoxChange(mode) {
		switch (mode) {
			case 0:
				this.setState({
					isMorse: true,
					isCaesar: false,
					isVernam: false
				});
				break;
			case 1:
				this.setState({
					isMorse: false,
					isCaesar: true,
					isVernam: false
				});
				break;
			case 2:
				this.setState({
					isMorse: false,
					isCaesar: false,
					isVernam: true
				});
				break;

			default:
				break;
		}
		return;
	}

	mors() {
		let morse = '';
		for (var i = 0; i < this.state.plaintext.length - 1; i++) {
			morse += conversions[this.state.isInputText ? 't_m' : 'm_t'][this.state.plaintext[i]];
		}
		return morse;
	}

	cease() {
		let plaintext = this.state.plaintext.toLowerCase();
		let out = '';
		for (var i = 0; i < plaintext.length; i++) {
			if (plaintext[i] === '\n') {
				out += '\n';
			} else {
				var out_code = ((plaintext.charCodeAt(i) + this.state.caesarShift - 96) % 26) + 96;
				out += String.fromCharCode(out_code);
			}
		}
		return out;
	}

	vern(plaintext) {
		var oneTime = this.state.oneTimePad;
		var outText = '';

		switch (this.state.oneTimePadType) {
			case 'hex':
				if (hexReg.test(oneTime) === false) {
					this.setState({ error: 'does not meet criteria for 2 bit hex then comma' });
					return '';
				}
				oneTime = oneTime.split(',');
				this.convertInt(oneTime, 16);
				break;
			case 'binary':
				if (hexReg.test(oneTime) === false) {
					this.setState({ error: 'does not meet criteria for 8 bit binary then comma' });
					return '';
				}
				oneTime = oneTime.split(',');
				this.convertInt(oneTime, 2);
				break;
		}

		switch (this.state.plaintextType) {
			case 'hex':
				if (hexReg.test(plaintext) === false) {
					this.setState({ error: 'does not meet criteria for 8 bit binary then comma' });
					return '';
				}
				plaintext = oneTime.split(',');
				this.convertInt(plaintext, 16);
				break;
			case 'binary':
				if (hexReg.test(plaintext) === false) {
					this.setState({ error: 'does not meet critia for 8 bit binary then comma' });
					return '';
				}
				plaintext = plaintext.split(',');
				this.convertInt(plaintext, 2);
				break;
		}
		if (plaintext.length <= oneTime.length) {
			this.setState({ error: 'one time pad different length to plain text' });
			return '';
		}
		for (var i = 0; i < plaintext.length; i++) {
			outText += plaintext[i] ^ oneTime[i];
		}
		return outText;
	}

	translate() {
		if (this.state.isMorse) this.mors();
		else if (this.state.isCaesar) this.cease();
		else if (this.state.isVernam) this.vern();
	}

	render() {
		return (
			<>
				<Header />
				<div class="wrapper">
					<div class="aside generalContainer">
						<h3>Why does this is Exist?</h3>
						<p>
							This was a piece of homework I submitted for my computer science A level, I've found use for it
							since as I have tried to complete the cyberstart challenge in the last couple years running, I
							also used it as an oppertunity to write node js as I sent the morse output to an api being hosted
							on a raspberry pi that would display the morse code on a connected LED
						</p>
					</div>

					<div class="aside generalContainer">
						<h3>Mode</h3>
						<p>Choose your method of enciphering</p>
						<p>
							Morse:
							<input onChange={() => this.checkBoxChange(0)} checked={this.state.isMorse} type="checkbox" />
						</p>
						<p>
							Caesar:
							<input onChange={() => this.checkBoxChange(1)} checked={this.state.isCaesar} type="checkbox" />
						</p>
						<p>
							Vernam :
							<input onChange={() => this.checkBoxChange(2)} checked={this.state.isVernam} type="checkbox" />
						</p>
					</div>
				</div>
				<div class="wrapper">
					<div class="aside generalContainer">
						<h3>User input</h3>
						<p>This section is the section that you can write to:</p>
						{this.state.isMorse ? (
							<>
								<p>
									Text -&gt; Morse:
									<input
										class="vern"
										onChange={() => this.setState({ isInputText: !this.state.isInputText })}
										checked={this.state.isInputText}
										type="checkbox"
									/>
								</p>
								<p>
									Morse -&gt; Text:
									<input
										class="vern"
										onChange={() => this.setState({ isInputText: !this.state.isInputText })}
										checked={!this.state.isInputText}
										type="checkbox"
									/>
								</p>
							</>
						) : null}
						{this.state.isCaesar ? (
							<input autocomplete="off" type="number" value={this.state.caesarShift} />
						) : null}
						{this.state.isVernam ? (
							<div id="vernham">
								<p>Formatting of One-time pad</p>
								<p>
									String:
									<input type="checkbox" />
									Hex:
									<input type="checkbox" />
									Byte:
									<input type="checkbox" />
								</p>
								<p>Formatting of the vernam plaintext</p>
								<p>
									String:
									<input type="checkbox" />
									Hex:
									<input type="checkbox" />
									Byte:
									<input type="checkbox" />
								</p>
								<input autocomplete="off" type="text" placeholder="One time pad" />
							</div>
						) : null}
						<textarea id="in" placeholder="Enter your plaintext here" />
						<div>
							<button onClick={() => this.translate()}>Submit</button>
						</div>
					</div>

					<div class="aside generalContainer">
						<h3>Computed output</h3>
						{this.state.isVernam ? (
							<p>
								Hex:
								<input
									onChange={() => this.setState({ isOutputHex: !this.state.isOutputHex })}
									checked={this.state.isOutputHex}
									type="checkbox"
								/>
								Byte:
								<input
									onChange={() => this.setState({ isOutputHex: !this.state.isOutputHex })}
									checked={!this.state.isOutputHex}
									type="checkbox"
								/>
							</p>
						) : null}
						<textarea
							style={{ height: '30vh' }}
							readonly
							placeholder="cipher text will appear once plaintext is submitted"
							value={this.state.cipherText}
						/>
					</div>
				</div>
			</>
		);
	}
}
