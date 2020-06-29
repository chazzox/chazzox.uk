import React from 'react';
import Sketch from 'react-p5';

import Header from './header';
import '../styles/oldstyles.scss';

export default class Pattern extends React.PureComponent  {
	constructor(props) {
		super(props);
		this.p5Ref = React.createRef();
		this.state = { code: '' };
	}

	nodes = [];
	mode = false;
	coord_path = [];
	code = '';

	setup = (p5, canvasParentRef) => {
		class node {
			constructor(x, y) {
				this.x = x;
				this.y = y;
			}

			show() {
				p5.noStroke();
				p5.fill(255);
				p5.ellipse(this.x, this.y, 20, 20);
				p5.noFill();
				p5.stroke(255);
				p5.ellipse(this.x, this.y, 0.15 * p5.width, 0.15 * p5.width);
			}
		}
		this.nodes = [];
		p5.createCanvas(400, 400).parent(canvasParentRef);
		for (let i = 1; i < 4; i++) {
			for (let j = 1; j < 4; j++) {
				let b = new node((j / 4) * p5.width, (i / 4) * p5.height);
				this.nodes.push(b);
			}
		}
	};

	mousePressed = (p5) => {
		if (this.coord_path.length < 10)
			for (let i = 0; i < 9; i++) {
				let d = p5.dist(this.nodes[i].x, this.nodes[i].y, p5.mouseX, p5.mouseY);
				if (d < (0.15 * p5.width) / 2) {
					this.mode = true;
					this.coord_path.push(i);
					this.code += '' + (1 + i);
				}
			}
	};
	draw = (p5) => {
		p5.background(20);
		p5.fill(0);

		for (let i = 0; i < 9; i++) {
			this.nodes[i].show();
			let d = p5.dist(this.nodes[i].x, this.nodes[i].y, p5.mouseX, p5.mouseY);
			if (this.coord_path.length < 1 && d < 0.1 + (1 / 8) * p5.width) {
				p5.line(this.nodes[i].x, this.nodes[i].y, p5.mouseX, p5.mouseY);
			}
			if (parseInt(this.coord_path.length) >= 2) {
				for (let j = 0; j < this.coord_path.length - 1; j++) {
					p5.line(
						this.nodes[this.coord_path[j]].x,
						this.nodes[this.coord_path[j]].y,
						this.nodes[this.coord_path[j + 1]].x,
						this.nodes[this.coord_path[j + 1]].y
					);
				}
			}
		}
		if (parseInt(this.coord_path.length) >= 1 && parseInt(this.coord_path.length) < 10) {
			p5.line(
				this.nodes[this.coord_path[this.coord_path.length - 1]].x,
				this.nodes[this.coord_path[this.coord_path.length - 1]].y,
				p5.mouseX,
				p5.mouseY
			);
		}
		if (this.coord_path.length >= 10) {
			this.setState({ code: this.code });
		}
	};

	windowResized = (p5) => {
		p5.setup();
	};

	render() {
		return (
			<>
				<Header />
				<div className="generalContainer">
					<h3>Pattern Lock - Proof of Concept</h3>
					<p>
						I did this mainly because I wanted to see I could, its probably not gonna change into anything too
						big as these things aren't very secure.
					</p>
					<h3>The pin</h3>
					<p>This is the pin you entered:</p>
					<input type="text" value={this.code} readOnly />
				</div>
				<div className="generalContainer">
					<h3>The lock</h3>
					<p>Just click on the circles and it should draw the patterns as you go along</p>
					<Sketch
						className="p5Container"
						setup={this.setup}
						draw={this.draw}
						mousePressed={this.mousePressed}
						windowResized={this.windowResized}
					/>
				</div>
			</>
		);
	}
}
