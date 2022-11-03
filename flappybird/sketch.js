let x = 0;
let y = 0;
let v = 0;
let rv = 0;
let pipes = [];
let fontt;

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
}

function setup() {
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
  x = 175*(wh/500);
  y = ht/2;
  for (let i = 0; i < 2; i++) {
    pipes.push(new Pipe(i));
  }
}

function draw() {
  background(0, 200, 255);
  strokeJoin(ROUND);
  strokeWeight(5*(wh/500));
  fill(255, 255, 0);
  push();
  translate(x, y);
  rectMode(CENTER);
  rotate(v/(100)*(wh/500));
  rect(0, 0, 35*(wh/500), 35*(wh/500), 5*(wh/500), 5*(wh/500));
  pop();
  v += 0.2*(wh/500);
  y += v;
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }  
}

function mousePressed() {
  v = -4 * (wh/500);
}

class Pipe {
  constructor(i) {
    this.y = random(160, 240)*(wh/500);
    this.i = i;
    this.x = wh + this.i*(300*(wh/500));
  }
  show() {
    strokeWeight(5*(wh/500));
    fill(0, 255, 0);
    rectMode(CORNER);
    rect(this.x, this.y, 75*(wh/500), ht-this.y);
    rect(this.x-(5*(wh/500)), this.y, 75*(wh/500)+(10*(wh/500)), (45*(wh/500)));
    rect(this.x, 0, 75*(wh/500), (this.y-(110*(wh/500))));
    rect(this.x-(5*(wh/500)), (this.y-(110*(wh/500)))-(45*(wh/500)), 75*(wh/500)+(10*(wh/500)), (45*(wh/500)));
    this.x -= 2*(wh/500);
    if (this.x + (50*(wh/500)) < 0) {
      this.x = wh;
      this.y = random(160, 240)*(wh/500);
    }
  }
}