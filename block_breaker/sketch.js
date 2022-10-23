let startX1;
let startX2;
let startX3;
let s1;
let s2;
let t1;
let cnv;
let t2;
let man;
let wh;
let ht;
let Background;
let started = false;
let clouds = [];
let bar;
let clods = [];
let states = [];
let guy;
let bImages = [];
let blocks = [];
let puzzles = [];
let waitForBlocks = false;
let timer = 0;
let wereDoingIt = false;
let AlmostThere = false;
let lastOne = false;
let selected = false;
let numS;
let looks = [];
let blink;
let x;
let one = 1;
let level = 1;
let numM = 100000000;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function preload() {
  s1 = loadImage("StartScreen1.png");
  s2 = loadImage("StartScreen2.png");
  t1 = loadImage("Text1.png");
  t2 = loadImage("Text2.png");
  man = loadImage("man.png");
  Background = loadImage("Background.png");
  Background1 = loadImage("Background1.png");
  clouds.push(loadImage("Cloud1.png"));
  clouds.push(loadImage("Cloud2.png"));
  clouds.push(loadImage("Cloud3.png"));
  clouds.push(loadImage("Cloud4.png"));
  clouds.push(loadImage("Cloud5.png"));
  states.push(loadImage("manFalling.png"));
  states.push(loadImage("eyes1.png"));
  bImages.push(loadImage("b1.png"));
  bImages.push(loadImage("b2.png"));
  bImages.push(loadImage("b3.png"));
  bImages.push(loadImage("b4.png"));
  bImages.push(loadImage("b5.png"));
  bar = loadImage("done.png");
  fontt = loadFont("Comfortaa-Regular.ttf");
  eyes = loadImage("manStill.png");
  brick = loadImage("brick1.png");
  blink = loadImage("blink.png");
  looks.push(loadImage("1.png"));
  looks.push(loadImage("2.png"));
  looks.push(loadImage("3.png"));
  looks.push(loadImage("eyes1.png"));
  looks.push(loadImage("eyes1.png"));
  x = loadImage("x.png");
  here = loadImage("here.png");
}

function setup() {
  textFont(fontt);
  one = getItem("one");
  if (one == null) {
    one = 1;
  }
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  startX1 = -350 * (wh / 500);
  startX2 = -350 * (wh / 500);
  startX3 = -350 * (wh / 500);
  guy = new Man();
  textSize(25 * (wh / 500));
}

