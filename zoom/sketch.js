let guy;
let enemies;
let ground;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
}

function setup() {
  textFont(fontt);
  enemies = [];
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  ground = (233 - 35) * (wh / 500);
  centerCanvas();
  guy = new Guy();
  while (enemies.length < 1) {
    enemies.push(new RideUp());
  }
}

let onAnything = false;
let wasOnAnything = false;
let frameCount = 0;

function draw() {
  background(220);
  guy.show();
  noStroke();
  fill(50);
  rect(0, 234 * (wh / 500), wh, ht);
  onAnything = false;
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].show();
    for (let j = 0; j < enemies[i].blocks.length; j++) {
      if (abs((guy.x + ((35/2) * (wh / 500))) - (enemies[i].blocks[j].x + ((35/2) * (wh / 500)))) <= 35 * (wh / 500) && (guy.y + ((35/2) * (wh / 500))) - (enemies[i].blocks[j].y + ((35/2) * (wh / 500))) <= 0) {
        ground = (233 - 70) * (wh / 500) - ((198 * (wh / 500)) - enemies[i].blocks[j].y);
        onAnything = true;
        wasOnAnything = true;
        console.log("hi");
      }
    }
  }
  if (onAnything == false) {
    ground = (233 - 35) * (wh / 500);
    if (wasOnAnything == true) {
      if (guy.v > 0) {
        guy.v = 0;
      }
      wasOnAnything = false;
    }
  }
  frameCount++;
}

class Guy {
  constructor() {
    this.x = 100 * (wh / 500);
    this.y = 198 * (wh / 500);
    this.v = 0;
  }
  show() {
    strokeWeight(4 * (wh / 500));
    stroke(0, 50, 155);
    fill(0, 100, 255);
    rect(this.x, this.y, 35 * (wh / 500), 35 * (wh / 500), 5, 5);
    this.v += 1 * (wh / 500);
    this.y += this.v;
    this.y = constrain(this.y, 0, ground);
  }
}

function mousePressed() {
    if (guy.y > ground - 10 * (wh / 500)) {
      guy.v = -14 * (wh / 500);
    }
}

class Enemy {
  constructor() {
    this.x = wh * 2 * (wh / 500);
    this.y = 196 * (wh / 500);
    this.number = int(random(5))+1;
  }
  show() {
    this.x -= 5 * (wh / 500);
    fill(255, 0, 0);
    strokeWeight(4 * (wh / 500));
    stroke(155, 0, 0);
    strokeJoin(ROUND);
    triangle(
      this.x,
      this.y + 37 * (wh / 500),
      this.x + (37 / 2) * (wh / 500),
      this.y,
      this.x + 37 * (wh / 500),
      this.y + 37 * (wh / 500)
    );
    if (this.x < -wh) {
      this.x = random(wh * 20) + wh / 2;
    }
    if (guy.x + 35 * (wh / 500) > this.x && guy.x < this.x && guy.y + 35 * (wh / 500) > this.y) {
      setup();
    }
    fill(0);
    noStroke();
    textSize(20 * (wh / 500));
    textAlign(CENTER, CENTER);
    //text(this.number, this.x+(18 * (wh / 500)), this.y+(22 * (wh / 500)));
  }
}

class Block {
    constructor(x, y) {
      this.startingX = x;
      this.x = this.startingX;
      this.y = y;
    }
    show() {
      strokeWeight(4 * (wh / 500));
      stroke(100, 50, 25);
      fill(200, 100, 50);
      if (this.x > 0 && this.x < wh) {
        rect(this.x, this.y, 35 * (wh / 500), 35 * (wh / 500), 5, 5);
      }
      this.x -= 5 + frameCount/1000 * (wh / 500);
    }
    random() {
      //this.x = random(wh) + wh;
    }
}

class RideUp {
  constructor() {
    this.x = random(wh) + wh;
    this.y = 198 * (wh / 500);
    this.blocks = [];
    console.log("hi");
    this.blocks.push(new Block(this.x, this.y));
    console.log("hi");
    this.blocks.push(new Block(this.x + 35 * (wh / 500), this.y));
    console.log("hi");
    this.blocks.push(new Block(this.x + 35 * (wh / 500), this.y - 35 * (wh / 500)));
    console.log("hi");
    this.blocks.push(new Block(this.x + 70 * (wh / 500), this.y));
    console.log("hi");
    this.blocks.push(new Block(this.x + 70 * (wh / 500), this.y - 35 * (wh / 500)));
    console.log("hi");
    this.blocks.push(new Block(this.x + 70 * (wh / 500), this.y - 70 * (wh / 500)));
    console.log("hi");
  }
  show() {
    for (let i = 0; i < this.blocks.length; i++) {
      console.log(i);
      this.blocks[i].show();
      if (this.blocks[i].x < -wh) {
        this.blocks[i].x = this.x + 35 * (wh / 500);
      }
    }
  }
}

function windowResized() {
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
}