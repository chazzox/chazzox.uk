let len = 10
let nodes = new Array(len)
let battle_len = 4


let sketch = function (p) {
	p.setup = function () {
		c = p.color(107)
		p.createCanvas(p.windowWidth/2, p.windowWidth/2)
		for (let i = 0; i < len; i++) {
			nodes[i] = new Array(len)
			for (let j = 0; j < len; j++) {
				let b = new square( j/len*p.width, i/len*p.height,c)
				nodes[i][j] = b
			}
		}
	}
	
		p.draw = function () {
			p.background(20)
			r = p.width/(len*2)
			for(var i=0;i<nodes.length; i++) {
				for(var j=0;j<nodes.length;j++){
					nodes[i][j].show(c)
					d = p.dist(nodes[i][j].x+r, nodes[i][j].y+r,p.mouseX,p.mouseY)
					if(d<r){
					for(let z=0;z<battle_len-1;z++){
						console.log(nodes[i][j+z].x)						
						p.fill(0)
						p.rect(nodes[i][j+z].x, nodes[i][j].y, p.width/len, p.width/len)
					}}
				}
			}
			p.fill(0)
			p.ellipse(p.mouseX, p.mouseY, p.width/len, p.width/len)
		}
	class square {
		constructor(x, y, c) {
			this.x = x
			this.y = y
			this.c = c
		}

		show() {
			p.fill(this.c)
			p.rect(this.x, this.y, p.width/len, p.width/len)
		}
	}

	p.windowResized = function () {
		p.setup();
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
