let buttons = [];
let screen = 0;
let font;
let scrollValue = 0;
let done = 0;
let gox;
let goy;
let photoCount = 10;

function changeScreen(s) {
  screen++;
}

let images = [];

function preload() {
  heartImage = loadImage("backgroundheart.png");
  font = loadFont("monster.ttf");
  kids = loadImage("kids.png");
  dates = loadImage("dates.png");
  plans = loadImage("plans.png");
  v1 = loadImage("v1.png");
  v2 = loadImage("v2.png");
  
  // Load images for picsScreen
  for (let i = 0; i < photoCount; i++) {
    images[i] = loadImage(i + ".jpg");
  }
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
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(font);
  newButton("Start", 250, 195, 100, 40, 250, 150, 150, changeScreen, 0);
  newButton(
    "Photos",
    28 + 45,
    35,
    90,
    35,
    250,
    150,
    150,
    function () {
      screen = 2;
    },
    1
  );
  newButton(
    "Back",
    40,
    25,
    60,
    30,
    250,
    150,
    150,
    function () {
      screen = 1;
    },
    4
  );
  newButton(
    "Back",
    40,
    25,
    60,
    30,
    250,
    150,
    150,
    function () {
      screen = 1;
    },
    3
  );
  newButton(
    "Back",
    40,
    25,
    60,
    30,
    250,
    150,
    150,
    function () {
      screen = 1;
    },
    2
  );
  newButton(
    "Back",
    40,
    25,
    60,
    30,
    250,
    150,
    150,
    function () {
      screen = 1;
    },
    5
  );
  newButton(
    "Dates",
    28 * 2 + 90 + 45,
    35,
    90,
    35,
    250,
    150,
    150,
    function () {
      screen = 3;
    },
    1
  );
  newButton(
    "Family",
    28 * 3 + 90 * 2 + 45,
    35,
    90,
    35,
    250,
    150,
    150,
    function () {
      screen = 4;
    },
    1
  );
  newButton(
    "Plans",
    28 * 4 + 90 * 3 + 45,
    35,
    90,
    35,
    250,
    150,
    150,
    function () {
      screen = 5;
    },
    1
  );
  newButton(
    "Yes",
    90,
    230,
    90,
    35,
    250,
    150,
    150,
    function () {
      done = 1;
      buttons.pop();
      buttons.pop();
    },
    1
  );
  newButton(
    "No",
    210,
    230,
    90,
    35,
    250,
    150,
    150,
    function () {
      gox = random(150, 400);
      goy = random(100, 250);
    },
    1
  );
  gox = buttons[buttons.length - 1].x;
  goy = buttons[buttons.length - 1].y;
}

function centerCanvas() {
  this.cx = (windowWidth - width) / 2;
  this.cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function draw() {
  scale(width / 500, height / 300);
  makeBackground();
  if (screen == 4) {
    familyScreen();
  } else if (screen == 3) {
    datesScreen();
  } else if (screen == 5) {
    plansScreen();
  } else if (screen == 2) {
    picsScreen();
  } else if (screen == 1) {
    askScreen();
  }
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].show(mouseX / (width / 500), mouseY / (height / 300));
  }
  if (done == 0) {
    buttons[buttons.length - 1].x += (gox - buttons[buttons.length - 1].x) / 5;
    buttons[buttons.length - 1].y += (goy - buttons[buttons.length - 1].y) / 5;
  }
}

function askScreen() {
  if (done == 0) {
    image(v1, 0, -10, 500, 300);
  } else {
    image(v2, 0, -10, 500, 300);
  }
}

function datesScreen() {
  image(dates, 10, 0, 500, 300);
}

function plansScreen() {
  image(plans, 10, 0, 500, 300);
}

function familyScreen() {
  image(kids, 115, -scrollValue, 300, 500);
  rect(490, 15 + scrollValue / 0.9, 3, 20, 2, 2);
}

function mouseWheel(event) {
  scrollValue += event.delta;
  if (scrollValue > 223) {
    scrollValue = 223;
  }
  if (scrollValue < 0) {
    scrollValue = 0;
  }
}

function makeBackground() {
  image(heartImage, 0, -5, 200, 200);
  image(heartImage, 200, -5, 200, 200);
  image(heartImage, 400, -5, 200, 200);
  image(heartImage, 0, 195, 200, 200);
  image(heartImage, 200, 195, 200, 200);
  image(heartImage, 400, 195, 200, 200);
  image(heartImage, 0, 0, 500, 300);
  fill(255, 100);
  rect(250, 150, 500, 300);
}

class Button {
  constructor(t, x, y, w, h, r, g, b, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.g = g;
    this.b = b;
    this.c = c;
    this.s = s;
  }
  show(mx, my) {
    if (screen == this.s) {
      if (
        mx > this.x - this.w / 2 &&
        mx < this.x + this.w / 2 &&
        my > this.y - this.h / 2 &&
        my < this.y + this.h / 2
      ) {
        fill(this.r + 30, this.g + 30, this.b + 30);
      } else {
        fill(this.r, this.g, this.b);
      }
      stroke(150, 50, 50);
      strokeWeight(5);
      rect(this.x, this.y, this.w, this.h, 5, 5);
      strokeWeight(0.5);
      stroke(0);
      fill(0);
      text(this.t, this.x, this.y - 2, this.w, this.h);
    }
  }
  pressed(mx, my) {
    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2 &&
      this.s == screen
    ) {
      this.c();
      return true;
    }
  }
}

function newButton(t, x, y, w, h, r, g, b, c, s) {
  buttons.push(new Button(t, x, y, w, h, r, g, b, c, s));
}

function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].pressed(mouseX / (width / 500), mouseY / (height / 300))) {
      return;
    }
  }
}

function picsScreen() {
  let cols = 4;
  let rows = Math.ceil(photoCount / cols);
  let spacing = Math.min(300 / cols, 500 / rows);
  let cropSize, cropX, cropY;
  push();
  translate(110, 33);
  for (let i = 0; i < photoCount; i++) {
    let x = (i % cols) * spacing + spacing / 2;
    let y = Math.floor(i / cols) * spacing + spacing / 2;
    
    // Define cropping dimensions (square aspect ratio)
    let img = images[i];
    let minSide = Math.min(img.width, img.height);
    cropSize = minSide;
    cropX = (img.width - cropSize) / 2;
    cropY = (img.height - cropSize) / 2;
    rectMode(CORNER)
    strokeWeight(3);
    rect(x - spacing / 2 + 5, y - spacing / 2 + 5, spacing - 10, spacing - 10);
    rectMode(CENTER)
    image(img, x - spacing / 2 + 5, y - spacing / 2 + 5, spacing - 10, spacing - 10, cropX, cropY, cropSize, cropSize);
  }
  pop();
}



