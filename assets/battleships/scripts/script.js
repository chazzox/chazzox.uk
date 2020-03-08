let len = 11;
let players = [new Array(len), new Array(len)];
let playerIndex = 0;
let battle_len = 2;
let positions = new Array();
let mode = false;
let sketch = function(p) {
	// only ran when page loads
	p.setup = function() {
		positions.push([1, 1]);
		p.background(20);
		c = p.color(107);
		let width =
			p.windowWidth < p.windowHeight
				? Math.round(p.windowWidth * (5 / 80)) * 10
				: Math.round(p.windowHeight * (5 / 80)) * 10;
		p.createCanvas(width, width);
		for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
			for (let y = 0; y < len; y++) {
				players[playerIndex][y] = new Array(len);
				for (let x = 0; x < len; x++) {
					players[playerIndex][y][x] = new square(
						(x / len) * p.width,
						(y / len) * p.height,
						c
					);
					players[playerIndex][y][x].show(c);
				}
			}
		}
	};

	// ran many times a second
	p.draw = function() {
		for (var y = 0; y < players[playerIndex].length; y++) {
			for (var x = 0; x < players[playerIndex].length; x++) {
				// looping through every equare

				//checking if mouse hovering over a given square
				if (
					p.mouseX > players[playerIndex][y][x].x &&
					p.mouseX < players[playerIndex][y][x].x + p.width / 10 &&
					p.mouseY > players[playerIndex][y][x].y &&
					p.mouseY < players[playerIndex][y][x].y + p.width / 10
				) {
					// if the square is different to the last, push new cords to positions array
					// otherwise clean grid off
					if (positions[positions.length - 1].x == players[playerIndex][y][x].x) {
						positions.push([
							players[playerIndex][y][x].x,
							players[playerIndex][y][x].y
						]);
					} else {
						clear();
					}
					// drawing rectange where mosue is
					p.fill(0);
					p.rect(
						players[playerIndex][y][x + (x == len - 1 && mode ? -1 : 0)].x,
						players[playerIndex][y + (y == len - 1 && !mode ? -1 : 0)][x].y,
						// if the mode is horizontal, then times the width by the length of the battleship
						(p.width / len) * (mode ? battle_len : 1),
						// same but 4 vertical
						(p.width / len) * (mode ? 1 : battle_len)
					);
				}
			}
		}

		// adding a new sqare to board
		p.mouseClicked = function() {
			for (var y = 0; y < players[playerIndex].length; y++) {
				for (var x = 0; x < players[playerIndex].length; x++) {
					players[playerIndex][y][x].show(c);
					if (
						p.mouseX > players[playerIndex][y][x].x &&
						p.mouseX < players[playerIndex][y][x].x + p.width / 10 &&
						p.mouseY > players[playerIndex][y][x].y &&
						p.mouseY < players[playerIndex][y][x].y + p.width / 10
					) {
						for (var shipLen = 0; shipLen < battle_len; shipLen++) {
							// not entierly sure
							let selectorNode =
								players[playerIndex][
									y + (mode ? 0 : shipLen) + (y == len - 1 && !mode ? -1 : 0)
								][x + (mode ? shipLen : 0) + (x == len - 1 && mode ? -1 : 0)];
							selectorNode.boolPressed = !selectorNode.boolPressed;
						}
					}
				}
			}
		};
	};

	class square {
		constructor(x, y, c) {
			this.x = x;
			this.y = y;
			this.c = c;
			this.boolPressed = false;
		}
		show() {
			p.fill(this.boolPressed ? 0 : c);
			p.rect(this.x, this.y, p.width / len, p.width / len);
		}
	}

	p.windowResized = function() {
		p.setup();
	};
};
function clear() {
	for (var y = 0; y < players[playerIndex].length; y++) {
		for (var x = 0; x < players[playerIndex].length; x++) {
			players[playerIndex][y][x].show(c);
		}
	}
}
function un_check(x) {
	for (var y = 0; y < x.parentNode.children.length; y++) {
		if (x.id.slice(6, -1) == '0') {
			mode = x.id[x.id.length - 1] == 1;
		} else if (x.id.slice(6, -1) == '1') {
			battle_len = x.id[x.id.length - 1];
		} else if (x.id.slice(6, -1) == '2') {
			playerIndex = x.id[x.id.length - 1];
		}
		if (y % 2 == 0) {
			x.parentNode.children[y].checked = false;
		}
	}
	x.checked = true;
}

var myp5 = new p5(sketch, 'lol');