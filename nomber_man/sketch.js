let cnv;
let bomb;
let left;
let berry;
let right;
let boom1;
let boom2;
let boom3;
let boom4;
let boom5;
let player;
let youWin;
let newNum;
let gomber;
let youLose;
let bombLose;
let bombImage;
let WinOrLose;
let boomTimer;
let brickImage;
let berryImage;
let gomberLose;
let bricks = [];
let timer = 250;
let gomberImage;
let gomberImage1;
let badBrickImage;
let brickMap = [];
let brickNums = [];
let boom1do = false;
let boom2do = false;
let boom3do = false;
let boom4do = false;
let timeStart = false;
let direction = "right";
let gomberLevel = false;
let bombPic;
let startScreen;
let gameStart = "startScreen";
let startAnimation;
let startAnimationTimer = 130;
let story;
let storyTimer = 1300;
let choose;
let score = 0;
let i1;
let i2;
let i3;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function preload() {
  brickImage = loadImage("brick.png");
  startAnimation = loadImage("startanimation.gif");
  badBrickImage = loadImage("bad_brick.png");
  right = loadImage("right.png");
  left = loadImage("left.png");
  bombImage = loadImage("bomb.gif");
  berryImage = loadImage("berry.png");
  youWin = loadImage("youwin.gif");
  youLose = loadImage("youlose.gif");
  boom1 = loadImage("boom.gif");
  boom2 = loadImage("boom.gif");
  boom3 = loadImage("boom.gif");
  boom4 = loadImage("boom.gif");
  boom5 = loadImage("boom.gif");
  bombLose = loadImage("blast.gif");
  gomberImage = loadImage("gomber.png");
  gomberImage1 = loadImage("gomber1.png");
  gomberLose = loadImage("gomberlose.gif");
  bombPic = loadImage("bomb.png");
  startScreen = loadImage("startscreen.png");
  story = loadImage("story.gif");
  choose = loadImage("choose.png");
  i1 = loadImage("instrcutions1.png")
  i2 = loadImage("instrcutions2.png")
  i3 = loadImage("instructions3.png")
}

function setup() {
  bricks = [];
  brickNums = [];
  brickMap = [];
  direction = "right";
  timer = 250;
  timeStart = false;
  boom1do = false;
  boom2do = false;
  boom3do = false;
  boom4do = false;
  gomberLevel = false;
  player = new Player();
  bomb = new Bomb(player.x, player.y);
  for (let i = 36; i >= 0; i--) {
    brickMap[i] = 1;
  }
  brickMap[0] = 0;
  brickMap[1] = 0;
  brickMap[6] = 0;
  for (let i = 8; i >= 0; ) {
    let ranBrick = Math.floor(Math.random() * 34) + 2;
    if (brickMap[ranBrick] != 0) {
      if (
        brickMap[ranBrick + 1] == 1 ||
        (brickMap[ranBrick - 1] == 1 && brickMap[ranBrick + 6] == 1) ||
        brickMap[ranBrick - 6] == 1
      ) {
        brickMap[ranBrick] = 0;
        i--;
      }
    }
  }
  for (let i = 36; i >= 0; i--) {
    if (brickMap[i] == 0) {
      brickMap[i] = 3;
      i = -1;
    }
  }
  let berryBrick;
  for (let i = 36; i >= 0; i--) {
    if (brickMap[i] == 3) {
      berryBrick = i;
      i = -1;
    }
  }
  brickMap[berryBrick - 6] = 1;
  brickMap[berryBrick - 1] = 1;
  for (let i = 5; i > 0; ) {
    let ranBrick = Math.floor(Math.random() * 34) + 2;
    if (brickMap[ranBrick] == 1) {
      if (
        brickMap[ranBrick + 1] != 4 &&
        brickMap[ranBrick - 1] != 4 &&
        brickMap[ranBrick + 6] != 4 &&
        brickMap[ranBrick - 6] != 4 &&
        ranBrick != 2 &&
        ranBrick != 12 &&
        ranBrick != berryBrick + 1 &&
        ranBrick != berryBrick - 1 &&
        ranBrick != berryBrick + 6 &&
        ranBrick != berryBrick - 6
      ) {
        brickMap[ranBrick] = 4;
        i--;
      }
    }
  }
  for (let i = 36; i >= 2; i--) {
    if (brickMap[i] == 0 && brickMap[i + 1] == 0 && brickMap[i - 1] == 0) {
      if (i - 29 > 0) {
        gomber = new Gomber(i - 30, 5);
      } else if (i - 23 > 0) {
        gomber = new Gomber(i - 24, 4);
      } else if (i - 17 > 0) {
        gomber = new Gomber(i - 18, 3);
      } else if (i - 11 > 0) {
        gomber = new Gomber(i - 12, 2);
      } else if (i - 5 > 0) {
        gomber = new Gomber(i - 6, 1);
      } else if (i + 1 > 0) {
        gomber = new Gomber(i, 0);
      }
      gomberLevel = true;
      i = -1;
    }
  }
  for (let i = 0; i <= 35; ) {
    if (brickMap[i] != 0 && brickMap[i] != 3) {
      newNum =
        Math.floor(Math.random() * 6 + 3) * (Math.floor(Math.random() * 6) + 3);
      if (brickNums[i + 1] != newNum && brickNums[i - 1] != newNum) {
        if (brickNums[i + 6] != newNum && brickNums[i - 6] != newNum) {
          brickNums.push(newNum);
          i++;
        }
      }
    } else {
      brickNums.push(0);
      i++;
    }
  }
  cnv = createCanvas(600, 600);
  centerCanvas();
  readArray(brickMap);
 }

