let objects = [];
let pattern = [];
let dropBoxes = [];
let bloxels = [];
let wait = 0;

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
}

function setup() {
  angleMode(DEGREES);
  textFont(fontt);
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 30);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  makePattern(3);
  for (let i = 0; i < 10; i++) {
    objects.push(new Block(pattern[int(i%pattern.length)], i));
  }
  dropBoxes = [];
  for (let i = 0; i < pattern.length; i++) {
    dropBoxes.push(new DropBox(pattern.length, i));
  }
}

function draw() {
  background(255, 219, 128);
  for (let i = 0; i < objects.length; i++) {
    objects[i].show();
  }
  fill(75);
  push();
  translate(50*(wh/500), -18*(wh/500));
  push();
  translate(0, 22*(wh/500));
  rect((wh/2) - 100*(wh/500), ht*(5/8), 200*(wh/500), 50*(wh/500));
  for (let i = 0; i < dropBoxes.length; i++) {
    dropBoxes[i].show();
  }
  pop();
  fill(200);
  rect(10*(wh/500), 155*(wh/500), 60*(wh/500), 138*(wh/500));
  m = 35*(wh/500);
  push();
  translate((-wh/4) - m, -ht/3.3);
  fill(200, 100, 0);
  rect(wh/2 - 65*(wh/500), ht*(7/8) + 35*(wh/500), 30*(wh/500), 30*(wh/500));
  fill(0, 200, 100);
  circle(wh/2 - 50*(wh/500), ht*(7/8) + 7*(wh/500), 30*(wh/500));
  fill(100, 0, 200);
  push();
  translate(wh/2 - 65*(wh/500), ht*(7/8) + 78*(wh/500));
  triangle(0, 30*(wh/500), 15*(wh/500), 0, 30*(wh/500), 30*(wh/500));
  pop();
  pop();
  pop();
  for (let i = 0; i < bloxels.length; i++) {
    bloxels[i].show();
  }
  if (bloxels.length > 0) {
    if (bloxels[bloxels.length-1].held == true) {
      if (mouseX > 339*(wh/731) && mouseY > 290*(wh/731) && mouseX < 391*(wh/731) && mouseY < 341*(wh/731) && dropBoxes[0].inside == -1) {
        dropBoxes[0].color = 1;
      } else {
        dropBoxes[0].color = 0;
      }
      if (mouseX > 412*(wh/731) && mouseY > 290*(wh/731) && mouseX < 464*(wh/731) && mouseY < 341*(wh/731) && dropBoxes[1].inside == -1) {
        dropBoxes[1].color = 1;
      } else {
        dropBoxes[1].color = 0;
      }
      if (mouseX > 485*(wh/731) && mouseY > 290*(wh/731) && mouseX < (464+73)*(wh/731) && mouseY < 341*(wh/731) && dropBoxes[2].inside == -1) {
        dropBoxes[2].color = 1;
      } else {
        dropBoxes[2].color = 0;
      }
    } else {
      dropBoxes[0].color = 0;
      dropBoxes[1].color = 0;
      dropBoxes[2].color = 0;
    }
  }
  textAlign(CENTER, CENTER);
  textSize(14*(wh/500));
  fill(0);
  strokeWeight(0.5*(wh/500));
  text("Place the shapes in the boxes to", 300*(wh/500), 130*(wh/500));
  text("make what comes next in the pattern", 300*(wh/500), 155*(wh/500));
  stroke(0);
  strokeWeight(3*(wh/500));
  if (mouseX > 205*(wh/500) && mouseX < 295*(wh/500) && mouseY > 252.5*(wh/500) && mouseY < 277.5*(wh/500)) {
    fill(255, 125, 75);
  } else {
    fill(250, 75, 25);
  }
  rect(205*(wh/500), 252.5*(wh/500), 90*(wh/500), 25*(wh/500));
  if (mouseX > 305*(wh/500) && mouseX < 395*(wh/500) && mouseY > 252.5*(wh/500) && mouseY < 277.5*(wh/500)) {
    fill(100, 250, 100);
  } else {
    fill(25, 250, 25);
  }
  rect(305*(wh/500), 252.5*(wh/500), 90*(wh/500), 25*(wh/500));
  fill(0);
  strokeWeight(0.5*(wh/500));
  text("Clear", 250*(wh/500), 265*(wh/500));
  text("Done", 350*(wh/500), 265*(wh/500));
  if (wait > 0) {
    strokeWeight(5*(wh/500));
    fill(0, 255, 0);
    rectMode(CENTER);
    rect(wh/2, ht/2, 300*(wh/500), 100*(wh/500));
    textSize(30*(wh/500));
    fill(0);
    strokeWeight(1*(wh/500));
    text("Correct", 250*(wh/500), 150*(wh/500));
    rectMode(CORNER);
    wait--;
    if (wait == 1) {
      bloxels = [];
      for (let i = 0; i < pattern.length; i++) {
        dropBoxes[i].inside = -1;
      }
      objects = [];
    makePattern(3);
    for (let i = 0; i < 10; i++) {
      objects.push(new Block(pattern[int(i%pattern.length)], i));
    }
    }
  }
  if (wait < 0) {
    strokeWeight(5*(wh/500));
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(wh/2, ht/2, 300*(wh/500), 100*(wh/500));
    textSize(30*(wh/500));
    fill(0);
    strokeWeight(1*(wh/500));
    text("Wrong", 250*(wh/500), 150*(wh/500));
    rectMode(CORNER);
    wait++;
  }
}

