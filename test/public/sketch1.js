let x = 0;
let y = 0;
let pellets = [];
let s = 1;
let socket;
let players = {};

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  //fontt = loadFont("Comfortaa-Regular.ttf");
  back = loadImage("back.png");
}

function setup() {
  angleMode(DEGREES);
  //textFont(fontt);
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  pos = createVector(x, y);
  vel = createVector(0, 0);
  for (let i = 0; i < 2500; i++) {
    pellets.push(new Pellet());
  }
  //socket = io('http://localhost:3000');
  socket = io('https://api.thegamebox.ca');
  socket.on('mouse', newPlayer);
  textAlign(CENTER);
}

function draw() {
  //background(220);
  scale(wh / 500);
  imageMode(CENTER);
  image(
    back,
    250 - (x % (37.44 / s)),
    150 - (y % (37.44 / s)),
    back.width / s,
    back.height / s
  );
  strokeWeight(3);
  showArray(pellets);
  stroke(0);
  fill(255);
  circle(250, 150, 50);
  let newvel = createVector(mouseX - width / 2, mouseY - height / 2);
  newvel.setMag(2.5 / s);
  vel.lerp(newvel, 0.2);
  pos.add(vel);
  x = pos.x;
  y = pos.y;
  var data = {
    x: x,
    y: y
  }
  
  b = Object.keys(players);
  text(b.length, 250, 100)
  noStroke();
  fill(50);
  rect(425, 225, 75, 75);
  for (let i = 0; i < b.length; i++) {
    strokeWeight(3);
    stroke(0);
    fill(255);
    circle(players[b[i]].x - x + 500, players[b[i]].y - y + 300, 50);
    fill(255, 0, 0);
    noStroke();
    circle(((players[b[i]].x + 250)*0.075) + 425, ((players[b[i]].y + 150)*0.075) + 225, 50*0.075);
  }
  fill(0, 0, 255);
  circle(x*0.075 + 425, y*0.075 + 225, 50*0.075);
  socket.emit('mouse', data);
}

class Pellet {
  constructor() {
    //this.x = random(500) + x - 250;
    //this.y = random(300) + y - 150;
    this.x = random(10000) - 5000;
    this.y = random(6000) - 3000;
    this.color1 = random(50, 255);
    this.color2 = random(50, 255);
    this.color3 = random(50, 255);
    this.size = random(15, 25);
    this.inc = 0.1;
    this.noiseMax = 0.00001;
    this.phase = 0;
    this.zoff = 0;
  }
  show() {
    if (this.x - x > -300 && this.x - x < 300 && this.y - y > -200 && this.y - y < 200) {
      fill(this.color1, this.color2, this.color3);
      stroke(this.color1 - 50, this.color2 - 50, this.color3 - 50);
      circle(this.x - x + 250, this.y - y + 150, this.size / s);
      if (dist(this.x, this.y, x, y) < 25) {
        this.x = random(10000) - 5000;
        this.y = random(6000) - 3000;
        s += 0.001;
      }
    }
  }
}

function mousePressed() {
  //pellets.push(new Pellet());
}

function showArray(arr) {
  for (let i = arr.length - 1; i > -1; i--) {
    arr[i].show();
  }
}

function newPlayer(data) {
  players[data.id] = data;
}
