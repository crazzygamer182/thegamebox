let x = 0;
let y = 0;
let pellets = [];
let s = 1;
let socket;
let players = {};
let game = 0;
let namee = "";
let num;

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
  var inp = createInput('');
  inp.position(windowWidth/2 - 50*(wh/500), windowHeight/2);
  inp.size(100*(wh/500));
  inp.input(myInputEvent);
  num = getItem('id');
   if (num === null || num < 100) {
     num = int(random(10)) + int(random(10))*10 + int(random(10))*100 + int(random(10))*1000 + int(random(10))*100000 + int(random(10))*1000000 + int(random(10))*10000000 + int(random(10))*100000000 + int(random(10))*1000000000;
     storeItem('id', num);
   }
   console.log(num);
}

function draw() {
  //background(220);
  scale(wh / 500);
  if (game == 1) {
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
      y: y,
      namee: namee,
      number: num
    }
    b = Object.keys(players);
    strokeWeight(1);
    text(namee, 250, 200)
    noStroke();
    fill(50);
    rect(425, 225, 75, 75);
    for (let i = 0; i < b.length; i++) {
      strokeWeight(3);
      stroke(0);
      fill(255);
      circle(players[b[i]].x - x + 250, players[b[i]].y - y + 150, 50);
      strokeWeight(1);
      text(players[b[i]].n, players[b[i]].x - x + 250, players[b[i]].y - y + 200)
      fill(255, 0, 0);
      noStroke();
      circle(players[b[i]].x/50 + 450, players[b[i]].y/50 + 250, 50*0.075);
      players[b[i]].show();
    }
    fill(0, 0, 255);
    circle(x/50 + 450, y/50 + 250, 50*0.075);
    socket.emit('mouse', data);
  } else {
    text("Enter Name", 250, 100)
  }
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
  if (players[data.number]) {
      players[data.number].gx = data.x;
      players[data.number].gy = data.y;
  } else if (data.number != num) {
    players[data.number] = new Player(data.x, data.y, data.namee);;
  } else {
    x = data.x;
    y = data.y;
  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    game = 1;
    removeElements();
  }
}

function myInputEvent() {
  namee = this.value();
}

class Player {
  constructor(px, py, pn) {
    this.x = px;
    this.y = py;
    this.n = pn;
    this.gx = this.x;
    this.gy = this.y;
  }
  show() {
    console.log(dist(this.x, this.y, this.gx, this.gy));
    if (this.gx > this.x) {
      this.x += 2.5/s;
    }
    if (this.gx < this.x) {
      this.x -= 2.5/s;
    }
    if (this.gy > this.y) {
      this.y += 2.5/s;
    }
    if (this.gy < this.y) {
      this.y -= 2.5/s;
    }
  }
}