function windowResized() {
  centerCanvas();
}

function draw() {
  background(50, 125, 50);
  if (gameStart == "playing") {
    fill(250, 150, 50);
    rect(600, 0, 100, 600);
    fill(250);
    rect(700, 0, 100, 600);
    fill(0);
    textAlign(CENTER, CENTER);
    text("score:", 750, 250);
    text(score, 750, 300);
    for (let i = 6; i >= 0; i--) {
      image(bombPic, 615, i * 88, 70, 70);
      fill(255);
      textAlign(CENTER, CENTER);
      text(i + 3, 650, i * 88 + 43);
    }
    for (let i = bricks.length - 1; i >= 0; i--) {
      bricks[i].show();
    }
    player.show();
    bomb.show();
    if (boom1do == true) {
      image(boom1, (bomb.x - 1) * 100 + 25, bomb.y * 100 + 25, 50, 50);
    }
    if (boom2do == true) {
      image(boom2, (bomb.x + 1) * 100 + 25, bomb.y * 100 + 25, 50, 50);
    }
    if (boom3do == true) {
      image(boom3, bomb.x * 100 + 25, (bomb.y + 1) * 100 + 25, 50, 50);
    }
    if (boom4do == true) {
      image(boom4, bomb.x * 100 + 25, (bomb.y - 1) * 100 + 25, 50, 50);
    }
    if (
      boom1do == true ||
      boom2do == true ||
      boom3do == true ||
      boom4do == true
    ) {
      image(boom5, bomb.x * 100 + 25, bomb.y * 100 + 25, 50, 50);
      boomTimer -= 60 / frameRate();
      if (boomTimer <= 0) {
        boom1do = false;
        boom2do = false;
        boom3do = false;
        boom4do = false;
      }
    }
    if (gomberLevel == true) {
      gomber.show();
    }
    if (gomberLevel == true) {
      if (
        dist(
          player.x * 100,
          player.y * 100,
          gomber.x * 100 + gomber.move,
          gomber.y * 100
        ) <= 60
      ) {
        timeStart = true;
        WinOrLose = "gomberlose";
      }
    }
    if (player.x == bomb.x - 1 && player.y == bomb.y) {
      if (boom1do == true) {
        timeStart = true;
        WinOrLose = "bombLose";
      }
    }
    if (gomberLevel == true) {
      if (boom1do == true && gomber.x == bomb.x - 1 && gomber.y == bomb.y) {
        gomberLevel = false;
      }
      if (boom2do == true && gomber.x == bomb.x + 1 && gomber.y == bomb.y) {
        gomberLevel = false;
      }
      if (boom3do == true && gomber.x == bomb.x && gomber.y == bomb.y + 1) {
        gomberLevel = false;
      }
      if (boom4do == true && gomber.x == bomb.x && gomber.y == bomb.y - 1) {
        gomberLevel = false;
      }
      if (boom1do == true && gomber.x == bomb.x && gomber.y == bomb.y) {
        gomberLevel = false;
      }
      if (boom2do == true && gomber.x == bomb.x && gomber.y == bomb.y) {
        gomberLevel = false;
      }
      if (boom3do == true && gomber.x == bomb.x && gomber.y == bomb.y) {
        gomberLevel = false;
      }
      if (boom4do == true && gomber.x == bomb.x && gomber.y == bomb.y) {
        gomberLevel = false;
      }
    }
    if (player.x == bomb.x + 1 && player.y == bomb.y) {
      if (boom2do == true) {
        timeStart = true;
        WinOrLose = "bombLose";
      }
    }
    if (player.x == bomb.x && player.y == bomb.y + 1) {
      if (boom3do == true) {
        timeStart = true;
        WinOrLose = "bombLose";
      }
    }
    if (player.x == bomb.x && player.y == bomb.y - 1) {
      if (boom4do == true) {
        timeStart = true;
        WinOrLose = "bombLose";
      }
    }
    if (player.x == bomb.x && player.y == bomb.y) {
      if (
        boom1do == true ||
        boom2do == true ||
        boom3do == true ||
        boom4do == true
      ) {
        timeStart = true;
        WinOrLose = "bombLose";
      }
    }
    if (brickMap[player.x + player.y * 6] == 3) {
      if (timeStart == false) {
        timeStart = true;
        WinOrLose = "win";
        score += 10;
      }
    }
    if (timeStart == true) {
      timer -= 60 / frameRate();
      if (timer <= 200) {
        cnv = createCanvas(600, 600);
        centerCanvas();
        if (WinOrLose == "win") {
          image(youWin, 0, 0);
        } else if (WinOrLose == "lose") {
          image(youLose, 0, 0);
          score = 0;
        } else if (WinOrLose == "bombLose") {
          image(bombLose, 0, 0);
          score = 0;
        } else {
          image(gomberLose, 0, 0);
          score = 0;
        }
      } else {
      }
      if (timer <= 0) {
        setup();
        timeStart = false;
        timer = 250;
        cnv = createCanvas(800, 600);
        centerCanvas();
        youWin.reset();
      }
    }
  }
  if (gameStart == "startScreen") {
    fill(50, 250, 250);
    image(startScreen, 0, 0);
  }
  if (gameStart == "startAnimation") {
    image(startAnimation, 0, 0);
    startAnimationTimer -= 60 / frameRate();
    if (startAnimationTimer <= 0) {
      gameStart = "choose";
    }
  }
  if (gameStart == "story") {
    image(story, -17, 0, 734, 600);
    storyTimer -= 60 / frameRate();
    if (storyTimer <= 0) {
      gameStart = "choose";
    }
  }
  if (gameStart == "choose") {
    image(choose, 0, 0);
  }
  if (gameStart == "i1") {
    image(i1, 0, 0);
  }
  if (gameStart == "i2") {
    image(i2, 0, 0);
  }
  if (gameStart == "i3") {
    image(i3, 0, 0);
  }
}

