let pos = 0;
let speed = 0;
let acceleration = 0;
let lane = 1;
let gposy = 13.5 + 34.3 * lane;
let posy = gposy;
let car1x = 50;
let car2x = 50;
let car3x = 50;
let racc = 0;
let rpos = 0;
let num1 = 0;
let num2 = 0;
let op = "x";
let answer = 0;
let answers = [];
const particles = [];
let stage = 0;
let plus = true;
let minus = false;
let times = false;
let divide = false;
let level = 1;
let possible = ["+", "-", "x", "÷"];

function setup() {
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  makeQuestion(1);
}

function preload() {
  road = loadImage("road (1).png");
  car = loadImage("car (1).png");
  car2 = loadImage("car2.png");
}

function centerCanvas() {
  this.cx = (windowWidth - width) / 2;
  this.cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function draw() {
  background(230);
  if (int(random(100)) == 0 && speed > 5) {
    if (lane == 1) lane = 2;
    else lane = 1;
  }
  gposy = 13.5 + 34.3 * lane;
  posy += (gposy - posy) / 7;
  racc -= (racc - acceleration) / 20;
  if (pos > 174) {
    pos = 0;
  }
  if (stage == 2) {
    car1x += random(8) + 4;
    car2x += random(8) + 4.4;
    car3x += random(8) + 3;
  }
  if (speed > 0) speed = speed - 0.03;
  if (acceleration > 0) acceleration = acceleration - 0.3;
  if (acceleration < 0) acceleration = 0;
  if (speed < 0) speed = 0;
  if (speed > 10) speed = 8;
  speed += racc;
  if (rpos >= 14850) {
    rpos = 14850;
    speed = 0;
    acc = 0;
    racc = 0;
  } else {
    pos += speed;
    rpos += speed;
  }
  scale(wh / 500, ht / 300);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(25);
  textStyle(BOLD);
  text("What is " + num1 + " " + op + " " + num2 + "?", 250, 192);
  fill(0, 200, 255);
  stroke(0);
  strokeWeight(5);
  push();
  translate(0, 6);
  rect(37, 220, (200 - 35) / 2, 35, 10, 10);
  rect(264, 220, (200 - 35) / 2, 35, 10, 10);
  rect(35 + (200 - 35) / 2 + 35, 220, (200 - 35) / 2, 35, 10, 10);
  rect(262 + (200 - 35) / 2 + 35, 220, (200 - 35) / 2, 35, 10, 10);
  noStroke();
  fill(0);
  textSize(22);
  push();
  translate(40, 19);
  text(answers[0], 37, 220);
  text(answers[2], 264, 220);
  text(answers[1], 35 + (200 - 35) / 2 + 35, 220);
  text(answers[3], 262 + (200 - 35) / 2 + 35, 220);
  pop();
  pop();
  if (rpos == 14850) {
    fill(255);
    stroke(0);
    rect(394, 271, 90, 20, 3, 3);
    fill(0);
    noStroke();
    textSize(15);
    text("New Race", 440, 282);
  }
  if (rpos > 14850) {
    rpos = 14850;
  }
  strokeWeight(7);
  rect(-50, 17, 700, road.height / (road.width / 700));
  image(road, -pos, 17, 700, road.height / (road.width / 700));
  fill(50);
  strokeWeight(2);
  rect(50, 150, 403, 7);
  noStroke();
  fill(30, 100, 30);
  if (rpos > 14850) {
    rpos = 14850;
  }
  if (car1x > 14890) {
    car1x = 14890;
  }
  if (car2x > 14880) {
    car2x = 14880;
  }
  if (car3x > 14880) {
    car3x = 14880;
  }
  rect(52, 151.5, rpos / (15000 / 400), 4);
  fill(255);
  rect(14850 - rpos + 4, 17, 22, 126);
  fill(255, 0, 0);
  rect(car2x / (15000 / 400) + 52, 151.5, 2, 4);
  rect(car3x / (15000 / 400) + 52, 151.5, 2, 4);
  rect(car1x / (15000 / 400) + 52, 151.5, 2, 4);
  fill(0, 255, 0);
  rect(rpos / (15000 / 400) + 52, 151.5, 3, 4);
  for (let i = 0; i < 5; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
  if (rpos > 14850) {
    rpos = 14850;
  }
  image(car2, 50, posy, 50, 23);
  image(car, car1x - rpos, 13.5 + 34.3 * 2 - (posy - 47.5), 50, 23);
  image(car, car2x - rpos, 16, 50, 23);
  image(car, car3x - rpos, 116.5, 50, 23);
  if (stage == 0) {
    fill(255);
    stroke(0);
    strokeWeight(10);
    rect(10, 10, 480, 280, 15, 15);
    stroke(0);
    strokeWeight(3);
    textSize(25);
    fill(200);
    text("Select which game modes you would like to use", 45, 70, 400);
    strokeWeight(6);
    textAlign(TOP, LEFT);
    push();
    translate(-5, -8);
    // Set colors for each rectangle
    if (plus) {
      fill(255, 0, 0); // Bright red
    } else {
      fill(175);
    }
    rect(40 + 20, 130, 80, 80, 10, 10);

    if (minus) {
      fill(0, 255, 0); // Bright green
    } else {
      fill(175);
    }
    rect(40 + 40 + 80, 130, 80, 80, 10, 10);

    if (times) {
      fill(100, 100, 255); // Bright blue
    } else {
      fill(175);
    }
    rect(40 + 60 + 80 * 2, 130, 80, 80, 10, 10);

    if (divide) {
      fill(255, 255, 0); // Bright yellow
    } else {
      fill(175);
    }
    rect(40 + 40 * 2 + 80 * 3, 130, 80, 80, 10, 10);

    // For the buttons
    if (level == 1) {
      fill(255, 165, 0); // Bright orange
    } else {
      fill(200);
    }
    rect(250 - 130, 230, 120, 40, 10, 10);

    if (level == 10) {
      fill(255, 20, 147); // Deep pink
    } else {
      fill(200);
    }
    rect(260, 230, 120, 40, 10, 10);

    push();
    strokeWeight(0);
    translate(40, 39);
    fill(0);
    textSize(60);
    text("+", 40 + 20, 134, 80, 80);
    text("-", 40 + 40 + 80 - 1, 129, 80, 80);
    text("x", 40 + 60 + 80 * 2, 130, 80, 80);
    text("÷", 40 + 40 * 2 + 80 * 3, 135, 80, 80);
    push();
    translate(19, -18);
    textSize(18);
    text("Single Digit", 250 - 130, 230);
    textSize(17);
    text("Double Digit", 260, 230);
    pop();
    pop();

    pop();
    fill(50, 200, 200);
    rect(415, 235, 60, 40, 10, 10);

    fill(0);
    strokeWeight(0);
    textSize(15);
    text("Done", 445, 255);
  }
}

class Particle {
  constructor() {
    this.x = 60;
    this.y = 12;
    this.vx = random(-speed * 2);
    this.vy = random(-1, 1);
    this.alpha = 255;
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 40;
  }
  show() {
    noStroke();
    //stroke(255);
    fill(15, this.alpha);
    ellipse(this.x, this.y + posy, 3);
  }
}

function makeQuestion() {
  good = false;
  do {
    op = possible[int(random(0, 4))];
    good = true;
    if (op == "+" && !plus) {
      good = false;
    } else if (op == "-" && !minus) {
      good = false;
    } else if (op == "x" && !times) {
      good = false;
    } else if (op == "÷" && !divide) {
      good = false;
    }
  } while (!good);
  if (op == "÷" || op == "x") {
    num1 = int(random(1, 10));
    num2 = int(random(1, 10));
  } else {
    num1 = int(random(1, 10 * level));
    num2 = int(random(1, 10 * level));
  }
  if (op == "÷") {
    answer = num1;
    num1 = answer * num2;
  } else {
    if (op == "+") {
      answer = num1 + num2;
    }
    if (op == "-") {
      while (num1 <= num2) {
        num1 = int(random(1, 10 * level));
        num2 = int(random(1, 10 * level));
      }
      answer = num1 - num2;
    }
    if (op == "x") {
      answer = num1 * num2;
    }
  }
  answerone = int(random(0, 4));
  answers[answerone] = answer;
  for (let i = 0; i < 4; i++) {
    if (i != answerone) {
      answers[i] = int(random(answer - 5 * level, answer + 5 * level));
    }
  }
  console.log(answers);
}

function mousePressed() {
  if (stage == 0) {
    if (
      mouseX > 57 * (width / 500) &&
      mouseX < 132 * (width / 500) &&
      mouseY > 124 * (width / 500) &&
      mouseY < 198 * (width / 500)
    ) {
      if (!(!minus && !times && !divide)) {
        plus = !plus;
      }
    } else if (
      mouseX > 158 * (width / 500) &&
      mouseX < 231 * (width / 500) &&
      mouseY > 124 * (width / 500) &&
      mouseY < 198 * (width / 500)
    ) {
      if (!(!plus && !times && !divide)) {
        minus = !minus;
      }
    } else if (
      mouseX > 254 * (width / 500) &&
      mouseX < 335 * (width / 500) &&
      mouseY > 124 * (width / 500) &&
      mouseY < 198 * (width / 500)
    ) {
      if (!(!plus && !minus && !divide)) {
        times = !times;
      }
    } else if (
      mouseX > 356 * (width / 500) &&
      mouseX < 436 * (width / 500) &&
      mouseY > 124 * (width / 500) &&
      mouseY < 198 * (width / 500)
    ) {
      if (!(!plus && !minus && !times)) {
        divide = !divide;
      }
    } else if (
      mouseX > 117 * (width / 500) &&
      mouseX < 232 * (width / 500) &&
      mouseY > 224 * (width / 500) &&
      mouseY < 259 * (width / 500)
    ) {
      if (level == 10) {
        level = 1;
      }
    } else if (
      mouseX > 253 * (width / 500) &&
      mouseX < 376 * (width / 500) &&
      mouseY > 224 * (width / 500) &&
      mouseY < 259 * (width / 500)
    ) {
      if (level == 1) {
        level = 10;
      }
    } else if (
      mouseX > 417 * (width / 500) &&
      mouseX < 472 * (width / 500) &&
      mouseY > 237 * (width / 500) &&
      mouseY < 273 * (width / 500)
    ) {
      stage = 1;
      makeQuestion();
    }
  } else if (stage < 3) {
    if (
      mouseX > 35 * (width / 500) &&
      mouseX < 117 * (width / 500) &&
      mouseY > 220 * (width / 500) &&
      mouseY < 255 * (width / 500)
    ) {
      if (answers[0] == answer) {
        stage = 2;
        racc = 2;
        makeQuestion();
      } else {
        racc = 0;
        acc = 0;
        speed -= 4;
      }
    } else if (
      mouseX > 152 * (width / 500) &&
      mouseX < 235 * (width / 500) &&
      mouseY > 220 * (width / 500) &&
      mouseY < 255 * (width / 500)
    ) {
      if (answers[1] == answer) {
        stage = 2;
        racc = 2;
        makeQuestion();
      } else {
        racc = 0;
        acc = 0;
        speed -= 4;
      }
    } else if (
      mouseX > 263 * (width / 500) &&
      mouseX < 346 * (width / 500) &&
      mouseY > 220 * (width / 500) &&
      mouseY < 255 * (width / 500)
    ) {
      if (answers[2] == answer) {
        stage = 2;
        racc = 2;
        makeQuestion();
      } else {
        racc = 0;
        acc = 0;
        speed -= 4;
      }
    } else if (
      mouseX > 381 * (width / 500) &&
      mouseX < 464 * (width / 500) &&
      mouseY > 220 * (width / 500) &&
      mouseY < 255 * (width / 500)
    ) {
      if (answers[3] == answer) {
        stage = 2;
        racc = 2;
        makeQuestion();
      } else {
        racc = 0;
        acc = 0;
        speed -= 4;
      }
    }
    if (
      rpos == 14850 &&
      mouseX > 392 * (width / 500) &&
      mouseX < 483 * (width / 500) &&
      mouseY > 269 * (width / 500) &&
      mouseY < 290 * (width / 500)
    ) {
      stage = 0;
      newRace();
    }
    console.log(width, mouseX, mouseY);
  }
}

function newRace() {
  pos = 0;
  speed = 0;
  acceleration = 0;
  lane = 1;
  gposy = 13.5 + 34.3 * lane;
  posy = gposy;
  car1x = 50;
  car2x = 50;
  car3x = 50;
  racc = 0;
  rpos = 0;
  num1 = 0;
  num2 = 0;
  op = "x";
  answer = 0;
  answers = [];
  stage = 0;
  plus = true;
  minus = false;
  times = false;
  divide = false;
  level = 1;
  possible = ["+", "-", "x", "÷"];
}
