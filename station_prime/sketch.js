let a1;
let a2;
let a3;
let a4;
let a5;
let g2;
let g3;
let g5;
let g7;
let pImg;
let exit;
let title;
let player;
let level1;
let level2;
let level3;
let move = 0;
let tryagain;
let gameover;
let lives = 3;
let timer = 0;
let gameStart;
let level = 1;
let bossfight;
let time = 900;
let levelUp = 0;
let timeT = 900;
let bullets = [];
let instructions;
let moveR = false;
let moveL = false;
let asteroids = [];
let particles = [];
let endless = true;
let bossbattle = false;
let choices = [2, 3, 5, 7];

function preload() {
  pImg1 = loadImage("spaceship.png");
  pImg2 = loadImage("spaceship_dying.png");
  pImg3 = loadImage("spaceship_almost_dead.png");
  a1 = loadImage("m1.png");
  a2 = loadImage("m2.png");
  a3 = loadImage("m3.png");
  a4 = loadImage("m4.png");
  a5 = loadImage("m5.png");
  button1 = loadImage("button_1.png");
  button2 = loadImage("button_2.png");
  title = loadImage("title.png");
  song = loadSound("music.wav");
  destroy = loadSound("destroy.wav");
  g2 = loadImage("2.png");
  g3 = loadImage("3.png");
  g5 = loadImage("5.png");
  g7 = loadImage("7.png");
  left = loadImage("left.png");
  right = loadImage("right.png");
  level1 = loadImage("level1.png");
  level2 = loadImage("level2.png");
  level3 = loadImage("level3.png");
  bossfight = loadImage("bossfight.png");
  tryagain = loadImage("tryagain.png");
  exit = loadImage("exit.png");
  gameover = loadImage("gameover.png");
  instructions = loadImage("instructions.png");
}

function setup() {
  gameStart = false;
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  for (let i = 0; i < width / 10; i++) {
    particles.push(new Particle(width, height));
  }
  song.loop();
}

