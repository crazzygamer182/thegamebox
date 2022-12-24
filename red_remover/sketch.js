let passed = false;
let passing = false;
let font;
let level = 0;
let levels = [];
let les = [];
let scaredface;
let mfaces = [];
let hfaces = [];
let nfaces = [];
let bolt;

function preload() {
  font = loadFont("FredokaOne.ttf");
  mfaces.push(loadImage("madface.png"));
  mfaces.push(loadImage("m2.png"));
  mfaces.push(loadImage("m3.png"));
  mfaces.push(loadImage("m4.png"));
  hfaces.push(loadImage("happyface.png"));
  hfaces.push(loadImage("h2.png"));
  hfaces.push(loadImage("h3.png"));
  hfaces.push(loadImage("h4.png"));
  hfaces.push(loadImage("h5.png"));
  scaredface = loadImage("scaredface.png");
  for (let i = 1; i < 13; i++) {
    nfaces.push(loadImage("n" + i + ".png"));
  }
  bolt = loadImage("scaredface.png");
}

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
  nextLevel(false);
  textFont(font);
  textAlign(CENTER, CENTER);
  levels.push("u");
  for (let i = 1; i < 21; i++) {
    levels.push("u");
  }
}

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function draw() {
  background(200, 230, 255);
  passed = true;
  if (checkIfStill()) {
    for (let i = 0; i < les.length; i++) {
      if (les[i].type == "sr" || les[i].type == "r" || les[i].type == "dr") {
        if (les[i].sprite.y < 300 && les[i].sprite.y > 0 && les[i].sprite.x < 500 && les[i].sprite.x > 0) {
          passed = false;
        }
      } else if (les[i].type == "g" || les[i].type == "dg") {
        if (les[i].sprite.y > 400 || les[i].sprite.y < -100 || les[i].sprite.x > 600 || les[i].sprite.x < -100) {
          passed = false;
          nextLevel(false);
        }
      }
    }
    if (passed == true) {
      passing = true;
      resetLevel();
      levels[level] = "u";
      levels[level - 1] = "d";
    }
  }
  camera.x = 250;
  camera.y = 150;
  if (passing) {
    push();
    scale(wh / 500);
    fill(243, 224, 207);
    rect(50, 50, 400, 200);
    fill(0);
    textSize(35);
    text("Level Passed!", 250, 100);
    if (
      mouseX > 125 * (wh / 500) &&
      mouseX < 245 * (wh / 500) &&
      mouseY > 150 * (wh / 500) &&
      mouseY < 200 * (wh / 500)
    ) {
      fill(213, 194, 177);
    } else {
      fill(253, 244, 227);
    }
    rect(125, 150, 120, 50);
    if (
      mouseX > 255 * (wh / 500) &&
      mouseX < 375 * (wh / 500) &&
      mouseY > 150 * (wh / 500) &&
      mouseY < 200 * (wh / 500)
    ) {
      fill(213, 194, 177);
    } else {
      fill(253, 244, 227);
    }
    rect(255, 150, 120, 50);
    textSize(20);
    fill(0);
    let move = 65;
    text("All levels", 183.5, 172);
    text("Next level", 314, 172);
    pop();
  } else if (level == 0) {
    push();
    scale(wh / 500);
    fill(243, 224, 207);
    rect(0, 0, 500, 300);
    fill(0);
    textSize(40);
    text("Red Remover", 250, 48);
    fill(232, 59, 46);
    text("Red", 160.1, 48);
    strokeWeight(4);
    stroke(50, 50, 0);
    drawLevels();
    pop();
  } else if (level == 1) {
    push();
    scale(wh / 500);
    fill(0);
    textSize(18);
    text("Red shapes are miserable", 250, 35);
    textSize(16);
    text("Remove them all by clicking on them", 250, 70);
    pop();
  } else if (level == 2) {
    push();
    scale(wh / 500);
    fill(0);
    textSize(16);
    text("Dark red shapes are strong - you cant click them", 250, 35);
    textSize(17);
    text("Make them fall off the screen instead", 250, 70);
    pop();
  } else if (level == 3) {
    push();
    scale(wh / 500);
    fill(0);
    textSize(16);
    text("Green shapes are lovely!", 250, 35);
    textSize(17);
    text("Keep them on the screen", 250, 70);
    pop();
  } else if (level == 6) {
    push();
    scale(wh / 500);
    fill(0);
    textSize(17);
    text("Blue shapes are neutral", 250, 35);
    textSize(16);
    text("It doesn't matter if they stay or go", 250, 70);
    pop();
  } else if (level == 12) {
    push();
    scale(wh / 500);
    fill(0);
    textSize(17);
    text("There are 4 planes of gravity!", 250, 35);
    textSize(16);
    text("Look at the shapes faces to see which way they will fall", 250, 70);
    pop();
  }
  if (level == 2) {
    camera.zoom = wh / 700;
    camera.y = 110;
  } else if (level == 11) {
    camera.zoom = wh / 625;
    camera.y = 150;
  } else if (level == 12) { 
    camera.y = 120;
  } else {
    camera.zoom = wh / 550;
    camera.y = 150;
  }
  if (passing == false && level > 0) {
    push();
    scale(wh / 500);
    fill(255);
    if (level > 2) {
      rect(-5, 280, 70, 40, 5, 5);
      fill(0);
      textSize(15);
      text("Reset", 32, 288.5);
    }
    fill(255);
    rect(445, 280, 70, 40, 5, 5);
    fill(0);
    textSize(15);
    text("Exit", 473, 288.5);
    pop();
  }
}