function draw() {
  if (started != "go") {
    image(
      Background,
      0,
      0,
      Background.width * (wh / Background.width),
      Background.height * (ht / Background.height)
    );
  } else {
    image(
      Background1,
      0,
      0,
      Background.width * (wh / Background.width),
      Background.height * (ht / Background.height)
    );
  }
  if (started == false) {
    if (
      mouseX > 193 * (wh / 500) &&
      mouseX < 311 * (wh / 500) &&
      mouseY > 206 * (wh / 500) &&
      mouseY < 251 * (wh / 500)
    ) {
      image(s2, 0, 0, s1.width * (wh / s1.width), s1.height * (ht / s1.height));
    } else {
      image(s1, 0, 0, s2.width * (wh / s2.width), s2.height * (ht / s2.height));
    }
  } else {
    startX3 += 7 * (wh / 500);
  }
  if (started == false) {
    if (startX3 < 0) {
      startX3 += 7 * (wh / 500);
    }
    if (startX1 < 0) {
      startX1 += 10 * (wh / 500);
    }
    if (startX2 < 0 && startX1 > -150 * (wh / 500)) {
      startX2 += 10 * (wh / 500);
    }
  } else {
    if (startX3 < 350 * (wh / 500)) {
      startX3 += 7 * (wh / 500);
    }
    if (startX1 > -350 * (wh / 500)) {
      startX1 -= 10 * (wh / 500);
    }
    if (startX2 > -350 * (wh / 500)) {
      startX2 -= 10 * (wh / 500);
    }
    if (
      startX1 <= -350 * (wh / 500) &&
      startX2 <= -350 * (wh / 500) &&
      startX3 >= 350
    ) {
      started = "go";
      if (clods.length < 10) {
        for (let i = 0; i < 10; i++) {
          clods.push(new Cloud());
          clods[i].num = i;
        }
      }
      if (
        int(random(150)) == 25 &&
        guy.state == states[0] &&
        waitForBlocks == false
      ) {
        blocks.push(new Block());
        blocks.push(new Block());
        while (blocks[0].image == blocks[1].image && blocks[0].number != blocks[1].number) {
          blocks[1].image = bImages[int(random(5))];
        }
        if (blocks[0].image != blocks[1].image && blocks[0].number == blocks[1].number) {
          blocks[1].image = blocks[0].image
        }
        blocks.push(new Block());
        while (blocks[0].number == blocks[1].number && blocks[2].number == blocks[0].number) {
          blocks[2].choose()
        }
        while (blocks[0].image == blocks[2].image && blocks[0].number != blocks[2].number) {
          blocks[2].image = bImages[int(random(5))];
        }
        if (blocks[0].image != blocks[2].image && blocks[0].number == blocks[2].number) {
          blocks[2].image = blocks[0].image
        }
        while (blocks[2].image == blocks[1].image && blocks[2].number != blocks[1].number) {
          blocks[2].image = bImages[int(random(5))];
        }
        if (blocks[2].image != blocks[1].image && blocks[2].number == blocks[1].number) {
          blocks[2].image = blocks[1].image
        }
        numM = blocks[0].numI*blocks[1].numI*blocks[2].numI
        blocks[0].x -= 67 * (wh / 500);
        blocks[2].x += 67 * (wh / 500);
        waitForBlocks = true;
      }
      if (waitForBlocks == true) {
        for (let i = 0; i < blocks.length; i++) {
          if (
            blocks[i].y - 67 * (wh / 500) > 0 &&
            blocks[i].y - 67 * (wh / 500) < 40 * (wh / 500)
          ) {
            blocks[i].y -= blocks[i].y - 67 * (wh / 500);
          } else if (blocks[i].y - 67 * (wh / 500) > 0) {
            blocks[i].y -= 40 * (wh / 500);
          } else {
            guy.state = states[1];
            waitForBlocks = false;
            guy.image = 6;
            console.log(one);
            if (one == 1) {
              guy.image = 1;
              image(
                here,
                0,
                0,
                here.width * (wh / here.width),
                here.height * (ht / here.height)
              );
              noLoop();
            }
          }
        }
      }
    }
  }
  image(
    t1,
    startX1,
    0,
    t1.width * (wh / t1.width),
    t1.height * (ht / t1.height)
  );
  image(
    t2,
    startX2,
    0,
    t2.width * (wh / t2.width),
    t2.height * (ht / t2.height)
  );
  image(
    man,
    0,
    startX3,
    man.width * (wh / man.width),
    man.height * (ht / man.height)
  );
  if (started == "go") {
    image(x, 0, 0, x.width * (wh / x.width), x.height * (ht / x.height));
    imageMode(CENTER);
    for (let i = 0; i < clods.length; i++) {
      clods[i].show();
    }
    imageMode(CORNER);
    if (blocks.length == 0) {
      guy.state = states[0];
    }
    guy.show();
  }
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].show();
  }
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].yes == true) {
      blocks[i].show();
    }
  }
  if (
    guy.state == states[1] &&
    timer == 0 &&
    blocks[0].number == blocks[1].number &&
    blocks[1].number == blocks[2].number
  ) {
    timer = 50;
    wereDoingIt = true;
  }
  if (timer > 0) {
    timer--;
  }
  if (timer == 1 && wereDoingIt == true) {
    wereDoingIt = false;
    AlmostThere = true;
    timer = 50;
  } else {
    if (timer == 1 && AlmostThere == true) {
      lastOne = true;
      blocks = [];
      AlmostThere = false;
      timer = 30;
      level += 1;
    } else {
      if (timer == 1 && lastOne == true) {
        lastOne = false;
        timer = 0;
      }
    }
  }
  if (AlmostThere == true) {
    image(
      bar,
      blocks[1].x,
      blocks[1].y,
      blocks[1].image.width * (wh / blocks[1].image.width),
      blocks[1].image.height * (ht / blocks[1].image.height)
    );
    textAlign(CENTER, CENTER);
    text(blocks[1].number, blocks[1].x + wh / 2, blocks[1].y + ht / 2);
  } else {
    if (lastOne == true) {
      guy.image = "atf";
    }
  }
  if (selected == true) {
    if (
      mouseX > 362 * (wh / 1196) &&
      mouseX < 507 * (wh / 1196) &&
      mouseY > 446 * (wh / 1196) &&
      mouseY < 592 * (wh / 1196) &&
      lastOne == false
    ) {
      blocks[0].yes = true;
    } else {
      blocks[0].yes = false;
    }
    if (
      mouseX > 526 * (wh / 1196) &&
      mouseX < 666 * (wh / 1196) &&
      mouseY > 446 * (wh / 1196) &&
      mouseY < 592 * (wh / 1196) &&
      lastOne == false
    ) {
      blocks[1].yes = true;
    } else {
      blocks[1].yes = false;
    }
    if (
      mouseX > 688 * (wh / 1196) &&
      mouseX < 828 * (wh / 1196) &&
      mouseY > 446 * (wh / 1196) &&
      mouseY < 592 * (wh / 1196) &&
      lastOne == false
    ) {
      blocks[2].yes = true;
    } else {
      blocks[2].yes = false;
    }
  }
  if (
    mouseX > 362 * (wh / 1196) &&
    mouseX < 507 * (wh / 1196) &&
    mouseY > 446 * (wh / 1196) &&
    mouseY < 592 * (wh / 1196)
  ) {
  } else {
    if (blocks[0]) {
      blocks[0].yes = false;
    }
  }
  if (
    mouseX > 526 * (wh / 1196) &&
    mouseX < 666 * (wh / 1196) &&
    mouseY > 446 * (wh / 1196) &&
    mouseY < 592 * (wh / 1196)
  ) {
  } else {
    if (blocks[1]) {
      blocks[1].yes = false;
    }
  }
  if (
    mouseX > 688 * (wh / 1196) &&
    mouseX < 828 * (wh / 1196) &&
    mouseY > 446 * (wh / 1196) &&
    mouseY < 592 * (wh / 1196)
  ) {
  } else {
    if (blocks[2]) {
      blocks[2].yes = false;
    }
  }
  if (
    guy.state == states[1] &&
    wereDoingIt == false &&
    AlmostThere == false &&
    lastOne == false
  ) {
    image(
      brick,
      0,
      0,
      brick.width * (wh / brick.width),
      brick.height * (ht / brick.height)
    );
    text("2", 468 * (wh / 500), 90 * (wh / 500));
    image(
      brick,
      0,
      50 * (wh / 500),
      brick.width * (wh / brick.width),
      brick.height * (ht / brick.height)
    );
    text("3", 468 * (wh / 500), 141 * (wh / 500));
    image(
      brick,
      0,
      50 * 2 * (wh / 500),
      brick.width * (wh / brick.width),
      brick.height * (ht / brick.height)
    );
    text("4", 468 * (wh / 500), 192 * (wh / 500));
    if (level > 6) {
      image(
        brick,
        0,
        50 * 3 * (wh / 500),
        brick.width * (wh / brick.width),
        brick.height * (ht / brick.height)
      );
      text("5", 468 * (wh / 500), 241 * (wh / 500));
    }
    if (selected) {
      if (
        blocks[0].yes == false &&
        blocks[1].yes == false &&
        blocks[2].yes == false
      ) {
        image(
          brick,
          mouseX - wh + 30 * (wh / 500),
          mouseY - 90 * (wh / 500),
          brick.width * (wh / brick.width),
          brick.height * (ht / brick.height)
        );
        text(numS.toString(), mouseX - 2 * (wh / 500), mouseY);
      }
    }
  }
  if (one == 1 && guy.image == 1 && guy.state == states[1]) {
    image(
      here,
      0,
      0,
      here.width * (wh / here.width),
      here.height * (ht / here.height)
    );
    noLoop();
  }
}

