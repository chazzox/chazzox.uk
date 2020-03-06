let len = 10,
	nodes = new Array(len);

let sketch = function(p) {
	p.setup = function() {
		c = p.color(107);
		let width = Math.round(p.displayHeight * (5 / 80)) * 10;
		p.createCanvas(width, width);
		for (let i = 0; i < len; i++) {
			nodes[i] = new Array(len);
			for (let j = 0; j < len; j++) {
				nodes[i][j] = new square((j / len) * p.width, (i / len) * p.height, c);
			}
		}
	};

	p.draw = function() {
		p.background(20);
		searchRadius = p.width / (len * 4);
		for (var i = 0; i < nodes.length; i++) {
			for (var j = 0; j < nodes.length; j++) {
				nodes[i][j].show(c);
				if (
					p.mouseX > nodes[i][j].x &&
					p.mouseX < nodes[i][j].x + p.width / 10 &&
					p.mouseY > nodes[i][j].y &&
					p.mouseY < nodes[i][j].y + p.width / 10
				) {
					p.fill(0);
					p.rect(nodes[i][j].x, nodes[i][j].y, p.width / len, p.width / len);
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
						nodes[i][j].boolPressed = !nodes[i][j].boolPressed;
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

var myp5 = new p5(sketch, 'lol');
