let guy;
let enemies;

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
  centerCanvas();
  guy = new Guy();
  while (enemies.length < 1) {
    enemies.push(new Enemy());
  }
}

function draw() {
  background(220);
  guy.show();
  noStroke();
  fill(50);
  rect(0, 234 * (wh / 500), wh, ht);
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
    rect(this.x, this.y, 35 * (wh / 500), 35 * (wh / 500), 5, 5);
    this.v += 1 * (wh / 500);
    this.y += this.v;
    this.y = constrain(this.y, 0, (233 - 35) * (wh / 500));
  }
}

function mousePressed() {
  if (guy) {
    if (guy.y > (233 - 50) * (wh / 500)) {
      guy.v = -14 * (wh / 500);
    }
  }
}

class Enemy {
  constructor() {
    this.x = random(wh * 50) + (wh * 5);
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
    text(this.number, this.x+(18 * (wh / 500)), this.y+(22 * (wh / 500)));
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