function mousePressed() {
  if (
    mouseX > 193 * (wh / 500) &&
    mouseX < 311 * (wh / 500) &&
    mouseY > 206 * (wh / 500) &&
    mouseY < 251 * (wh / 500) &&
    started == false
  ) {
    started = true;
  }
  if (
    guy.state == states[1] &&
    wereDoingIt == false &&
    AlmostThere == false &&
    lastOne == false
  ) {
    if (
      mouseX > 1078 * (wh / 1196) &&
      mouseX < 1160 * (wh / 1196) &&
      mouseY > 178 * (wh / 1196) &&
      mouseY < 263 * (wh / 1196)
    ) {
      selected = true;
      numS = 2;
    }
    if (
      mouseX > 1078 * (wh / 1196) &&
      mouseX < 1160 * (wh / 1196) &&
      mouseY > 299 * (wh / 1196) &&
      mouseY < 379 * (wh / 1196)
    ) {
      selected = true;
      numS = 3;
    }
    if (
      mouseX > 1078 * (wh / 1196) &&
      mouseX < 1160 * (wh / 1196) &&
      mouseY > 421 * (wh / 1196) &&
      mouseY < 501 * (wh / 1196)
    ) {
      selected = true;
      numS = 4;
    }
    if (
      mouseX > 1078 * (wh / 1196) &&
      mouseX < 1160 * (wh / 1196) &&
      mouseY > 542 * (wh / 1196) &&
      mouseY < 622 * (wh / 1196) &&
      level > 6
    ) {
      selected = true;
      numS = 5;
    }
  }
  if (
    started == "go" &&
    mouseX > 0 * (wh / 1196) &&
    mouseX < 66 * (wh / 1196) &&
    mouseY > 0 * (wh / 1196) &&
    mouseY < 69 * (wh / 1196)
  ) {
    started = false;
    startX1 = 0;
    startX2 = 0;
    startX3 = 0;
    clods = [];
    blocks = [];
    waitForBlocks = false;
    wereDoingIt = false;
    AlmostThere = false;
    lastOne = false;
    selected = false;
    timer = 0;
    guy.state = states[0];
  }
  if (started == "go" && one == 1 && guy.state == states[1]) {
    one = 0;
    console.log("hello");
    storeItem("one", one);
    loop();
  }
  if (
    started == "go" &&
    mouseX > 1130 * (wh / 1196) &&
    mouseX < 1196 * (wh / 1196) &&
    mouseY > 0 * (wh / 1196) &&
    mouseY < 69 * (wh / 1196)
  ) {
    one = 1;
    console.log("hello2");
  }
  return false;
}