class Block {
  constructor(t, i) {
    this.type = t;
    this.i = i;
  }
  show() {
    stroke(0);
    strokeWeight(3*(wh/500));
    strokeJoin(ROUND);
    push();
    translate(0, -40*(wh/500));
    if (this.type == 0) {
      fill(200, 100, 0);
      rect((this.i*(40*(wh/500)))+50*(wh/500), ht/2 - (50*(wh/500)), 30*(wh/500), 30*(wh/500));
    }
    if (this.type == 1) {
      fill(0, 200, 100);
      circle((this.i*(40*(wh/500)))+50*(wh/500) + 15*(wh/500), ht/2 - (50*(wh/500)) + 15*(wh/500), 30*(wh/500));
    }
    if (this.type == 2) {
      fill(100, 0, 200);
      triangle((this.i*(40*(wh/500)))+50*(wh/500), ht/2 - (50*(wh/500)) + 30*(wh/500), (this.i*(40*(wh/500)))+50*(wh/500) + 15*(wh/500), ht/2 - (50*(wh/500)), (this.i*(40*(wh/500)))+50*(wh/500) + 30*(wh/500), ht/2 - (50*(wh/500)) + 30*(wh/500));
    }
    pop();
  }
}

class Bloxel {
  constructor(t) {
    this.x = mouseX;
    this.y = mouseY;
    this.held = true;
    this.type = t;
  }
  show() {
    stroke(0);
    strokeWeight(3*(wh/500));
    strokeJoin(ROUND);
    push();
    if (this.held == true) {
      this.x = mouseX;
      this.y = mouseY;
    }
    translate(this.x, this.y);
    if (this.type == 0) {
      fill(200, 100, 0);
      push();
      translate(-15*(wh/500), -15*(wh/500));
      rect(0, 0, 30*(wh/500));
      pop();
    }
    if (this.type == 1) {
      fill(0, 200, 100);
      circle(0, 0, 30*(wh/500));
    }
    if (this.type == 2) {
      fill(100, 0, 200);
      push();
      translate(-15*(wh/500), -15*(wh/500));
      triangle(0, 30*(wh/500), 15*(wh/500), 0, 30*(wh/500), 30*(wh/500))- (50*(wh/500)) + 30*(wh/500);
      pop();
    }
    pop();
  }
}

