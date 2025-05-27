let enemies = [];
let towers = [];
let wave = 0;
let create = 0;
let message = false;
let count = 4;
let goods = 4;
let bads = [];
let placing;
let upgradedTowerImages = [];
let upgradedTurretImages = [];
let towerplacing;
let towerplacingbad;
let gcount = 4;
let gameStart = false;
let num1 = 0;
let num2 = 0;
let options = [];
let right = 0;
let score = 0;
let subject = "";
let level = 0
let dead = false;
let base;
let finalScore;
let wh, ht;

function setup() {
  textFont(fontt);
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  preset();
  cnv = createCanvas(wh, ht);
  centerCanvas();
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
  base = loadImage("base.png");
  back = loadImage("background.png");
  for (let i = 0; i < 4; i++) {
    upgradedTowerImages.push(loadImage("tower (" + (i + 2) + ").png"));
    upgradedTurretImages.push(loadImage("turret (" + (i + 2) + ").png"));
  }
  tower1 = loadImage("tower.png");
  turret1 = loadImage("turret.png");
  towerplacing = loadImage("towerplacing.png");
  towerplacingbad = loadImage("towerplacingbad.png");
}

function preset() {
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  createSprite(130, 175, 70, 70);
  fixSubject("+", 0, 5);
  createSprite(210, 175, 70, 70);
  fixSubject("-", 0, -1);
  createSprite(290, 175, 70, 70);
  fixSubject("x", 0, 0);
  createSprite(370, 175, 70, 70);
  fixSubject("÷", 0, 5);
}

function fixSubject(t, x, y, size) {
  allSprites[allSprites.length - 1].draw = () => {
    let z = allSprites[allSprites.length - 1];
    fill(125);
    rect(0, 0, z.width, z.height);
    fill(0);
    if (size == null) {
      textSize(70);
    } else {
      textSize(size);
    }
    text(t, x, y-10);
  };
}

function fixLevel(t1, t, x, y, size) {
  allSprites[allSprites.length - 1].draw = () => {
    let z = allSprites[allSprites.length - 1];
    fill(125);
    rect(0, 0, z.width, z.height);
    fill(0);
    textSize(10);
    text(t1, x, y - 20);
    if (size == null) {
      textSize(40);
    } else {
      textSize(size);
    }
    text(t, x, y + 8);
  };
}

function next() {
  allSprites.remove();
  gameStart = "wait";
  createSprite(170, 175, 70, 70);
  fixLevel("One Digit", "3", 0, 0);
  createSprite(250, 175, 70, 70);
  fixLevel("Two Digits", "48", 0, 0, 35);
  createSprite(330, 175, 70, 70);
  fixLevel("Three Digits", "217", 0, 0, 30);
}

function start() {
  allSprites.remove();
  gameStart = true;
  createSprite(192, 89, 237, 23, "static");
  createSprite(227, 31, 236, 10, "static");
  createSprite(335, 153, 210, 25, "static");
  createSprite(359, 83, 25, 113, "static");
  createSprite(182, 152, 25, 102, "static");
  createSprite(287, 217.25, 235, 28.5, "static");
  createSprite(453, 186, 25, 91, "static");
  createSprite(61, 45, 25, 110, "static");
  createSprite(122, 13, 25, 25, "static");
  bads.push(createSprite(209, 57, 272, 39, "static"));
  bads.push(createSprite(91, 20, 35, 113, "static"));
  bads.push(createSprite(328, 108, 35, 63, "static"));
  bads.push(createSprite(269, 120, 150, 38, "static"));
  bads.push(createSprite(318, 184, 245, 37, "static"));
  bads.push(createSprite(213, 148, 35, 63, "static"));
  bads.push(createSprite(423, 200, 35, 63, "static"));
  for (let i of allSprites) {
    i.draw = () => {};
  }
  towers.push(new Tower(100, 118, 2));
  makeQuestion();
}

function makeOptions() {
  for (let i of options) {
    i.sprite.remove();
  }
  options = [];
  let choice = int(random(1, 5));
  if (subject == "+") {
    right = num1 + num2;
  } else if (subject == "-") {
    right = num1 - num2;
  } else if (subject == "X") {
    right = num1 * num2;
  } else {
    right = num1 / num2;
  }
  if (choice == 1) {
    options.push(new Option(310, 275, right));
  } else {
    options.push(new Option(310, 275));
  }
  if (choice == 2) {
    options.push(new Option(270, 275, right));
  } else {
    options.push(new Option(270, 275));
  }
  if (choice == 3) {
    options.push(new Option(230, 275, right));
  } else {
    options.push(new Option(230, 275));
  }
  if (choice == 4) {
    options.push(new Option(190, 275, right));
  } else {
    options.push(new Option(190, 275));
  }
}