class Brick {
  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
  }
  show() {
    imageMode(CORNER);
    image(brickImage, this.x * 100, this.y * 100, 100, 100);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(this.num, this.x * 100 + 50, this.y * 100 + 50);
  }
}

function readArray(array) {
  bricks = [];
  for (let i = 0; i < 36; i++) {
    if (array[i] == 1) {
      if (i - 29 > 0) {
        bricks.push(new Brick(i - 30, 5, brickNums[i]));
      } else if (i - 23 > 0) {
        bricks.push(new Brick(i - 24, 4, brickNums[i]));
      } else if (i - 17 > 0) {
        bricks.push(new Brick(i - 18, 3, brickNums[i]));
      } else if (i - 11 > 0) {
        bricks.push(new Brick(i - 12, 2, brickNums[i]));
      } else if (i - 5 > 0) {
        bricks.push(new Brick(i - 6, 1, brickNums[i]));
      } else if (i + 1 > 0) {
        bricks.push(new Brick(i, 0, brickNums[i]));
      }
    } else if (brickMap[i] == 0) {
      bricks.push(new Empty());
    } else if (brickMap[i] == 3) {
      if (i - 29 > 0) {
        bricks.push(new Berry(i - 30, 5));
      } else if (i - 23 > 0) {
        bricks.push(new Berry(i - 24, 4));
      } else if (i - 17 > 0) {
        bricks.push(new Berry(i - 18, 3));
      } else if (i - 11 > 0) {
        bricks.push(new Berry(i - 12, 2));
      } else if (i - 5 > 0) {
        bricks.push(new Berry(i - 6, 1));
      } else if (i + 1 > 0) {
        bricks.push(new Berry(i, 0));
      }
    } else if (brickMap[i] == 4) {
      if (i - 29 > 0) {
        bricks.push(new BadBrick(i - 30, 5, brickNums[i]));
      } else if (i - 23 > 0) {
        bricks.push(new BadBrick(i - 24, 4, brickNums[i]));
      } else if (i - 17 > 0) {
        bricks.push(new BadBrick(i - 18, 3, brickNums[i]));
      } else if (i - 11 > 0) {
        bricks.push(new BadBrick(i - 12, 2, brickNums[i]));
      } else if (i - 5 > 0) {
        bricks.push(new BadBrick(i - 6, 1, brickNums[i]));
      } else if (i + 1 > 0) {
        bricks.push(new BadBrick(i, 0, brickNums[i]));
      }
    }
  }
}

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  show() {
    ellipseMode(CORNER);
    fill(50, 100, 150);
    //ellipse(this.x * 100 + 10, this.y * 100 + 10, 80, 80);
    if (direction == "right") {
      image(right, this.x * 100 + 10, this.y * 100 + 10, 80, 80);
    } else if (direction == "left") {
      image(left, this.x * 100 + 10, this.y * 100 + 10, 80, 80);
    }
  }
}