function mousePressed() {
  if (passing) {
    if (
      mouseX > 125 * (wh / 500) &&
      mouseX < 245 * (wh / 500) &&
      mouseY > 150 * (wh / 500) &&
      mouseY < 200 * (wh / 500)
    ) {
      level = 0;
    }
    rect(125, 150, 120, 50);
    if (
      mouseX > 255 * (wh / 500) &&
      mouseX < 375 * (wh / 500) &&
      mouseY > 150 * (wh / 500) &&
      mouseY < 200 * (wh / 500)
    ) {
      nextLevel(true);
    }
    passing = false;
  } else if (level > 0) {
    for (let i = les.length - 1; i > -1; i--) {
      if (
        les[i].sprite.mouse.pressing() &&
        (les[i].type == "sr" ||
          les[i].type == "sb" ||
          les[i].type == "r" ||
          les[i].type == "b")
      ) {
        allSprites[i].remove();
        les.splice(i, 1);
      }
    }
    if (
      level > 2 &&
      mouseX > 0 &&
      mouseX < 65 * (wh / 500) &&
      mouseY > 280 * (wh / 500) &&
      mouseY < 300 * (wh / 500)
    ) {
      nextLevel(false);
    } else if (
      mouseX > 473 &&
      mouseX < 500 * (wh / 500) &&
      mouseY > 280 * (wh / 500) &&
      mouseY < 300 * (wh / 500)
    ) {
      level = 0;
      resetLevel();
    }
  } else if (level == 0) {
    levelSelect();
  }
}