function draw() {
  camera.zoom = wh / 500;
  camera.x = 250;
  camera.y = 150;
  if (gameStart == true) {
    push();
    scale(wh / 500);
    image(back, 250, 150, 500, 300);
    for (let i of enemies) {
      i.sprite.draw();
    }
    for (let i of towers) {
      i.sprite.draw();
      for (let j of i.bullets) {
        j.sprite.draw();
      }
    }
    if (count == 0 && message == false) {
      message = true;
    }
    fill(50, 75, 255);
    rect(85, 267, 100, 25);
    fill(75);
    gcount += (count - gcount) / 20;
    rect(
      85 - (gcount * (100 / goods)) / 2 + 50,
      267,
      gcount * (100 / goods),
      25
    );
    image(base, 423, 265, base.width/15, base.height/15);
    fill(255);
    textSize(15);
    text("What is " + num1 + " " + subject + " " + num2 + "?", 250, 245);
    if (message == true) {
      createMessage();
    }
    if (message == "place") {
      createMiniMessage();
    }
    if (message == "choose") {
      createMiniMessage2();
    }
    if (dead == true) {
      fill(0);
      rect(250, 115, 350, 200);
      fill(207, 119, 17);
      textSize(45);
      text("You Lose!", 250, 70);
      textSize(25);
      text("Score: " + finalScore, 250, 120);
      fill(125);
      rect(250, 172, 100, 40);
      fill(0);
      textSize(17);
      text("Try Again", 250, 172);
    }
    pop();
    if (enemies.length == 0 && create == 0) {
      wave++;
      for (let i = 0; i < wave; i++) {
        create++;
      }
    }
    if (frameCount % 30 == 0) {
      createNewEnemy();
    }
  } else {
    push();
    scale(wh / 500);
    image(back, 250, 150, 500, 300);
    fill(0);
    rect(250, 150, 400, 200);
    textSize(27);
    fill(207, 119, 17);
    if (gameStart != "wait") {
      text("Choose a subject", 250, 100);
    } else {
      text("Choose a level", 250, 100);
    }
    pop();
  }
}

function createMiniMessage() {
  fill(0);
  rect(75, 40, 160, 30);
  fill(207, 119, 17);
  textSize(15);
  text("Place New Tower", 77, 39);
}

function makeQuestion() {
  if (subject != "÷") {
    if (level == 1) {
      num1 = int(random(1, 8));
      num2 = int(random(1, 8));
    } else if (level == 10) {
      num1 = int(random(7, 20));
      num2 = int(random(7, 20));
    } else {
      num1 = int(random(100, 900));
      num2 = int(random(100, 900));
    }
  } else {
    if (level == 1) {
      right = int(random(1, 8));
      num2 = int(random(1, 8));
      num1 = num2 * right;
    } else if (level == 10) {
      right = int(random(7, 20));
      num2 = int(random(7, 20));
      num1 = num2 * right;
    } else {
      right = int(random(100, 900));
      num2 = int(random(100, 900));
      num1 = num2 * right;
    }
  }
  makeOptions();
}

class Option {
  constructor(x, y, num) {
    if (num != null) {
      this.num = num;
      this.right = true;
    } else {
      if (subject != "÷") {
        this.num = int(random(right-5*level, right+5*level + 1) * random(1, 3) * random(0, 1));
      } else {
        this.num = int(random(right, num2 + 1) * random(1, 3) * random(0, 1));
      }
      this.right = false;
    }
    this.sprite = createSprite(x, y, 30, 30, "static");
    this.sprite.draw = () => {
      if (this.sprite.mouse.hovering()) {
        fill(75);
      } else {
        fill(50);
      }
      rect(0, 0, this.sprite.width, this.sprite.height);
      fill(255);
      if (level == 1) {
        textSize(20);
        text(this.num, 0, -1);
      } else if (level == 10) {
        textSize(15);
        text(this.num, 0, -1);
      } else if (level == 100) {
        if (subject != "X") {
          textSize(10);
          text(this.num, 0, -1);
        } else {
          textSize(7);
          text(this.num, 0, -1);
        }
      }
    };
  }
}

