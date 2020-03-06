let len = 10,
	nodes = new Array(len),
	battle_len = document.getElementById('');
positions = new Array();

let sketch = function(p) {
	p.setup = function() {
		positions.push([1, 1]);
		p.background(20);
		c = p.color(107);
		let width = Math.round(p.displayHeight * (5 / 80)) * 10;
		p.createCanvas(width, width);
		for (let i = 0; i < len; i++) {
			nodes[i] = new Array(len);
			for (let j = 0; j < len; j++) {
				nodes[i][j] = new square((j / len) * p.width, (i / len) * p.height, c);
				nodes[i][j].show(c);
			}
		}
	};

	p.draw = function() {
		for (var i = 0; i < nodes.length; i++) {
			for (var j = 0; j < nodes.length; j++) {
				// nodes[i][j].show(c);
				if (
					p.mouseX > nodes[i][j].x &&
					p.mouseX < nodes[i][j].x + p.width / 10 &&
					p.mouseY > nodes[i][j].y &&
					p.mouseY < nodes[i][j].y + p.width / 10
				) {
					if (positions[positions.length - 1].x == nodes[i][j].x) {
						positions.push([nodes[i][j].x, nodes[i][j].y]);
					} else {
						clear();
					}
					p.fill(0);
					p.rect(
						nodes[i][j].x,
						nodes[i][j].y,
						(p.width / len) * battle_len,
						p.width / len
					);
				}
			}
		}

		p.mouseClicked = function() {
			for (var i = 0; i < nodes.length; i++) {
				for (var j = 0; j < nodes.length; j++) {
					nodes[i][j].show(c);
					if (
						p.mouseX > nodes[i][j].x &&
						p.mouseX < nodes[i][j].x + p.width / 10 &&
						p.mouseY > nodes[i][j].y &&
						p.mouseY < nodes[i][j].y + p.width / 10
					) {
						for (var shipLen = 0; shipLen < battle_len; shipLen++) {
							nodes[i][j + shipLen].boolPressed = !nodes[i][j + shipLen].boolPressed;
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
			p.fill(this.boolPressed ? 0 : 107);
			p.rect(this.x, this.y, p.width / len, p.width / len);
		}
	}

	p.windowResized = function() {
		p.setup();
	};
};
function clear() {
	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < nodes.length; j++) {
			nodes[i][j].show(c);
		}
	}
}
function un_check(x) {
	for (var i = 0; i < x.parentNode.children.length; i++) {
		if (i % 2 == 0) {
			x.parentNode.children[i].checked = false;
		}
	}
	x.checked = true;
}

var myp5 = new p5(sketch, 'lol');
