let len = 10;
let nodes = new Array(len);
let battle_len = 2;
let positions = new Array();
let mode = false;
let sketch = function(p) {
	// only ran when page loads
	p.setup = function() {
		positions.push([1, 1]);
		p.background(20);
		c = p.color(107);
		let width = Math.round(p.displayHeight * (5 / 80)) * 10;
		p.createCanvas(width, width);
		for (let y = 0; y < len; y++) {
			nodes[y] = new Array(len);
			for (let x = 0; x < len; x++) {
				nodes[y][x] = new square((x / len) * p.width, (y / len) * p.height, c);
				nodes[y][x].show(c);
			}
		}
	};

	// ran many times a second
	p.draw = function() {
		for (var y = 0; y < nodes.length; y++) {
			for (var x = 0; x < nodes.length; x++) {
				// looping through every equare

				//checking if mouse hovering over a given square
				if (
					p.mouseX > nodes[y][x].x &&
					p.mouseX < nodes[y][x].x + p.width / 10 &&
					p.mouseY > nodes[y][x].y &&
					p.mouseY < nodes[y][x].y + p.width / 10
				) {
					// if the square is different to the last, push new cords to positions array
					// otherwise clean grid off
					if (positions[positions.length - 1].x == nodes[y][x].x) {
						positions.push([nodes[y][x].x, nodes[y][x].y]);
					} else {
						clear();
					}
					// drawing rectange where mosue is
					p.fill(0);
					p.rect(
						nodes[y][x + (x == 9 && mode ? -1 : 0)].x,
						nodes[y + (y == 9 && !mode ? -1 : 0)][x].y,
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
			for (var y = 0; y < nodes.length; y++) {
				for (var x = 0; x < nodes.length; x++) {
					nodes[y][x].show(c);
					if (
						p.mouseX > nodes[y][x].x &&
						p.mouseX < nodes[y][x].x + p.width / 10 &&
						p.mouseY > nodes[y][x].y &&
						p.mouseY < nodes[y][x].y + p.width / 10
					) {
						for (var shipLen = 0; shipLen < battle_len; shipLen++) {
							// not entierly sure
							let selectorNode =
								nodes[y + (mode ? 0 : shipLen) + (y == 9 && !mode ? -1 : 0)][
									x + (mode ? shipLen : 0) + (x == 9 && mode ? -1 : 0)
								];
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
	for (var y = 0; y < nodes.length; y++) {
		for (var x = 0; x < nodes.length; x++) {
			nodes[y][x].show(c);
		}
	}
}
function un_check(x) {
	for (var y = 0; y < x.parentNode.children.length; y++) {
		if (x.id.slice(6, -1) == '0') {
			mode = x.id[x.id.length - 1] == 1;
		} else if (x.id.slice(6, -1) == '1') {
			battle_len = x.id[x.id.length - 1];
		}
		if (y % 2 == 0) {
			x.parentNode.children[y].checked = false;
		}
	}
	x.checked = true;
}

var myp5 = new p5(sketch, 'lol');