function draw() {
  if (gameStart != true) {
    Player.x = width/2
  }
  background(30);
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  if (lives == 0 && gameStart == true) {
    gameStart = "gameover";
    lives = 3;
    asteroids = []
    bullets = []
  }
  if (gameStart == "gameover") {
    imageMode(CENTER);
    text("Score: " + (885-timeT)*10, width/2, height*(8/9))
    image(
      gameover,
      width / 2,
      height / 2 + height / 12,
      width / 1,
      width / 1.5
    );
    image(
      tryagain,
      width / 2.6,
      height / 2 + height / 18,
      width / 5,
      width / 10
    );
    image(
      exit,
      width - width / 2.6,
      height / 2 + height / 18,
      width / 5,
      width / 10
    );
  }
  if (gameStart == false) {
    imageMode(CENTER);
    image(title, width / 2, height / 2 + height / 12, width / 1, width / 1.5);
    image(
      button1,
      width / 2.6,
      height / 2 + height / 18,
      width / 5,
      width / 10
    );
    image(
      button2,
      width - width / 2.6,
      height / 2 + height / 18,
      width / 5,
      width / 10
    );
  }
  if (gameStart == "choose") {
    image(level1, width * (23 / 64), height * (3 / 8), width / 4, width / 7);
    image(level2, width * (41 / 64), height * (3 / 8), width / 4, width / 7);
    image(
      level3,
      width * (23 / 64),
      height * (36 / 51.2),
      width / 4,
      width / 7
    );
    image(
      bossfight,
      width * (41 / 64),
      height * (36 / 51.2),
      width / 4,
      width / 7
    );
  }
  if (gameStart == "instructions") {
    image(instructions, width / 2, height / 2, height, height);
  }
  if (gameStart != false && gameStart != "gameover") {
    imageMode(CORNER);
    image(exit, 0, 0, width / 18, width / 32);
    imageMode(CENTER);
  }
  if (gameStart == true) {
    if (endless == false) {
      if (timeT == 600) {
        level = 2;
      }
      if (timeT == 400) {
        level = 3;
      }
      if (timeT == 300) {
        level = 4;
      }
      if (timeT == 250) {
        if (endless == false) {
          bossbattle = true;
          song.stop();
        }
      }
    }
    if (time == timeT) {
      if (bossbattle == false) {
        asteroids.push(new Asteroid(level));
      }
      time = 0;
      if (bossbattle == false) {
        if (endless == true) {
          if (level == 1) {
            timeT -= 15;
          }
          if (level == 2) {
            timeT -= 30;
          }
          if (level == 3) {
            timeT -= 50;
          }
        } else {
          timeT -= 50;
        }
      }
    } else {
      time++;
    }
    textSize((width / 20 / 3) * 2 - 5);
    textAlign(LEFT, TOP);
    fill(225);
    textAlign(CENTER, CENTER);
    rectMode(CORNER);
    text("Score: " + (885-timeT)*10, width*(9/10), height/15)
    fill(0, 225, 0);
    rect(width / 30, height / 30 + 100, 30, 900 / (height / 250));
    fill(0);
    rect(width / 30, height / 30 + 100, 30, timeT / (height / 250));
    fill(225);
    rectMode(CORNER);
    fill(225, 0, 0);
    rect(width / 10, height / 30, (width / 30) * 3, width / 30 / 2);
    fill(0, 225, 0);
    if (lives > 0) {
      rect(width / 10, height / 30, width / 30, width / 30 / 2);
    }
    if (lives > 1) {
      rect(width / 10 + width / 30, height / 30, width / 30, width / 30 / 2);
    }
    rectMode(CENTER);
    fill(75);
    rect(width / 2, height * (12 / 13), width, width / 12.5);
    fill(0, 225, 0);
    rectMode(CORNER);
    image(g2, width / 17, height * (12 / 13), width / 20, width / 20);
    image(g3, (width / 17) * 2, height * (12 / 13), width / 20, width / 20);
    image(g5, (width / 17) * 3, height * (12 / 13), width / 20, width / 20);
    image(g7, (width / 17) * 4, height * (12 / 13), width / 20, width / 20);
    image(right, width * (16 / 17), height * (12 / 13), width / 20, width / 20);
    image(left, width * (15 / 17), height * (12 / 13), width / 20, width / 20);
    if (lives > 2) {
      rect(
        width / 10 + width / 30 + width / 30,
        height / 30,
        width / 30,
        width / 30 / 2
      );
    }
    rectMode(CENTER);
    player = new Player();
    for (let j = 0; j < asteroids.length; j++) {
      if (asteroids[j].y > height - width / 20 + width / 20 / 2) {
        lives--;
        asteroids.splice(j, 1);
      }
    }
    if (keyIsDown(RIGHT_ARROW) || moveR == true) {
      if (move < width/2) {
        move += width / 120;
      }
    }
    if (keyIsDown(LEFT_ARROW) || moveL == true) {
      if (move > -width/2) {
        move -= width / 120;
      }
    }
    player.playerX += move
    for (let i = bullets.length - 1; i > 0; i--) {
      bullets[i].show();
      for (let j = 0; j < asteroids.length; j++) {
        if (bullets[i].hits(asteroids[j])) {
          if (asteroids[j].num % bullets[i].number == 0) {
            asteroids[j].num = asteroids[j].num / bullets[i].number;
            asteroids[j].size = asteroids[j].size - 30;
            if (asteroids[j].size == 0) {
              asteroids.splice(j, 1);
              time = timeT;
            }
          } else {
            lives--;
          }
          bullets.splice(i, 1);
        }
      }
    }
    player.show();
    for (let i = 0; i < asteroids.length; i++) {
      if (bossbattle == false) {
        asteroids[i].show();
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 50 || keyCode == 51 || keyCode == 53 || keyCode == 55) {
    bullets.push(new Bullet(key));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  particles = []
  for (let i = 0; i < width / 10; i++) {
    particles.push(new Particle(width, height));
  }
}

function hexagon(transX, transY, s, colour) {
  fill(colour);
  push();
  translate(transX, transY);
  scale(s);
  beginShape();
  vertex(-75, -130);
  vertex(75, -130);
  vertex(150, 0);
  vertex(75, 130);
  vertex(-75, 130);
  vertex(-150, 0);
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  if (
    gameStart == "choose" &&
    mouseX > width * (23 / 64) - width / 8 &&
    mouseX < width * (23 / 64) + width / 8 &&
    mouseY < height * (3 / 8) + width / 14 &&
    mouseY > height * (3 / 8) - width / 14
  ) {
    level = 1;
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == "choose" &&
    mouseX > width * (41 / 64) - width / 8 &&
    mouseX < width * (41 / 64) + width / 8 &&
    mouseY < height * (3 / 8) + width / 14 &&
    mouseY > height * (3 / 8) - width / 14
  ) {
    level = 2;
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == "choose" &&
    mouseX > width * (23 / 64) - width / 8 &&
    mouseX < width * (23 / 64) + width / 8 &&
    mouseY < height * (36 / 51.2) + width / 14 &&
    mouseY > height * (36 / 51.2) - width / 14
  ) {
    level = 3;
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == false &&
    mouseX > width / 2.6 - width / 10 &&
    mouseX < width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = "choose";
  }
  if (
    gameStart == false &&
    mouseX > width - width / 2.6 - width / 10 &&
    mouseX < width - width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = "instructions";
  }
  if (mouseX < width / 18 && mouseX > 0 && mouseY < width / 32 && mouseY > 0) {
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    if (gameStart == "instructions" || gameStart == "choose") {
      gameStart = false
    }
    if (gameStart == true) {
      gameStart = "choose"
      time = 900;
      timeT = 900;
      asteroids = []
      bullets = []
    }
  }
  if (
    gameStart == "gameover" &&
    mouseX > width / 2.6 - width / 10 &&
    mouseX < width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == "gameover" &&
    mouseX > width - width / 2.6 - width / 10 &&
    mouseX < width - width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = false;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width / 17, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(2));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, (width / 17) * 2, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(3));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, (width / 17) * 3, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(5));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, (width / 17) * 4, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(7));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (16 / 17), height * (12 / 13)) < width / 40
  ) {
    moveR = true;
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (15 / 17), height * (12 / 13)) < width / 40
  ) {
    moveL = true;
  }
}