function keyPressed() {
  if (gameStart == "playing") {
    if (keyCode == RIGHT_ARROW) {
      direction = "right";
      if (
        brickMap[player.x + player.y * 6 + 1] != 1 &&
        brickMap[player.x + player.y * 6 + 1] != 4 &&
        player.x < 5
      ) {
        player.x++;
      }
    }
    if (keyCode == LEFT_ARROW) {
      direction = "left";
      if (
        brickMap[player.x + player.y * 6 - 1] != 1 &&
        brickMap[player.x + player.y * 6 - 1] != 4 &&
        player.x > 0
      ) {
        player.x--;
      }
    }
    if (keyCode == DOWN_ARROW) {
      if (
        brickMap[player.x + player.y * 6 + 6] != 1 &&
        brickMap[player.x + player.y * 6 + 6] != 4 &&
        player.y < 5
      ) {
        player.y += 1;
      }
    }
    if (keyCode == UP_ARROW) {
      if (
        brickMap[player.x + player.y * 6 - 6] != 1 &&
        brickMap[player.x + player.y * 6 - 6] != 4 &&
        player.y > 0
      ) {
        player.y -= 1;
      }
    }
    if (key == "3") {
      bomb.place(3);
    }
    if (key == "4") {
      bomb.place(4);
    }
    if (key == "5") {
      bomb.place(5);
    }
    if (key == "6") {
      bomb.place(6);
    }
    if (key == "7") {
      bomb.place(7);
    }
    if (key == "8") {
      bomb.place(8);
    }
    if (key == "9") {
      bomb.place(9);
    }
  }
}

