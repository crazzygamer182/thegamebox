let x = 0;
let y = 0;
let pellets = [];
let s = 1;
let socket;
let players = {};
let game = 0;
let namee = "";
let num;
let gs = 1;
let fontt;
let c;
let one;
let two;
let wait = 0;

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
  back = loadImage("back.png");
}

function setup() {
  angleMode(DEGREES);
  textFont(fontt);
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
  for (let i = 0; i < 5000; i++) {
    pellets.push(new Pellet());
  }
  //socket = io('http://localhost:3000');
  socket = io('https://api.thegamebox.ca');
  socket.on('mouse', newPlayer);
  textAlign(CENTER, CENTER);
  var inp = createInput('');
  inp.position(windowWidth/2 - 50*(wh/500), windowHeight/2);
  inp.size(100*(wh/500));
  inp.input(myInputEvent);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.size(80, 40);
  colorPicker.position(windowWidth/2 - 40, windowHeight/2 + 100);
  num = getItem('id');
   if (num === null || num < 100) {
     num = int(random(10)) + int(random(10))*10 + int(random(10))*100 + int(random(10))*1000 + int(random(10))*100000 + int(random(10))*1000000 + int(random(10))*10000000 + int(random(10))*100000000 + int(random(10))*1000000000;
     storeItem('id', num);
   }
   console.log(num);
   one = int(random(9)) + 4;
   two = int(random(9)) + 4;
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
    stroke(red(c)-50, green(c)-50, blue(c)-50);
    fill(c);
    strokeWeight(3);
    circle(250, 150, 50);
    textSize(11);
    stroke(0);
    fill(255);
    let newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.setMag(1.5 / s);
    vel.lerp(newvel, 0.2);
    pos.add(vel);
    x = pos.x;
    y = pos.y;
    var data = {
      x: x,
      y: y,
      namee: namee,
      number: num,
      s: s,
      c: c
    }
    b = Object.keys(players);
    strokeWeight(1);
    text(namee, 250, 150)
    noStroke();
    fill(200);
    rect(425, 225, 75, 75);
    for (let i = 0; i < b.length; i++) {
      strokeWeight(3);
      stroke(red(players[b[i]].c)-50, green(players[b[i]].c)-50, blue(players[b[i]].c)-50);
      fill(players[b[i]].c);
      circle(players[b[i]].x - x + 250, players[b[i]].y - y + 150, (50*players[b[i]].s)/s);
      strokeWeight(1);
      stroke(0);
      fill(255);
      text(players[b[i]].n, players[b[i]].x - x + 250, players[b[i]].y - y + 150)
      fill(players[b[i]].c);
      noStroke();
      circle(players[b[i]].x/100 + 462.5, players[b[i]].y/100 + 262.5, 50*0.075*players[b[i]].s);
      players[b[i]].show();
    }
    fill(c);
    circle(x/100 + 462.5, y/100 + 262.5, 50*0.075*s);
    if (gs > s) {
      s += 0.00001;
    }
    if (wait > 1) {
      wait--;
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(50, 255, 25);
      text(one + " + " + two, 250, 50);
    } else if (wait == 1) {
      one = int(random(9)) + 4;
      two = int(random(9)) + 4;
      wait--;
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(200);
      text(one + " + " + two, 250, 50);
    } else if (wait == 0) {
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(200);
      text(one + " + " + two, 250, 50);
    }
    else if (wait < -1) {
      wait++;
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(255, 25, 50);
      text(one + " + " + two, 250, 50);
    } else if (wait == -1) {
      wait++;
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(200);
      text(one + " + " + two, 250, 50);
    } else {
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(200);
      text(one + " + " + two, 250, 50);
    }
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
    this.number = int(random(17)) + 8;
  }
  show() {
    if (this.x - x > -300 && this.x - x < 300 && this.y - y > -200 && this.y - y < 200) {
      fill(this.color1, this.color2, this.color3);
      //stroke(this.color1 - 50, this.color2 - 50, this.color3 - 50);
      noStroke();
      circle(this.x - x + 250, this.y - y + 150, 15 / s);
      textAlign(CENTER, CENTER);
      fill(255);
      stroke(0);
      strokeWeight(1);
      textSize(8);
      text(this.number, this.x - x + 250, this.y - y + 150);
      if (dist(this.x, this.y, x, y) < 25) {
        if (this.number == one + two) {
          wait = 100;
          gs += 0.01;
        } else {
          wait = -100;
          gs -= 0.005;
        }
        this.x = random(10000) - 5000;
        this.y = random(6000) - 3000;
        this.number = int(random(9)) + 4 + int(random(9)) + 4;
        this.color1 = random(50, 255);
        this.color2 = random(50, 255);
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
      players[data.number].s = data.s;
      players[data.number].n = data.namee;
      players[data.number].c = data.c;
  } else if (data.number != num) {
    players[data.number] = new Player(data.x, data.y, data.namee, data.s, data.c);;
  } else {
    x = data.x;
    y = data.y;
  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    game = 1;
    c = colorPicker.color()
    removeElements();
  }
}

function myInputEvent() {
  namee = this.value();
}

class Player {
  constructor(px, py, pn, s, c1) {
    this.x = px;
    this.y = py;
    this.n = pn;
    this.gx = this.x;
    this.gy = this.y;
    this.s = s;
    this.c = c1;
  }
  show() {
    console.log(dist(this.x, this.y, this.gx, this.gy));
    if (this.gx > this.x) {
      this.x += 2.5;
    }
    if (this.gx < this.x) {
      this.x -= 2.5;
    }
    if (this.gy > this.y) {
      this.y += 2.5;
    }
    if (this.gy < this.y) {
      this.y -= 2.5;
    }
    if (abs(this.gx - this.x) > 50) {
      this.x = this.gx;
    }
  }
}