class Block {
  constructor(type, x, y, w, h, gravity, shape) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = null;
    if (shape == null) {
      this.shape = "r";
    } else {
      this.shape = shape;
    }
    if (gravity == null) {
      this.gravity = 1;
    } else {
      this.gravity = gravity;
    }
    if (type == "sr") {
      this.color = color(255, 135, 135);
      this.collider = "kinematic";
    } else if (type == "r") {
      this.color = color(255, 100, 100);
    } else if (type == "dr") {
      this.color = color(225, 10, 10);
    } else if (type == "g") {
      this.color = color(125, 255, 125);
    } else if (type == "sg") {
      this.collider = "kinematic";
      this.color = color(200, 255, 200);
    } else if (type == "b") {
      this.color = color(150, 150, 255);
    } else if (type == "sb") {
      this.color = color(200, 200, 255);
      this.collider = "kinematic";
    }
    if (this.shape == "r") {
      this.sprite = new Sprite(this.x, this.y, this.w, this.h, this.collider);
    } else {
      this.sprite = new Sprite(this.x, this.y, this.w, this.collider);
    }
    this.sprite.color = this.color;
    this.sprite.draw = () => {
      if (this.shape == "r") {
        if (this.h == null) {
          circle(0, 0, this.sprite.w, this.sprite.h);
        } else {
          rect(0, 0, this.sprite.w, this.sprite.h);
        }
      } else {
        circle(0, 0, this.sprite.w, this.sprite.h);
      }
      if (this.type == "sr" || this.type == "sg" || this.type == "sb") {
        fill(100);
        circle(0-this.sprite.w/2 + 4, 0-this.sprite.height/2 + 4, 3, 3);
        circle(0+this.sprite.w/2 - 4, 0-this.sprite.height/2 + 4, 3, 3);
        circle(0-this.sprite.w/2 + 4, 0+this.sprite.height/2 - 4, 3, 3);
        circle(0+this.sprite.w/2 - 4, 0+this.sprite.height/2 - 4, 3, 3);
      } else {
        push();
        rotate(-this.sprite.rotation);
        rotate(90 * (this.gravity - 1));
        if (type == "r" || type == "dr") {
          if (int(random(300)) == 0 || this.image == null) {
              this.image = mfaces[int(random(mfaces.length))];
          }
          if (abs(this.sprite.vel.y) > 1 || abs(this.sprite.vel.x) > 1 ) {
            image(hfaces[0], 0, 0, hfaces[0].width / 18, hfaces[0].height / 18);
            this.image = mfaces[int(random(mfaces.length))];
          } else {
            image(this.image, 0, 0, this.image.width / 18, this.image.height / 18);
          }
        } else if (type == "g") {
          if (int(random(300)) == 0 || this.image == null) {
              this.image = hfaces[int(random(hfaces.length))];
          }
          if (abs(this.sprite.vel.y) > 1 || abs(this.sprite.vel.x) > 1 ) {
            image(scaredface, 0, 0, scaredface.width / 18, scaredface.height / 18);
            this.image = hfaces[int(random(hfaces.length))];
          } else {
            image(this.image, 0, 0, this.image.width / 18, this.image.height / 18);
          }
        } else if (this.type == "b") {
          if (int(random(300)) == 0 || this.image == null) {
              this.image = nfaces[int(random(nfaces.length))];
          }
            image(this.image, 0, 0, this.image.width / 18, this.image.height / 18);
        }
        pop();
      }
      if (this.gravity == 1) {
        this.sprite.applyForce({ x: 0, y: 9.8 });
      } else if (this.gravity == 2) {
        this.sprite.applyForce({ x: -9.8, y: 0 });
      } else if (this.gravity == 3) {
        this.sprite.applyForce({ x: 0, y: -9.8 });
      } else if (this.gravity == 4) {
        this.sprite.applyForce({ x: 9.8, y: 0 });
      }
      if (this.sprite.y > 900) {
        this.sprite.y = 400;
      }
      if (this.sprite.y < -900) {
        this.sprite.y = -100;
      }
      if (this.sprite.x > 900) {
        this.sprite.x = 600;
      }
      if (this.sprite.x < -900) {
        this.sprite.x = -100;
      }
    };
  }
}

