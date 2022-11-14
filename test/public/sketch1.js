let x = 0;
let y = 0;
let pellets = [];
let s = 10000;
let socket;
let players = {};
let game = 0;
let namee = "";
let num;
let gs = 10000;
let fontt;
let c;
let one;
let two;
let wait = 0;
let leaderBoard = [];
let gameMode = "add";
let instructions;

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
  back = loadImage("back.png");
  instructions = loadImage("i.png");
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
  var inp = createInput('').attribute('maxlength', 10);
  inp.position(windowWidth/2 - 50*(wh/500), windowHeight/2 - 40*(ht/300));
  inp.size(100*(wh/500), 7*(wh/500));
  inp.input(myInputEvent);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.size(20*(ht/300), 45*(ht/300));
  colorPicker.position(windowWidth/2 - 60*(ht/300), windowHeight/2 - 20*(ht/300));
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
      250 - (x % (37.44)),
      150 - (y % (37.44)),
      back.width,
      back.height
    );
    showArray(pellets);
    let newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.setMag(1.5 / (s/10000));
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
      c1: red(c),
      c2: green(c),
      c3: blue(c)
    }
    b = Object.keys(players);
    noStroke();
    fill(200);
    rect(425, 225, 75, 75);
    leaderBoard = [];
    for (let i = 0; i < b.length; i++) {
      leaderBoard.push(players[b[i]]);
    }
    leaderBoard.push(new Player(x, y, namee, s, c));
    leaderBoard.sort(function(a, b){return a.s - b.s});
    //sort array
    for (let i = 0; i < leaderBoard.length; i++) {
      if (leaderBoard[i].x != x || leaderBoard[i].y != y) {
        strokeWeight(3);
        stroke(red(leaderBoard[i].c)-50, green(leaderBoard[i].c)-50, blue(leaderBoard[i].c)-50);
        fill(leaderBoard[i].c);
        textSize(9*(leaderBoard[i].s/10000));
        circle(leaderBoard[i].x - x + 250, leaderBoard[i].y - y + 150, (50*leaderBoard[i].s/10000));
        strokeWeight(1);
        stroke(0);
        fill(255);
        text(leaderBoard[i].n, leaderBoard[i].x - x + 250, leaderBoard[i].y - y + 150)
        fill(225, 25, 50);
        noStroke();
        if (leaderBoard[i].x > -5000 && leaderBoard[i].y > -5000 && leaderBoard[i].x < 5000 && leaderBoard[i].y < 5000) {
          circle(leaderBoard[i].x*0.0075 + 462.5, leaderBoard[i].y*0.0075 + 262.5, 50*0.075*leaderBoard[i].s/10000);
        }
        leaderBoard[i].show();
      } else {
        strokeWeight(3);
        stroke(red(c)-50, green(c)-50, blue(c)-50);
        fill(c);
        strokeWeight(3);
        circle(250, 150, 50*s/10000);
        textSize(11);
        stroke(0);
        fill(255);
        strokeWeight(1);
        textSize(9*s/10000);
        text(namee, 250, 150)
      }
    }
    fill(25, 50, 225);
    if (x < 5000 && x > -5000 && y > -5000 && y < 5000) {
      circle(x*0.0075 + 462.5, y*0.0075 + 262.5, 50*0.075*s/10000);
    }
    if (gs > s) {
      s += 10;
    } else if (gs < s) {
      s -= 10;
    }
    if (wait > 1) {
      wait--;
      textSize(35);
      stroke(0);
      strokeWeight(1);
      fill(50, 255, 25);
      drawProblem();
    } else if (wait == 1) {
      newNums();
      wait--;
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(150);
      drawProblem();
    } else if (wait == 0) {
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(150);
      drawProblem();
    }
    else if (wait < -1) {
      wait++;
      textSize(35);
      stroke(0);
      strokeWeight(1);
      fill(255, 25, 50);
      drawProblem();
    } else if (wait == -1) {
      wait++;
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(150);
      drawProblem();
    } else {
      textSize(30);
      stroke(0);
      strokeWeight(1);
      fill(150);
      drawProblem();
    }
    fill(100);
    push();
    angleMode(DEGREES);
    translate(mouseX/(wh/500), mouseY/(wh/500));
    rotate(-18.5);
    noCursor();
    triangle(-5, 5, 0, -5, 5, 5);
    pop();
    textAlign(RIGHT, TOP);
    fill(0);
    noStroke();
    textSize(10);
    text("Score: " + s, 490, 10);
    for (let i = 1; i < leaderBoard.length+1; i++) {
      textAlign(LEFT, TOP);
      if (i < 11) {
        text((1 + leaderBoard.length-i) + ". " + leaderBoard[i-1].n + "  " + leaderBoard[i-1].s, 15, 15*(1 + leaderBoard.length-i));
      }
    }
    textAlign(CENTER, CENTER);
    socket.emit('mouse', data);
  } else {
    imageMode(CENTER);
    image(
      back,
      250 - (x % (37.44)),
      150 - (y % (37.44)),
      back.width,
      back.height
    );
    image(instructions, 250, 150, instructions.width/4, instructions.height/4);
    c = colorPicker.color()
    fill(0);
    noStroke();
    textSize(40);
    text("Agar.io", 250, 45)
    textSize(11);
    text("Choose name and color", 250, 95)
    stroke(red(c)-50, green(c)-50, blue(c)-50);
    fill(c);
    strokeWeight(3);
    circle(250, 150, 50*s/10000);
    stroke(0);
    fill(255);
    strokeWeight(1);
    textSize(9*s/10000);
    text(namee, 250, 150)
    fill(25, 225, 50);
    stroke(5, 150, 10);
    strokeWeight(2);
    strokeJoin(ROUND);
    if (mouseX > 225*(wh/500) && mouseX < 275*(wh/500) && mouseY > 185*(wh/500) && mouseY < 205*(wh/500)) {
      rect(222.5, 183.75, 55, 22.5, 3, 3);
      textSize(12);
    } else {
      rect(225, 185, 50, 20, 3, 3);
      textSize(9);
    }
    fill(0);
    stroke(255);
    strokeWeight(1);
    text("Start", 250, 195);
    rectMode(CENTER);
    stroke(50);
    strokeWeight(2);
    push();
    translate(0, 55);
    if (mouseX > 214*(wh/500) && mouseX < 246*(wh/500) && mouseY > 219*(wh/500) && mouseY < 251*(wh/500)) {
      fill(125);
      rect(230, 180, 35, 35, 5, 5);
    } else {
      fill(100);
      rect(230, 180, 32, 32, 5, 5);
    }
    if (mouseX > 254*(wh/500) && mouseX < 286*(wh/500) && mouseY > 219*(wh/500) && mouseY < 251*(wh/500)) {
      fill(125);
      rect(270, 180, 35, 35, 5, 5);
    } else {
      fill(100);
      rect(270, 180, 32, 32, 5, 5);
    }
    if (mouseX > 214*(wh/500) && mouseX < 246*(wh/500) && mouseY > 259*(wh/500) && mouseY < 291*(wh/500)) {
      fill(125);
      rect(230, 220, 35, 35, 5, 5);
    } else {
      fill(100);
      rect(230, 220, 32, 32, 5, 5);
    }
    if (mouseX > 254*(wh/500) && mouseX < 286*(wh/500) && mouseY > 259*(wh/500) && mouseY < 291*(wh/500)) {
      fill(125);
      rect(270, 220, 35, 35, 5, 5);
    } else {
      fill(100);
      rect(270, 220, 32, 32, 5, 5);
    }
    pop();
    rectMode(CORNER);
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
    this.number = newPelletNumber();
  }
  show() {
    if (this.x - x > -300 && this.x - x < 300 && this.y - y > -200 && this.y - y < 200) {
      fill(this.color1, this.color2, this.color3);
      //stroke(this.color1 - 50, this.color2 - 50, this.color3 - 50);
      noStroke();
      circle(this.x - x + 250, this.y - y + 150, 20);
      textAlign(CENTER, CENTER);
      fill(255);
      stroke(0);
      strokeWeight(1);
      textSize(11);
      text(this.number, this.x - x + 250, this.y - y + 150);
      if (dist(this.x, this.y, x, y) < 25*s/10000) {
        if (gameMode == "add") {
          if (this.number == one + two) {
            wait = 100;
            gs += 300;
          } else {
            wait = -100;
            gs -= 200;
          }
        } else if (gameMode == "subtract") {
          if (this.number == one - two) {
            wait = 100;
            gs += 300;
          } else {
            wait = -100;
            gs -= 200;
          }
        } else if (gameMode == "multiply") {
          if (this.number == one*two) {
            wait = 100;
            gs += 300;
          } else {
            wait = -100;
            gs -= 200;
          }
        } else if (gameMode == "divide") {
          if (this.number == one/two) {
            wait = 100;
            gs += 300;
          } else {
            wait = -100;
            gs -= 200;
          }
        }
        this.x = random(10000) - 5000;
        this.y = random(6000) - 3000;
        this.number = newPelletNumber();
        this.color1 = random(50, 255);
        this.color2 = random(50, 255);
      }
    }
  }
}

