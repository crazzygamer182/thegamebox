var socket;

function setup() {
  createCanvas(500, 500);
  background(220);
  //socket = io('http://localhost:3000');
  socket = io('https://api.thegamebox.ca/');
  socket.on('mouse', newDrawing);
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);
  noStroke();
  fill(0, 0, 255);
  circle(mouseX, mouseY, 50);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 0);
  circle(data.x, data.y, 50);
}