function nextLevel(won) {
  passed = false;
  resetLevel();
  if (won) {
    level++;
  }
  if (level == 1) {
    les.push(new Block("sr", 250, 250, 100, 25));
    les.push(new Block("sr", 425, 200, 50, 50));
    les.push(new Block("sr", 75, 200, 50, 50));
    les.push(new Block("r", 250, 100, 40, 40));
    les.push(new Block("r", 270, 140, 40, 40));
    les.push(new Block("r", 230, 140, 40, 40));
    les.push(new Block("r", 210, 180, 40, 40));
    les.push(new Block("r", 290, 180, 40, 40));
    les.push(new Block("r", 250, 180, 40, 40));
  } else if (level == 2) {
    les.push(new Block("sr", 250, 250, 80, 25));
    les.push(new Block("sr", 100, 250, 40, 25));
    les.push(new Block("sr", 400, 250, 40, 25));
    les.push(new Block("dr", 100, 215, 40, 40));
    les.push(new Block("dr", 400, 215, 40, 40));
    les.push(new Block("dr", 230, 215, 40, 40));
    les.push(new Block("dr", 270, 215, 40, 40));
    les.push(new Block("dr", 120, 175, 40, 40));
    les.push(new Block("dr", 380, 175, 40, 40));
    les.push(new Block("dr", 210, 175, 40, 40));
    les.push(new Block("dr", 290, 175, 40, 40));
    les.push(new Block("dr", 310, 135, 40, 40));
    les.push(new Block("dr", 190, 135, 40, 40));
    les.push(new Block("dr", 150, 135, 40, 40));
    les.push(new Block("dr", 350, 135, 40, 40));
    les.push(new Block("dr", 170, 95, 40, 40));
    les.push(new Block("dr", 330, 95, 40, 40));
  } else if (level == 3) {
    les.push(new Block("sg", 250, 250, 200, 25));
    les.push(new Block("r", 250, 210, 70, 40));
    les.push(new Block("r", 160, 210, 70, 40));
    les.push(new Block("r", 340, 210, 70, 40));
    les.push(new Block("g", 205, 170, 70, 40));
    les.push(new Block("g", 295, 170, 70, 40));
  } else if (level == 4) {
    les.push(new Block("sr", 150, 250, 80, 25));
    les.push(new Block("r", 125, 215, 40, 40));
    les.push(new Block("r", 175, 215, 40, 40));
    les.push(new Block("r", 150, 175, 40, 40));
    les.push(new Block("r", 150, 135, 40, 40));
    les.push(new Block("r", 150, 95, 40, 40));
    les.push(new Block("g", 150, 55, 40, 40));
    les.push(new Block("sg", 350, 250, 80, 25));
    les.push(new Block("sg", 410, 190, 25, 80));
  } else if (level == 5) {
    les.push(new Block("sg", 375, 250, 120, 25));
    les.push(new Block("sr", 280, 250, 40, 25));
    les.push(new Block("sr", 85, 250, 40, 25));
    les.push(new Block("r", 85, 216, 40, 40));
    les.push(new Block("r", 280, 216, 40, 40));
    les.push(new Block("r", 85, 176, 40, 40));
    les.push(new Block("r", 280, 176, 40, 40));
    les.push(new Block("r", 85, 136, 40, 40));
    les.push(new Block("r", 280, 136, 40, 40));
    les.push(new Block("r", 183, 102, 235, 25));
    les.push(new Block("sr", 183, 70, 40, 20));
    les.push(new Block("g", 183, 35, 40, 40));
  } else if (level == 6) {
    les.push(new Block("sb", 135, 250, 25, 25));
    les.push(new Block("sb", 250, 250, 25, 25));
    les.push(new Block("sb", 365, 250, 25, 25));
    les.push(new Block("b", 190, 215, 120, 40));
    les.push(new Block("b", 310, 215, 120, 40));
    les.push(new Block("g", 310, 130, 40, 40));
    les.push(new Block("g", 330, 170, 40, 40));
    les.push(new Block("g", 290, 170, 40, 40));
    les.push(new Block("r", 190, 130, 40, 40));
    les.push(new Block("r", 210, 170, 40, 40));
    les.push(new Block("r", 170, 170, 40, 40));
  } else if (level == 7) {
    les.push(new Block("sb", 185, 250, 25, 25));
    les.push(new Block("sb", 315, 250, 25, 25));
    les.push(new Block("sb", 115, 250, 25, 25));
    les.push(new Block("sb", 385, 250, 25, 25));
    les.push(new Block("b", 350, 225, 100, 25));
    les.push(new Block("b", 150, 225, 100, 25));
    les.push(new Block("b", 250, 200, 125, 25));
    les.push(new Block("dr", 250, 125, 40, 40));
    les.push(new Block("dr", 230, 165, 40, 40));
    les.push(new Block("dr", 270, 165, 40, 40));
    les.push(new Block("r", 150, 190, 40, 40));
    les.push(new Block("r", 350, 190, 40, 40));
    les.push(new Block("g", 150, 150, 40, 40));
    les.push(new Block("g", 350, 150, 40, 40));
  } else if (level == 8) {
    les.push(new Block("sb", 130, 160, 100, 20));
    les[0].sprite.rotation = 10;
    les.push(new Block("sb", 233, 169, 100, 20));
    les.push(new Block("sb", 335, 169, 100, 20));
    les.push(new Block("sb", 335, 89, 40, 20));
    les.push(new Block("b", 335, 56, 40, 40));
    les.push(new Block("g", 100, 60, 30));
  } else if (level == 9) {
    les.push(new Block("sb", 150, 250, 35, 15));
    les.push(new Block("sb", 350, 250, 35, 15));
    les.push(new Block("b", 150, 223, 35, 35));
    les.push(new Block("b", 350, 223, 35, 35));
    les.push(new Block("b", 250, 195, 250, 20));
    les.push(new Block("g", 150, 165, 35, 35));
    les.push(new Block("g", 350, 165, 35, 35));
    les.push(new Block("b", 250, 165, 35, 35));
    les.push(new Block("b", 170, 135, 160, 20));
    les.push(new Block("b", 330, 135, 160, 20));
    les.push(new Block("dr", 150, 105, 35, 35));
    les.push(new Block("dr", 350, 105, 35, 35));
    les.push(new Block("sb", 250, 85, 35, 20));
    les.push(new Block("dr", 250, 55, 35, 35));
  } else if (level == 10) {
    les.push(new Block("sb", 425, 250, 35, 35));
    les.push(new Block("sb", 300, 250, 35, 35));
    les.push(new Block("sb", 100, 195, 35, 35));
    les.push(new Block("b", 362.5, 222.5, 160, 20));
    les.push(new Block("b", 340, 190, 35, 35));
    les.push(new Block("dr", 385, 190, 35, 35));
    les.push(new Block("b", 220, 160, 275, 20));
    les.push(new Block("g", 300, 135, 35, 35));
    les.push(new Block("g", 100, 135, 35, 35));
    les.push(new Block("dr", 147, 135, 35, 35));
    les.push(new Block("b", 100, 105, 105, 20));
    les.push(new Block("g", 100, 75, 35, 35));
    les.push(new Block("g", 65, 75, 35, 35));
    les.push(new Block("g", 135, 75, 35, 35));
  } else if (level == 11) {
    les.push(new Block("sb", 250, 150, 35, 35));
    les.push(new Block("dr", 285, 150, 35, 35, 2));
    les.push(new Block("dr", 320, 150, 35, 35, 2));
    les.push(new Block("dr", 355, 150, 35, 35, 2));
    les.push(new Block("dr", 390, 150, 35, 35, 2));
    les.push(new Block("dr", 250, 115, 35, 35, 1));
    les.push(new Block("dr", 250, 80, 35, 35, 1));
    les.push(new Block("dr", 250, 45, 35, 35, 1));
    les.push(new Block("dr", 250, 10, 35, 35, 1));
    les.push(new Block("dr", 215, 150, 35, 35, 4));
    les.push(new Block("dr", 180, 150, 35, 35, 4));
    les.push(new Block("dr", 145, 150, 35, 35, 4));
    les.push(new Block("dr", 110, 150, 35, 35, 4));
    les.push(new Block("dr", 250, 185, 35, 35, 3));
    les.push(new Block("dr", 250, 220, 35, 35, 3));
    les.push(new Block("dr", 250, 255, 35, 35, 3));
    les.push(new Block("dr", 250, 290, 35, 35, 3));
  } else if (level == 12) {
    les.push(new Block("g", 250, 150, 35, 35, 2));
    les.push(new Block("sb", 286, 150, 35, 35));
    les.push(new Block("sb", 214, 150, 35, 35));
    les.push(new Block("sb", 250, 186, 35, 35));
    les.push(new Block("sb", 250, 114, 35, 35));
    les.push(new Block("dr", 286, 114, 35, 35));
    les.push(new Block("dr", 214, 114, 35, 35, 4));
    les.push(new Block("dr", 286, 186, 35, 35, 3));
    les.push(new Block("dr", 214, 186, 35, 35, 4));
  } else if (level == 13) {
    les.push(new Block("sg", 215, 270, 30, 30));
    les.push(new Block("dr", 215, 229, 50, 50));
    les.push(new Block("dr", 215, 178, 50, 50));
    les.push(new Block("dr", 215, 127, 50, 50));
    les.push(new Block("sb", 325, 175, 20, 215));
    les[4].sprite.rotation = 5;
    les.push(new Block("b", 425, 100, 30, 30, 2, "c"));
  } else if (level == 14) {
    les.push(new Block("sb", 360, 150, 20, 200));
    les.push(new Block("sb", 140, 150, 20, 200));
    les.push(new Block("sb", 250, 40, 200, 20));
    les.push(new Block("sb", 250, 260, 200, 20));
    les.push(new Block("dr", 222, 200, 30, 30, 3, "c"));
    les.push(new Block("dr", 272, 200, 30, 30, 3, "c"));
    les.push(new Block("dr", 172, 200, 30, 30, 3, "c"));
    les.push(new Block("dr", 322, 200, 30, 30, 3, "c"));
    les.push(new Block("g", 228, 100, 30));
    les.push(new Block("g", 278, 100, 30));
    les.push(new Block("g", 178, 100, 30));
    les.push(new Block("g", 328, 100, 30));
    les.push(new Block("b", 225, 150, 30));
    les.push(new Block("b", 275, 150, 30));
    les.push(new Block("b", 175, 150, 30));
    les.push(new Block("b", 325, 150, 30));
  } else if (level == 15) {
    les.push(new Block("sg", 250, 250, 350, 40));
    les.push(new Block("g", 450, 150, 35, 35, 2));
    les.push(new Block("g", 50, 150, 35, 35, 4));
    les.push(new Block("sr", 250, 150, 360, 20));
    les.push(new Block("sr", 250, 50, 200, 20));
    les.push(new Block("g", 250, 20, 200, 35));
  } else if (level == 16) {
    les.push(new Block("sb", 50, 250, 40, 40));
    les.push(new Block("g", 50, 210, 40, 40));
    les.push(new Block("sb", 210, 210, 40, 40));
    les.push(new Block("r", 253, 210, 40, 40, 2));
    les.push(new Block("sb", 255, 100, 40, 40));
    les.push(new Block("b", 255, 57, 40, 40));
    les.push(new Block("b", 212, 100, 40, 40, 4));
  } else if (level == 17) {
    
  }
}