class Bomb {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.placed = false;
    this.startTime = 150;
    this.time = this.startTime;
    this.num = 0;
  }
  show() {
    if (this.placed == true) {
      fill(50);
      //ellipse(this.x * 100 + 25, this.y * 100 + 25, 50, 50);
      image(bombImage, this.x * 100 + 13, this.y * 100 + 10, 75, 75);
      fill(255);
      text(String(this.num), this.x * 100 + 50, this.y * 100 + 50);
      this.time -= 60 / frameRate();
      if (this.time <= 0) {
        this.placed = false;
        this.time = this.startTime;
        if (this.x + this.y * 6 + 1 > 0 && this.x + this.y * 6 + 1 < 36) {
          if (
            bricks[this.x + this.y * 6 + 1].num % this.num == 0 &&
            this.x < 5
          ) {
            if (brickMap[this.x + this.y * 6 + 1] == 4) {
              timeStart = true;
              WinOrLose = "lose";
              youLose.reset();
            }
            brickMap[this.x + this.y * 6 + 1] = 0;
            boom2do = true;
            boom2.reset();
            boomTimer = 18;
          }
        }
        if (this.x + this.y * 6 - 1 > 0 && this.x + this.y * 6 - 1 < 36) {
          if (
            bricks[this.x + this.y * 6 - 1].num % this.num == 0 &&
            this.x > 0
          ) {
            if (brickMap[this.x + this.y * 6 - 1] == 4) {
              timeStart = true;
              WinOrLose = "lose";
              youLose.reset();
            }
            brickMap[this.x + this.y * 6 - 1] = 0;
            boom1do = true;
            boom1.reset();
            boomTimer = 18;
          }
        }
        if (this.x + this.y * 6 + 6 > 0 && this.x + this.y * 6 + 6 < 36) {
          if (
            bricks[this.x + this.y * 6 + 6].num % this.num == 0 &&
            this.y < 5
          ) {
            if (brickMap[this.x + this.y * 6 + 6] == 4) {
              timeStart = true;
              WinOrLose = "lose";
              youLose.reset();
            }
            brickMap[this.x + this.y * 6 + 6] = 0;
            boom3do = true;
            boom3.reset();
            boomTimer = 18;
          }
        }
        if (this.x + this.y * 6 - 6 > 0 && this.x + this.y * 6 - 6 < 36) {
          if (
            bricks[this.x + this.y * 6 - 6].num % this.num == 0 &&
            this.y > 0
          ) {
            if (brickMap[this.x + this.y * 6 - 6] == 4) {
              timeStart = true;
              WinOrLose = "lose";
              youLose.reset();
            }
            brickMap[this.x + this.y * 6 - 6] = 0;
            boom4do = true;
            boom4.reset();
            boomTimer = 18;
          }
        }
        readArray(brickMap);
      }
    }
  }
  place(num) {
    if (this.placed == false) {
      this.num = num;
      this.x = player.x;
      this.y = player.y;
      this.placed = true;
      bombImage.reset();
    }
  }
}

class Empty {
  constructor() {
    this.num = 0;
  }
  show() {}
}

class Berry {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.num = 2;
  }
  show() {
    fill(0, 0, 255);
    //ellipse(this.x * 100 + 25, this.y * 100 + 25, 50, 50);
    image(berryImage, this.x * 100 + 25, this.y * 100 + 25, 50, 50);
  }
}

class BadBrick {
  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
  }
  show() {
    imageMode(CORNER);
    image(badBrickImage, this.x * 100, this.y * 100, 100, 100);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(this.num, this.x * 100 + 50, this.y * 100 + 50);
  }
}

