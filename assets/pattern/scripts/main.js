let nodes = []
let mode = false;
let coord_path = []
let code = ""

let sketch = function(p){
  p.setup = function (){
      nodes = []
      p.createCanvas(p.windowWidth / 2, p.windowWidth / 2)
      for (let i = 1; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
              let b = new node((j) / 4 * p.width, (i) / 4 * p.height)
              nodes.push(b)
          }}
  }

  p.draw= function(){
      p.background(20)
      p.fill(0);

      for(let i = 0; i<9;i++){
          nodes[i].show()
          let d = p.dist(nodes[i].x, nodes[i].y, p.mouseX, p.mouseY)
          if (coord_path.length<1 && d < 0.1+ (1 / 8 * p.width)) {
              p.line(nodes[i].x, nodes[i].y, p.mouseX, p.mouseY);
          }
          if (parseInt(coord_path.length)>=2){

              for (let j = 0; j < coord_path.length-1;j++){
                  p.line(nodes[coord_path[j]].x, nodes[coord_path[j]].y, nodes[coord_path[j+1]].x, nodes[coord_path[j+1]].y)
              }
          }
        }
        if (parseInt(coord_path.length) >= 1 && parseInt(coord_path.length) < 10) {
            p.line(nodes[coord_path[coord_path.length - 1]].x, nodes[coord_path[coord_path.length - 1]].y,p.mouseX, p.mouseY)}
          if(coord_path.length>=10){
          document.getElementById("lmao").value = code
          }
        }


  p.mousePressed = function(){
    if(coord_path.length<10)
      for (let i = 0; i < 9; i++) {
          let d = p.dist(nodes[i].x, nodes[i].y, p.mouseX, p.mouseY)
          if (d < 0.15*p.width/2) {
              mode = true
              coord_path.push(i)
              code += ""+(1+ i)
          }
      }}

  class node{
      constructor(x,y){
          this.x = x
          this.y = y
      }

      show(){
          p.noStroke()
          p.fill(255)
          p.ellipse(this.x,this.y,20,20)
          p.noFill()
          p.stroke(255)
          p.ellipse(this.x, this.y, 0.15 * p.width, 0.15 * p.width)
      }
  }

  p.windowResized = function() {
      p.setup();
  }
}

var myp5 = new p5(sketch, 'lol');