function createMiniMessage2() {
  fill(0);
  rect(75, 40, 160, 30);
  fill(207, 119, 17);
  textSize(10);
  text("Choose tower to upgrade", 77, 39);
}

function createMessage() {
  message = true;
  fill(0);
  rect(250, 115, 350, 200);
  fill(207, 119, 17);
  textSize(30);
  text("Upgrade Unlocked", 250, 60);
  fill(125);
  rect(325, 143, 125, 80);
  rect(175, 143, 125, 80);
  textSize(18);
  fill(0);
  text("New Tower", 325, 143);
  textSize(13);
  text("Upgrade Tower", 175, 143);
}

function createNewEnemy() {
  if (create > 0) {
    enemies.push(new Enemy(int(random(wave, wave + 3))));
    create--;
  }
}

class Enemy {
  constructor(health) {
    this.sprite = createSprite(94, 0, 15);
    this.health = health;
    for (let i of bads) {
      this.sprite.overlaps(i);
    }
    this.sprite.draw = () => {
      fill(250, 250, 150);
      circle(0, 0, this.sprite.width);
      fill(0);
      textSize(10);
      text(this.health, 0, -1);
      if (this.sprite.y < 58) {
        this.sprite.moveTo(94, 58);
      } else if (this.sprite.x < 327 && this.sprite.y < 121) {
        this.sprite.moveTo(327, 58);
      } else if (this.sprite.y < 121) {
        this.sprite.moveTo(327, 121);
      } else if (this.sprite.x > 212 && this.sprite.y < 184) {
        this.sprite.moveTo(212, 121);
      } else if (this.sprite.y < 184) {
        this.sprite.moveTo(212, 184);
      } else if (this.sprite.x < 421) {
        this.sprite.moveTo(421, 184);
      } else if (this.sprite.y < 240) {
        this.sprite.moveTo(421, 240);
      } else if (this.sprite.y >= 240) {
        this.sprite.remove();
        enemies.splice(enemies.indexOf(this), 1);
        if (dead == false) {
          finalScore = score;
          dead = true;
        }
        return;
      }
      if (this.health <= 0) {
        this.sprite.remove();
        enemies.splice(enemies.indexOf(this), 1);
      }
    };
  }
}

class Tower {
  constructor(x, y, attack) {
    this.sprite = createSprite(x, y, 25, "kinematic");
    this.bullets = [];
    this.attack = attack;
    this.sprite.draw = () => {
      if (this.attack == 1) {
        push();
        rotate(-this.sprite.rotation);
        image(tower1, 0, 0, 25, 25);
        pop();
        push();
        rotate(90);
        image(turret1, 0, 0, 25, 25);
        pop();
      } else if (this.attack < 6) {
        push();
        rotate(-this.sprite.rotation);
        image(upgradedTowerImages[this.attack - 2], 0, 0, 25, 25);
        pop();
        push();
        rotate(90);
        image(upgradedTurretImages[this.attack - 2], 0, 0, 25, 25);
        pop();
      } else {
        push();
        rotate(-this.sprite.rotation);
        image(upgradedTowerImages[3], 0, 0, 25, 25);
        pop();
        push();
        rotate(90);
        image(upgradedTurretImages[3], 0, 0, 25, 25);
        pop();
      }
      textSize(15);
      fill(0);
      for (let i of enemies) {
        if (dist(i.sprite.x, i.sprite.y, this.sprite.x, this.sprite.y) < 150) {
          if (this.bullets.length < 1) {
            this.bullets.push(new Bullet(this));
            break;
          }
        }
      }
      this.best = 0;
      this.one = 0;
      for (let i of enemies) {
        if (
          dist(this.sprite.x, this.sprite.y, i.sprite.x, i.sprite.y) <
            this.best ||
          this.best == 0
        ) {
          this.best = dist(
            this.sprite.x,
            this.sprite.y,
            i.sprite.x,
            i.sprite.y
          );
          this.one = i;
        }
      }
      if (this.best != 0) {
        this.sprite.rotateTowards(this.one.sprite, 0.1, 0);
      }
    };
  }
}