class Gomber {
  constructor(x, y) {
    this.num = 181440;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.direction = "right";
  }
  show() {
    if (this.direction == "left") {
      image(gomberImage, this.x * 100 + this.move, this.y * 100, 90, 90);
    }
    if (this.direction == "right") {
      image(gomberImage1, this.x * 100 + this.move, this.y * 100, 90, 90);
    }
    if (this.direction == "right") {
      if (this.move < 99) {
        this.move += 3;
      } else {
        this.direction = "left";
      }
    }
    if (this.direction == "left") {
      if (this.move > -99) {
        this.move -= 3;
      } else {
        this.direction = "right";
      }
    }
    if (this.direction == "left") {
      if (this.x * 100 + this.move <= 0) {
        this.direction = "right";
      }
    }
    if (this.direction == "right") {
      if (this.x * 100 + this.move >= 500) {
        this.direction = "left";
      }
    }
  }
}

function mousePressed() {
  if (gameStart == "playing") {
    if (mouseX < 600) {
      if (mouseX < player.x * 100) {
        direction = "left";
        if (
          brickMap[player.x + player.y * 6 - 1] != 1 &&
          brickMap[player.x + player.y * 6 - 1] != 4 &&
          player.x > 0
        ) {
          player.x--;
        }
      } else if (mouseX > player.x * 100 + 100) {
        direction = "right";
        if (
          brickMap[player.x + player.y * 6 + 1] != 1 &&
          brickMap[player.x + player.y * 6 + 1] != 4 &&
          player.x < 5
        ) {
          player.x++;
        }
      } else if (mouseY > player.y * 100 + 100) {
        if (
          brickMap[player.x + player.y * 6 + 6] != 1 &&
          brickMap[player.x + player.y * 6 + 6] != 4 &&
          player.y < 5
        ) {
          player.y += 1;
        }
      } else if (mouseY < player.y * 100) {
        if (
          brickMap[player.x + player.y * 6 - 6] != 1 &&
          brickMap[player.x + player.y * 6 - 6] != 4 &&
          player.y > 0
        ) {
          player.y -= 1;
        }
      }
    }
    if (mouseX > 600 && mouseX < 700) {
      if (mouseY < 86.5 && mouseY > 0) {
        bomb.place(3);
      }
      if (mouseY < 86.5 * 2 && mouseY > 86.5) {
        bomb.place(4);
      }
      if (mouseY < 86.5 * 3 && mouseY > 86.5 * 2) {
        bomb.place(5);
      }
      if (mouseY < 86.5 * 4 && mouseY > 86.5 * 3) {
        bomb.place(6);
      }
      if (mouseY < 86.5 * 5 && mouseY > 86.5 * 4) {
        bomb.place(7);
      }
      if (mouseY < 86.5 * 6 && mouseY > 86.5 * 5) {
        bomb.place(8);
      }
      if (mouseY < 86.5 * 7 && mouseY > 86.5 * 6) {
        bomb.place(9);
      }
    }
  }
  if (
    mouseX > 226 &&
    mouseX < 472 &&
    mouseY > 283 &&
    mouseY < 406 &&
    gameStart == "choose"
  ) {
    gameStart = "story";
    cnv = createCanvas(700, 600);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  }
  if (gameStart == "choose") {
    if (mouseX > 95 && mouseX < 342 && mouseY > 139 && mouseY < 263) {
      gameStart = "playing";
      cnv = createCanvas(800, 600);
      cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    }
  }
    if (gameStart == "i3") {
      gameStart = "choose";
      cnv = createCanvas(700, 600);
      cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  }
  if (gameStart == "i2") {
    gameStart = "i3";
  }
  if (gameStart == "i1") {
      gameStart = "i2";
  }
  if (gameStart == "choose") {
    if (mouseX > 362 && mouseX < 608 && mouseY > 142 && mouseY < 264) {
      gameStart = "i1";
      cnv = createCanvas(800, 600);
      cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    }
  }
  if (gameStart == "startScreen") {
    gameStart = "choose";
    let fs = fullscreen();
    fullscreen(!fs);
    cnv = createCanvas(700, 600);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  }
}

function touchStarted(event) {
  mousePressed();
}
