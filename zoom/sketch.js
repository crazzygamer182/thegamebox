let guy;
let enemies;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  enemies = [];
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  guy = new Guy();
  while (enemies.length < 10) {
    enemies.push(new Enemy());
  }
}

function draw() {
  background(220);
  guy.show();
  noStroke();
  fill(0);
  rect(0, 235 * (wh / 500), wh, ht);
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].show();
  }
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
    rect(this.x, this.y, 35 * (wh / 500), 35 * (wh / 500), 5, 5)
    this.v += 1 * (wh / 500);
    this.y += this.v;
    this.y = constrain(this.y, 0, (233 - 35) * (wh / 500));
  }
}

function mousePressed () {
  if (guy.y > (233 - 50) * (wh / 500)) {
    guy.v = -14 * (wh / 500);
  }
}

class Enemy {
  constructor() {
    this.x = random(wh*20)+wh/2;
    this.y = 198 * (wh / 500);
  }
  show() {
    this.x -= 10 * (wh / 500);
    fill(255, 0, 0)
    triangle(this.x, this.y+(37 * (wh / 500)), this.x+((37/2) * (wh / 500)), this.y, this.x+(37 * (wh / 500)), this.y+(37) * (wh / 500));
    if (this.x < -wh) {
      this.x = random(wh*20)+wh/2;
    }
    if (guy.y + 35 > this.y && abs(guy.x - this.x) < 35) {
        setup();
    }
  }
}