class Bullet {
  constructor(origin) {
    this.sprite = createSprite(origin.sprite.x, origin.sprite.y, 5, "none");
    this.best = 0;
    for (let i of enemies) {
      if (
        dist(this.sprite.x, this.sprite.y, i.sprite.x, i.sprite.y) <
          this.best ||
        this.best == 0
      ) {
        this.best = dist(this.sprite.x, this.sprite.y, i.sprite.x, i.sprite.y);
        this.one = i;
      }
    }
    this.sprite.draw = () => {
      this.sprite.layer = 1;
      fill(250);
      circle(0, 0, this.sprite.width);
      if (this.best != 0) {
        this.target = this.one;
        this.sprite.moveTo(this.one.sprite, 3);
      } else {
        this.sprite.remove();
        origin.bullets.splice(origin.bullets.indexOf(this), 1);
        return;
      }
      if (
        dist(
          this.sprite.x,
          this.sprite.y,
          this.target.sprite.x,
          this.target.sprite.y
        ) < 5
      ) {
        this.target.health -= origin.attack;
        score += origin.attack;
        this.sprite.remove();
        origin.bullets.splice(origin.bullets.indexOf(this), 1);
      }
    };
  }
}

function mousePressed() {
  if (dead == false) {
    if (gameStart == false) {
      for (let i = 0; i < allSprites.length; i++) {
        if (allSprites[i].mouse.hovering()) {
          if (i == 0) {
            subject = "+";
          } else if (i == 1) {
            subject = "-";
          } else if (i == 2) {
            subject = "X";
          } else if (i == 3) {
            subject = "÷";
          }
          next();
          break;
        }
      }
    } else if (gameStart == "wait") {
      for (let i of allSprites) {
        if (i.mouse.hovering()) {
          let num = allSprites.indexOf(i);
          if (num == 0) {
            level = 1;
          } else if (num == 1) {
            level = 10;
          } else if (num == 2) {
            level = 100;
          }
          start();
          break;
        }
      }
    } else {
      if (mouse.y < 232) {
        if (message == true) {
          if (mouse.x > 113 && mouse.y > 103 && mouse.x < 237 && mouse.y < 183) {
            message = "choose";
          }
          if (mouse.x > 262 && mouse.y > 103 && mouse.x < 387 && mouse.y < 183) {
            message = "place";
            placing = createSprite(0, 0, towers[0].sprite.width, "kinematic");
            placing.overlaps(allSprites);
            placing.draw = () => {
              placing.moveTowards(
                Math.round(mouse.x / 25) * 25,
                Math.round((mouse.y + 7) / 25) * 25 - 7,
                1
              );
              for (let i of bads) {
                if (
                  dist(placing.x, 0, i.x, 0) < placing.width / 2 + i.width / 2 &&
                  dist(placing.y, 0, i.y, 0) < placing.height / 2 + i.height / 2
                ) {
                  image(towerplacingbad, 0, 0, placing.width, placing.width);
                  return;
                }
              }
              image(towerplacing, 0, 0, placing.width, placing.width);
            };
          }
        } else if (message == "place") {
          let good = true;
          for (let i of bads) {
            if (
              dist(placing.x, 0, i.x, 0) < placing.width / 2 + i.width / 2 &&
              dist(placing.y, 0, i.y, 0) < placing.height / 2 + i.height / 2
            ) {
              good = false;
              break;
            }
          }
          for (let i of towers) {
            if (
              dist(placing.x, 0, i.sprite.x, 0) <
                placing.width / 2 + i.sprite.width / 2 &&
              dist(placing.y, 0, i.sprite.y, 0) <
                placing.height / 2 + i.sprite.height / 2
            ) {
              good = false;
              break;
            }
          }
          if (good == true) {
            towers.push(
              new Tower(
                Math.round(mouse.x / 25) * 25,
                Math.round((mouse.y + 7) / 25) * 25 - 7,
                1
              )
            );
            placing.remove();
            message = false;
            goods++;
            count = goods;
          }
        } else if (message == "choose") {
          for (let i of towers) {
            if (
              dist(mouse.x, mouse.y, i.sprite.x, i.sprite.y) <
              i.sprite.width / 2
            ) {
              i.attack++;
              message = false;
              goods++;
              count = goods;
              break;
            }
          }
        }
      } else {
        if (message == false) {
          for (let i of options) {
            if (i.sprite.mouse.hovering()) {
              if (i.num == right) {
                if (count != 0) {
                  count--;
                }
                makeQuestion();
                break;
              } else {
                if (count != goods) {
                  count++;
                }
              }
            }
          }
        }
      }
    }
  } else {
    dead = false;
    enemies = [];
    towers = [];
    wave = 0;
    create = 0;
    message = false;
    count = 1;
    goods = 1;
    bads = [];
    gcount = 1;
    num1 = 0;
    num2 = 0;
    options = [];
    right = 0;
    score = 0;
    start();
  }
}