function makePattern(l) {
  do {
    pattern = [];
    for (let i = 0; i < l; i++) {
      pattern.push(int(random(3)));
    }
  } while (pattern.every( (val, i, arr) => val === arr[0] ));
}

class DropBox {
  constructor(total, i) {
    this.total = total;
    this.i = i;
    this.x = ((150*(wh/500))/this.total)*this.i + (wh/2) - 100*(wh/500) + 25*(wh/500) + 7*(wh/500);
    this.y = ht*(5/8) + (50*(wh/500)-(((150*(wh/500))/this.total) - 14*(wh/500)))/2;
    this.inside = -1;
    this.color = 0;
  }
  show() {
    if (this.color == 0) {
      fill(100);
    } else {
      fill(150, 100, 0);
    }
    noStroke();
    rect(this.x, this.y, ((150*(wh/500))/this.total) - 14*(wh/500), ((150*(wh/500))/this.total) - 14*(wh/500));
    stroke(0);
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
  if (mouseX > 243*(wh/1117)-m && mouseY > 420*(wh/1117) && mouseX < 314*(wh/1117)-m && mouseY < 489*(wh/1117)) {
    bloxels.push(new Bloxel(0));
  }
  if (dist(183*(wh/731)-m, 236*(wh/731), mouseX, mouseY) < 17*(wh/500)) {
    bloxels.push(new Bloxel(1));
  }
  if (mouseX > 163*(wh/731)-m && mouseY > 345*(wh/731) && mouseX < 197*(wh/731)-m && mouseY < 382*(wh/731)) {
    bloxels.push(new Bloxel(2));
  }
  if (mouseX > 205*(wh/500) && mouseX < 295*(wh/500) && mouseY > 252.5*(wh/500) && mouseY < 277.5*(wh/500)) {
    bloxels = [];
    for (let i = 0; i < pattern.length; i++) {
      dropBoxes[i].inside = -1;
    }
  }
  if (mouseX > 305*(wh/500) && mouseX < 395*(wh/500) && mouseY > 252.5*(wh/500) && mouseY < 277.5*(wh/500)) {
    if (dropBoxes[2].inside == pattern[0] && dropBoxes[0].inside == pattern[1] && dropBoxes[1].inside == pattern[2]) {
      console.log("correct!");
      wait = 105;
    } else {
      wait = -75;
    }
  }
  return false;
}

function mouseReleased() {
  if (bloxels.length > 0) {
    if (bloxels[bloxels.length-1].held == true) {
      bloxels[bloxels.length-1].held = false;
      if (mouseX > 339*(wh/731) && mouseY > 290*(wh/731) && mouseX < 391*(wh/731) && mouseY < 341*(wh/731) && dropBoxes[0].inside == -1) {
        bloxels[bloxels.length-1].x = 365*(wh/731);
        bloxels[bloxels.length-1].y = 316.5*(wh/731);
        dropBoxes[0].inside = bloxels[bloxels.length-1].type;
      } else 
      if (mouseX > 412*(wh/731) && mouseY > 290*(wh/731) && mouseX < 464*(wh/731) && mouseY < 341*(wh/731) && dropBoxes[1].inside == -1) {
        bloxels[bloxels.length-1].x = (365+73)*(wh/731);
        bloxels[bloxels.length-1].y = 316.5*(wh/731);
        dropBoxes[1].inside = bloxels[bloxels.length-1].type;
      } else 
      if (mouseX > 485*(wh/731) && mouseY > 290*(wh/731) && mouseX < (464+73)*(wh/731) && mouseY < 341*(wh/731) && dropBoxes[2].inside == -1) {
        bloxels[bloxels.length-1].x = (365+73+73)*(wh/731);
        bloxels[bloxels.length-1].y = 316.5*(wh/731);
        dropBoxes[2].inside = bloxels[bloxels.length-1].type;
      } else {
        bloxels.pop();
      }
    }
  }
}