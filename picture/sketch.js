let appScreen;
let stage = 0;
let answer = "Tees Maar Khan";
let type = "movie";

function setup() {
  if (540 * (windowHeight / 1020) < windowWidth) {
    wh = 540 * (windowHeight / 1020);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 1020 * (windowWidth / 1020);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  fixer = wh / 493.4117647058823;
}

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
  console.log(wh);
}

function preload() {
  appScreen = loadImage("70appscreen.png");
}

function draw() {
  scale(wh / 540);
  image(appScreen, 0, 0);
  if (stage == 1) {
    strokeWeight(10);
    rect(270, 510, 450, 925);
    textSize(40);
    text("Your " + type + " is:", 270, 300);
    text(answer, 270, 510, 400);
    textSize(30);
    text("Click anywhere to continue", 270, 800);
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
  if (stage == 0) {
    //for 70's
    if (
      mouseX > 40 * fixer &&
      mouseX < 462 * fixer &&
      mouseY > 243 * fixer &&
      mouseY < 662 * fixer
    ) {
      answer = "";
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=2",
        "json",
        false,
        function (response) {
          console.log(response);
          answer = response.name;
        }
      );
      type = "movie";
      stage = 1;
    } else if (
      mouseX > 40 * fixer &&
      mouseX < 462 * fixer &&
      mouseY > 689 * fixer &&
      mouseY < 889 * fixer
    ) {
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=3",
        "json",
        false,
        function (response) {
          answer = response.name;
        }
      );
      type = "movie";
      stage = 1;
    }
    //normal one
    /*
    if (
      mouseX > 40 * fixer &&
      mouseX < 222 * fixer &&
      mouseY > 243 * fixer &&
      mouseY < 426 * fixer
    ) {
      answer = "";
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=1",
        "json",
        false,
        function (response) {
          console.log(response);
          answer = response.name;
        }
      );
      type = "movie";
      stage = 1;
    } else if (
      mouseX > 262 * fixer &&
      mouseX < 462 * fixer &&
      mouseY > 243 * fixer &&
      mouseY < 426 * fixer
    ) {
      answer = "";
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=2",
        "json",
        false,
        function (response) {
          console.log(response);
          answer = response.name;
        }
      );
      type = "movie";
      stage = 1;
    } else if (
      mouseX > 40 * fixer &&
      mouseX < 222 * fixer &&
      mouseY > 463 * fixer &&
      mouseY < 662 * fixer
    ) {
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=3",
        "json",
        false,
        function (response) {
          answer = response.name;
        }
      );
      type = "movie";
      stage = 1;
    } else if (
      mouseX > 262 * fixer &&
      mouseX < 462 * fixer &&
      mouseY > 463 * fixer &&
      mouseY < 662 * fixer
    ) {
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=4",
        "json",
        false,
        function (response) {
          answer = response.name;
        }
      );
      type = "character";
      stage = 1;
    } else if (
      mouseX > 40 * fixer &&
      mouseX < 222 * fixer &&
      mouseY > 689 * fixer &&
      mouseY < 889 * fixer
    ) {
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=5",
        "json",
        false,
        function (response) {
          answer = response.name;
        }
      );
      type = "idiom";
      stage = 1;
    } else if (
      mouseX > 262 * fixer &&
      mouseX < 462 * fixer &&
      mouseY > 689 * fixer &&
      mouseY < 889 * fixer
    ) {
      httpGet(
        "https://api.nation-builder.org/api/cards/random?category=" + (int(random(5)) + 1) + "",
        "json",
        false,
        function (response) {
          answer = response.name;
        }
      );
      type = "random";
      stage = 1;
    }
    */
  } else {
    stage = 0;
  }
}

function touchStarted() {
  mousePressed();
}