let x;
let y;
let stage = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2 + 65;
  y = height*(12.3/16);
}

function preload() {
  plankton = loadImage("plankton.png");
  evil = loadImage("evilplankton.png");
  sad = loadImage("sadplankton.png");
}

function draw() {
  background(255);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Be my Valentine?", width/2, height*(3/16));
  imageMode(CENTER, CENTER);
  if (stage == 0) {
    image(plankton, width/2, height*(7.8/16), plankton.width*0.8, plankton.height*0.7);
  } else if (stage == 1) {
    image(evil, width/2, height*(7.5/16), evil.width*0.45, evil.height*0.45);
  } else {
    image(sad, width/2, height*(7.5/16), sad.width*0.45, sad.height*0.45);
  }
  rectMode(CENTER);
  if (isMouseOnGreen()) {
    fill(50, 250, 50);
  } else {
    fill(50, 200, 50);
  }
  strokeWeight(8);
  rect(width/2 - 65, height*(12.3/16), 100, 60, 8, 8);
  if (isMouseOnRed()) {
    fill(250, 50, 50);
  } else {
    fill(200, 50, 50);
  }
  rect(x, y, 100, 60, 8, 8);
  fill(0);
  textSize(35);
  text("YES", width/2 - 65, height*(12.3/16));
  textSize(20);
  text("no", x, y);
}

function isMouseOnGreen() {
  if (mouseX > width/2 - 65 - 50 && mouseX < width/2 - 65 + 50 && mouseY > height*(12.3/16) - 30 && mouseY < height*(12.3/16) + 30) {
    return true;
  } else {
    return false;
  }
}

function isMouseOnRed() {
  if (mouseX > x - 50 && mouseX < x + 50 && mouseY > y - 30 && mouseY < y + 30) {
    return true;
  } else {
    return false;
  }
}

function mousePressed() {
  if (isMouseOnRed()) {
    x = random(150, width-150);
    y = random(525, height - 50);
    while (x > width/2 - 65 - 100 && x < width/2 - 65 + 100 && y > height*(12.3/16) - 60 && y < height*(12.3/16) + 60) {
      x = random(150, width-150);
      y = random(525, height - 50);
    }
    stage = 2;
  } else if (isMouseOnGreen()) {
    stage = 1;
  }
}