function mouseReleased() {
  if (selected == true) {
    if (
      mouseX > 362 * (wh / 1196) &&
      mouseX < 507 * (wh / 1196) &&
      mouseY > 446 * (wh / 1196) &&
      mouseY < 592 * (wh / 1196)
    ) {
      blocks[0].number = blocks[0].number * numS;
      selected = false;
      while ((blocks[0].image == blocks[1].image && blocks[0].number != blocks[1].number) || (blocks[0].image == blocks[2].image && blocks[0].number != blocks[2].number)) {
        blocks[0].image = bImages[int(random(5))];
      }
      if (blocks[0].image != blocks[1].image && blocks[0].number == blocks[1].number) {
        blocks[0].image = blocks[1].image
      }
      if (blocks[0].image != blocks[2].image && blocks[0].number == blocks[2].number) {
        blocks[0].image = blocks[2].image
      }
    }
    if (
      mouseX > 526 * (wh / 1196) &&
      mouseX < 666 * (wh / 1196) &&
      mouseY > 446 * (wh / 1196) &&
      mouseY < 592 * (wh / 1196)
    ) {
      blocks[1].number = blocks[1].number * numS;
      selected = false;
      while ((blocks[1].image == blocks[0].image && blocks[1].number != blocks[0].number) || (blocks[1].image == blocks[2].image && blocks[1].number != blocks[2].number)) {
        blocks[1].image = bImages[int(random(5))];
      }
      if (blocks[1].image != blocks[0].image && blocks[1].number == blocks[0].number) {
        blocks[1].image = blocks[0].image
      }
      if (blocks[1].image != blocks[2].image && blocks[1].number == blocks[2].number) {
        blocks[1].image = blocks[2].image
      }
    }
    if (
      mouseX > 688 * (wh / 1196) &&
      mouseX < 828 * (wh / 1196) &&
      mouseY > 446 * (wh / 1196) &&
      mouseY < 592 * (wh / 1196)
    ) {
      blocks[2].number = blocks[2].number * numS;
      selected = false;
      while ((blocks[2].image == blocks[0].image && blocks[2].number != blocks[0].number) || (blocks[2].image == blocks[1].image && blocks[2].number != blocks[1].number)) {
        blocks[2].image = bImages[int(random(5))];
      }
      if (blocks[2].image != blocks[0].image && blocks[2].number == blocks[0].number) {
        blocks[2].image = blocks[0].image
      }
      if (blocks[2].image != blocks[1].image && blocks[2].number == blocks[1].number) {
        blocks[2].image = blocks[1].image
      }
    }
    selected = false;
  }
  return false;
}