function resetLevel() {
  for (let i = allSprites.length - 1; i > -1; i--) {
    allSprites[i].remove();
  }
  les = [];
}

function checkIfStill() {
  if (level == 0) {
    return false;
  }
  for (let i = 0; i < allSprites.length; i++) {
    if (allSprites[i].sleeping == true && allSprites[i].y < 600 && allSprites[i].y > -300 && allSprites[i].x < 800 && allSprites[i].x > -300) {
      return false;
    }
  }
  return true;
}

function levelSelect() {
  for (let j = 1; j < 4; j++) {
    for (let i = 1; i < 8; i++) {
      if (
        mouseX > (60 * i - 10) * (wh / 500) &&
        mouseX < (60 * i + 30) * (wh / 500) &&
        mouseY > (60 * j + 36) * (wh / 500) &&
        mouseY < (60 * j + 76) * (wh / 500) &&
        levels[i + (j - 1) * 7 - 1] != "l"
      ) {
        goToLevel(i + (j - 1) * 7);
        break;
      }
    }
  }
}

function goToLevel(l) {
  level = l;
  nextLevel(false);
}

function drawLevels() {
  for (let j = 1; j < 4; j++) {
    for (let i = 1; i < 8; i++) {
      if (
        mouseX > (60 * i - 10) * (wh / 500) &&
        mouseX < (60 * i + 30) * (wh / 500) &&
        mouseY > (60 * j + 36) * (wh / 500) &&
        mouseY < (60 * j + 76) * (wh / 500)
      ) {
        fill(234, 173, 76);
      } else {
        fill(214, 153, 56);
      }
      rect(60 * i - 10, 60 * j + 36, 40, 40, 10, 10);
      rectMode(CENTER);
      rect(60 * i - 10, 60 * j + 38, 25, 25, 11, 11);
      rectMode(CORNER);
      if (levels[i + (j - 1) * 7 - 1] == "l") {
        stroke(75);
        strokeWeight(2.5);
        if (
          mouseX > (60 * i - 10) * (wh / 500) &&
          mouseX < (60 * i + 30) * (wh / 500) &&
          mouseY > (60 * j + 36) * (wh / 500) &&
          mouseY < (60 * j + 76) * (wh / 500)
        ) {
          fill(234, 173, 76);
        } else {
          fill(214, 153, 56);
        }
        ellipse(60 * i + 10.5, 60 * j + 52, 9, 11);
        noStroke();
        fill(75);
        rect(60 * i + 3.75, 60 * j + 52, 14, 14, 2, 2);
      } else if (
        levels[i + (j - 1) * 7 - 1] == "u" ||
        levels[i + (j - 1) * 7 - 1] == "d"
      ) {
        push();
        fill(100, 200, 100);
        strokeJoin(ROUND);
        translate(i * 60 + 6, j * 60 + 47);
        scale(0.5, 0.5);
        triangle(0, 0, 25, 20, 0, 35);
        strokeJoin(CORNER);
        pop();
      }
      strokeWeight(4);
      fill(0);
      noStroke();
      textSize(15);
      text(i + (j - 1) * 7, 60 * i - 10, 60 * j + 36);
      stroke(50, 50, 0);
    }
  }
}
