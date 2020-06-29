import React from 'react';
import Sketch from 'react-p5';
import { isMobile } from 'react-device-detect';

import Header from './header';

export default class Battleships extends React.PureComponent {
	len = 10;
	players = [new Array(this.len), new Array(this.len)];
	playerIndex = 0;
	battle_len = 2;
	positions = new Array();
	mode = true;

	setup = (p5, canvasParentRef) => {
		class square {
			constructor(x, y, c) {
				this.x = x;
				this.y = y;
				this.c = c;
				this.boolPressed = false;
			}
			show() {
				p5.fill(this.boolPressed ? 0 : c);
				p5.rect(this.x, this.y, p5.width / this.len, p5.width / this.len);
			}
		}
		this.positions.push([1, 1]);
		p5.background(20);
		let c = p5.color(107);
		let width =
			p5.windowWidth < p5.windowHeight
				? Math.round(p5.windowWidth * (5 / 800)) * 100
				: Math.round(p5.windowHeight * (5 / 800)) * 100;
		p5.createCanvas(width, width).parent(canvasParentRef);
		for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
			for (let y = 0; y < this.len; y++) {
				this.players[playerIndex][y] = new Array(this.len);
				for (let x = 0; x < this.len; x++) {
					this.players[playerIndex][y][x] = new square((x / this.len) * p5.width, (y / this.len) * p5.height, c);
					this.players[playerIndex][y][x].show(c);
				}
			}
		}
	};

	draw = (p5) => {
		for (var y = 0; y < this.players[this.playerIndex].length; y++) {
			for (var x = 0; x < this.players[this.playerIndex].length; x++) {
				// looping through every square

				//checking if mouse hovering over a given square
				if (
					p5.mouseX > this.players[this.playerIndex][y][x].x &&
					p5.mouseX < this.players[this.playerIndex][y][x].x + p5.width / 10 &&
					p5.mouseY > this.players[this.playerIndex][y][x].y &&
					p5.mouseY < this.players[this.playerIndex][y][x].y + p5.width / 10
				) {
					// if the square is different to the last, push new cords to positions array
					// otherwise clean grid off
					this.clear(p5);
					// drawing rectange where mosue is
					p5.fill(this.routePath(x, y) ? p5.color(255, 255, 0) : 0);
					// mouse hover with boundary detection built in
					p5.rect(
						this.players[this.playerIndex][y][
							x > this.len - this.battle_len - 1 && this.mode ? this.len - this.battle_len : x
						].x,
						this.players[this.playerIndex][
							y > this.len - this.battle_len - 1 && !this.mode ? this.len - this.battle_len : y
						][x].y,
						// if the this.mode is horizontal, then times the width by the length of the battleship
						(p5.width / this.len) * (this.mode ? this.battle_len : 1),
						// same but 4 vertical
						(p5.width / this.len) * (this.mode ? 1 : this.battle_len)
					);
				}
			}
		}
	};

	clear(p5) {
		for (var y = 0; y < this.players[this.playerIndex].length; y++) {
			for (var x = 0; x < this.players[this.playerIndex].length; x++) {
				this.players[this.playerIndex][y][x].show(p5.color(107));
			}
		}
	}

	routePath(xCoord, yCoord) {
		var pressCounter = 0;
		for (var nodeIterator = 0; nodeIterator < this.battle_len; nodeIterator++) {
			if (
				this.players[this.playerIndex][
					yCoord +
						(!(yCoord > this.len - this.battle_len) && !this.mode ? nodeIterator : 0) +
						(yCoord > this.len - this.battle_len && !this.mode
							? -yCoord + this.len - this.battle_len + nodeIterator
							: 0)
				][
					xCoord +
						(!(xCoord > this.len - this.battle_len) && this.mode ? nodeIterator : 0) +
						(xCoord > this.len - this.battle_len && this.mode
							? -xCoord + this.len - this.battle_len + nodeIterator
							: 0)
				].boolPressed
			) {
				pressCounter++;
			}
		}
		if (pressCounter === 0 || pressCounter === this.battle_len) {
			// return false if there are no colored sqaures on the path
			return false;
		} else {
			return true;
		}
	}

	render() {
		return (
			<>
				<Header />
				<div class="generalContainer">
					<h1>Battle ships</h1>
					{isMobile ? (
						<p>sorry, this site is not compatible with mobile devices</p>
					) : (
						<>
							<p>
								Game logic isn't done, but the underlying mechanics are there. I wanna get this done. But
								really don't have a clue how battleships actually works. This was another piece of A level
								computer science homework
							</p>
							<p className="warning">
								This currently does not work as a converted it very quickly to ReactJS to get this site out I
								will release an update in the future that patches it
							</p>
							<Sketch
								className="p5Container"
								setup={this.setup}
								draw={this.draw}
								mousePressed={this.mousePressed}
								windowResized={this.windowResized}
							/>

							<li>
								<form id="this.mode">
									<input onclick="un_check(this)" checked type="checkbox" id="config00" />
									this.mode: Vertical
									<br />
									<input onclick="un_check(this)" type="checkbox" id="config01" />
									this.mode: Horizontal
									<br />
								</form>
							</li>
							<li>
								<form id="lengths">
									<input onclick="un_check(this)" len="2" checked type="checkbox" id="config12" />
									Length: 2<br />
									<input onclick="un_check(this)" type="checkbox" id="config13" />
									Length: 3<br />
									<input onclick="un_check(this)" type="checkbox" id="config14" />
									Length 4:
									<br />
								</form>
							</li>
							<li>
								<form id="Player_form">
									<input onclick="un_check(this)" checked type="checkbox" id="config20" />
									Player: 1<br />
									<input onclick="un_check(this)" type="checkbox" id="config21" />
									Player: 2<br />
								</form>
							</li>
						</>
					)}
				</div>
			</>
		);
	}
}