function mouseReleased() {
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (16 / 17), height * (12 / 13)) < width / 40
  ) {
    moveR = false;
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (15 / 17), height * (12 / 13)) < width / 40
  ) {
    moveL = false;
  }
}

function touchStarted(event) {
  if (
    gameStart == "choose" &&
    mouseX > width * (23 / 64) - width / 8 &&
    mouseX < width * (23 / 64) + width / 8 &&
    mouseY < height * (3 / 8) + width / 14 &&
    mouseY > height * (3 / 8) - width / 14
  ) {
    level = 1;
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == "choose" &&
    mouseX > width * (41 / 64) - width / 8 &&
    mouseX < width * (41 / 64) + width / 8 &&
    mouseY < height * (3 / 8) + width / 14 &&
    mouseY > height * (3 / 8) - width / 14
  ) {
    level = 2;
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == "choose" &&
    mouseX > width * (23 / 64) - width / 8 &&
    mouseX < width * (23 / 64) + width / 8 &&
    mouseY < height * (36 / 51.2) + width / 14 &&
    mouseY > height * (36 / 51.2) - width / 14
  ) {
    level = 3;
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == false &&
    mouseX > width / 2.6 - width / 10 &&
    mouseX < width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = "choose";
  }
  if (
    gameStart == false &&
    mouseX > width - width / 2.6 - width / 10 &&
    mouseX < width - width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = "instructions";
  }
  if (mouseX < width / 18 && mouseX > 0 && mouseY < width / 32 && mouseY > 0) {
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    if (gameStart == "instructions" || gameStart == "choose") {
      gameStart = false
    }
    if (gameStart == true) {
      gameStart = "choose"
      time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    }
  }
  if (
    gameStart == "gameover" &&
    mouseX > width / 2.6 - width / 10 &&
    mouseX < width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = true;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
    lives = 3
  }
  if (
    gameStart == "gameover" &&
    mouseX > width - width / 2.6 - width / 10 &&
    mouseX < width - width / 2.6 + width / 10 &&
    mouseY > height / 2 + height / 18 - width / 20 &&
    mouseY < height / 2 + height / 18 + width / 20
  ) {
    gameStart = false;
    time = 900;
    timeT = 900;
    asteroids = []
    bullets = []
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width / 17, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(2));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, (width / 17) * 2, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(3));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, (width / 17) * 3, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(5));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, (width / 17) * 4, height * (12 / 13)) < width / 40
  ) {
    bullets.push(new Bullet(7));
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (16 / 17), height * (12 / 13)) < width / 40
  ) {
    moveR = true;
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (15 / 17), height * (12 / 13)) < width / 40
  ) {
    moveL = true;
  }
}