function mousePressed() {
  if (gameMode == 1) {
    if (mouseX > 225*(wh/500) && mouseX < 275*(wh/500) && mouseY > 185*(wh/500) && mouseY < 205*(wh/500)) {
      game = 1;
      c = colorPicker.color()
      removeElements();
      newNums();
      x = 0;
      y = 0;
    }
  }
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
      players[data.number].c = color(data.c1, data.c2, data.c3);
  } else if (data.number != num) {
    players[data.number] = new Player(data.x, data.y, data.namee, data.s, color(data.c1, data.c2, data.c3));
  } else {
    x = data.x;
    y = data.y;
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

function newPelletNumber() {
  if (gameMode == "add") {
    return int(random(17)) + 8;
  } else if (gameMode == "subtract") {
    return (int(random(10)) + 6) - (int(random(6)) + 1);
  } else if (gameMode == "multiply") {
    return (int(random(5)) + 2)*(int(random(5)) + 2);
  } else if (gameMode == "divide") {
    return (int(random(8)) + 2);
  }
}

function newNums() {
  if (gameMode == "add") {
    one = int(random(9)) + 4;
    two = int(random(9)) + 4;
  } else if (gameMode == "subtract") {
    one = int(random(10)) + 6
    two = int(random(6)) + 1
  } else if (gameMode == "multiply") {
    one = int(random(5)) + 2;
    two = int(random(5)) + 2;
  } else if (gameMode == "divide") {
    let second = int(random(5)) + 2;
    one = (int(random(8)) + 2)*second;
    two = second;
  }
}

function drawProblem() {
  if (gameMode == "add") {
    text(one + " + " + two, 250, 65);
  } else if (gameMode == "subtract") {
    text(one + " - " + two, 250, 65);
  } else if (gameMode == "multiply") {
    text(one + " x " + two, 250, 65);
  } else if (gameMode == "divide") {
    text(one + " ÷ " + two, 250, 65);
  }
}

function eat() {
  for (let i = 0; i < b.length; i++) {
    if (dist(x, y, players[b[i]].gx, players[b[i]].gy)) {
      if (s < players[b[i]].gx) {
        x = -10000000;
        y = -10000000;
        gameMode = 2;
        let x = 0;
        let y = 0;
      }
    }
  }
}