function touchEnded() {
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (16 / 17), height * (12 / 13)) < width / 40
  ) {
    moveR = false;
  }
  if (
    gameStart == true &&
    dist(mouseX, mouseY, width * (15 / 17), height * (12 / 13)) < width / 40
  ) {
    moveL = false;
  }
}

class Player {
  constructor() {
    this.playerX = width / 2;
    this.playerY = (height / 7) * 5.6;
  }
  show() {
    fill(0, 150, 200);
    imageMode(CENTER);
    //rect(this.playerX, this.playerY, width/20, width/20, 75, 75, 0, 0)
      image(pImg1, this.playerX, this.playerY, width / 12, width / 18);
  }
}

class Bullet {
  constructor(number) {
    this.bulletX = player.playerX;
    this.bulletY = player.playerY;
    this.number = number;
    this.r = width / 20 / 3;
  }
  show() {
    fill(150, 75, 25);
    circle(this.bulletX, this.bulletY, (width / 20 / 3) * 2);
    this.bulletY -= height / 40;
    fill(0);
    textSize(this.r * 1.5);
    textAlign(CENTER, CENTER);
    if (this.number == 2) {
      text("2", this.bulletX, this.bulletY + width / 75);
    } else {
      if (this.number == 3) {
        text("3", this.bulletX, this.bulletY + width / 75);
      } else {
        if (this.number == 5) {
          text("5", this.bulletX, this.bulletY + width / 75);
        } else {
          if (this.number == 7) {
            text("7", this.bulletX, this.bulletY + width / 75);
          }
        }
      }
    }
  }
  hits(rock) {
    this.rock = rock;
    this.d = dist(this.bulletX, this.bulletY, this.rock.x, this.rock.y);
    if (this.d < this.r + rock.r) {
      return true;
    } else {
      return false;
    }
  }
}

class Asteroid {
  constructor(level) {
    this.level = level;
    this.aNumber = 1 + this.level;
    this.num = 1;
    this.size = 0;
    for (let i = 0; i < this.aNumber; i++) {
      this.num = this.num * random(choices);
      this.size += 30;
    }
    this.r = this.size / 2;
    this.asteroidX = random(width - this.x * 2) + this.x;
    this.asteroidY = 0;
    this.x = random(this.size, width - this.size);
    this.y = 0;
    this.colour = random(49, 151);
    this.aster = Math.round(random(0, 4) + 1);
  }
  show() {
    textSize(this.size / 2);
    textAlign(CENTER);
    //hexagon(this.x, this.y, (this.size/6)/30, this.colour);
    if (this.aster == 1) {
      image(a1, this.x, this.y, this.size, this.size);
    } else if (this.aster == 2) {
      image(a2, this.x, this.y, this.size, this.size);
    } else if (this.aster == 3) {
      image(a3, this.x, this.y, this.size, this.size);
    } else if (this.aster == 4) {
      image(a4, this.x, this.y, this.size, this.size);
    } else if (this.aster == 5) {
      image(a5, this.x, this.y, this.size, this.size);
    }
    fill(0);
    text(this.num, this.x, this.y);
    this.y += height / (timeT - 50);
  }
}

class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor(pWidth, pHeight) {
    this.pWidth = pWidth
    this.pHeight = pHeight
    this.x = random(0, this.pWidth);
    this.y = random(0, this.pHeight);
    this.r = random(0.25, 6);
    this.xSpeed = random(-0.25, 0.25);
    this.ySpeed = random(-0.125, 0.25);
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    fill(225);
    circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.x < 0 || this.x > this.pWidth) this.xSpeed *= -1;
    if (this.y < 0 || this.y > this.pHeight) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart

  joinParticles(particles) {
    particles.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 50) {
        stroke("rgba(255,255,255,0.04)");
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}
