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
let l = [];
let m = [];
let blocks = [];
let dragged = -1;
let open = 0;
let shape = "r";
let playing = false;
let music;
let f = true;
let mg = 1;
let sw;
let x;
let page = 1;
let savedLevels = [];
let working = 0;
let tt = 0;
let ll = 28;
let a;
let a2;
let message = false;

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
  back = loadImage("back.png");
  for (let i = 1; i < 13; i++) {
    nfaces.push(loadImage("n" + i + ".png"));
  }
  music = loadSound("music.wav");
  sw = loadImage("switch.png");
  x = loadImage("x.png");
  a = loadImage("arrow.png");
  a2 = loadImage("arrow2.png");
  shareImg = loadImage("share.png");
}

function setup() {
  let height = windowHeight - 60;
  let width = document.getElementById("myParent").offsetWidth;
  if (500 * (height / 300) < width) {
    wh = 500 * (height / 300);
    ht = height;
  } else {
    wh = width;
    ht = 300 * (width / 500);
  }
  document.getElementById("myParent").style.height = ht + "px";
  cnv = createCanvas(wh, ht);
  cnv.parent("myParent");
  centerCanvas(width, ht);
  nextLevel(false);
  textFont(font);
  textAlign(CENTER, CENTER);
  if (getItem("levels") == null) {
    levels = [];
    levels.push("u");
    for (let i = 1; i < 42; i++) {
      levels.push("l");
    }
  } else {
    levels = getItem("levels");
    while (levels.length < 28) {
      levels.push("l");
    }
  }
  if (getItem("slevels") != null) {
    savedLevels = getItem("slevels");
  }
  let params = getURLParams();
  console.log(params.sharedLevel);
  if (params.sharedLevel != undefined) {
    console.log(params.sharedLevel);
    httpGet("https://api2.thegamebox.ca/api/red-remover-levels?filters[guid]=" + params.sharedLevel, "json", false, function(response) {decodeToBlocks(response.data[0].attributes.level_code)});
    pos = 0;
    level = -1;
    working = savedLevels.length;
    blocks = [];
  }
}

function centerCanvas(ww, wh) {
  let cx = (ww - width) / 2;
  let cy = (wh - height) / 2 + 25;
  cnv.position(cx, cy);
}

function mouseWheel(event) {
  if (
    pos + event.delta >= 0 &&
    ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
      25 -
      (pos + event.delta + 65) >
      60
  ) {
    pos += event.delta;
    return false;
  }
}

function draw() {
  if (music.isPlaying() == false) {
    music.play();
  }
  if (level == -2) {
    background(243, 224, 207);
    push();
    scale(wh / 500);
    translate(0, -pos + 65);
    strokeWeight(4);
    imageMode(CENTER);
    stroke(75, 0, 0);
    fill(255, 120, 120);
    circle(35, 35 - 65, 40);
    image(back, 35, 35 - 65, back.width / 17, back.height / 17);
    fill(0);
    textSize(40);
    noStroke();
    text("Levels", 250, 40 - 80);
    textSize(10);
    strokeWeight(3);
    stroke(0);
    for (
      let i = 0;
      i < (savedLevels.length - (savedLevels.length % 3)) / 3;
      i++
    ) {
      for (let j = 0; j < 3; j++) {
        fill(200, 230, 255);
        rect(j * 150 + 30, i * 100 + 25, 130, 80, 10, 10);
        fill(234, 183, 86);
        blocks = [];
        decodeToBlocks(savedLevels[i * 3 + j]);
        textSize(20);
        circle(j * 150 + 30 + 3, i * 100 + 25 + 2.5, 30);
        fill(0);
        noStroke();
        text(i * 3 + j + 1, j * 150 + 30 + 3, i * 100 + 22 + 2.5);
        stroke(0);
        for (let k = 0; k < blocks.length; k++) {
          push();
          strokeWeight(1);

          translate(j * 150 + 30 + 3, i * 100 + 25 + 2.5);
          scale(0.25);
          scale(1 / (wh / 500));
          blocks[k].show();
          strokeWeight(3);
          pop();
        }
        //rect(j * 150 + 35, i * 100 + 80, 120, 20, 5, 5);
      }
    }
    for (let j = 0; j < (savedLevels.length % 3) + 1; j++) {
      if (j == savedLevels.length % 3) {
        if (
          mouseX > ((savedLevels.length % 3) * 150 + 30) * (wh / 500) &&
          mouseX < ((savedLevels.length % 3) * 150 + 30 + 130) * (wh / 500) &&
          mouseY >
            (((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
              155 -
              (pos + 65)) *
              (wh / 500) &&
          mouseY <
            (((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
              155 -
              (pos + 65) +
              80) *
              (wh / 500)
        ) {
          fill(230);
        } else {
          fill(255);
        }
        rect(
          j * 150 + 30,
          ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 25,
          130,
          80,
          10,
          10
        );
        fill(0);
        textSize(50);
        noStroke();
        text(
          "+",
          j * 150 + 30 + 67,
          ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 25 + 29
        );
        stroke(0);
      } else {
        fill(200, 230, 255);
        rect(
          j * 150 + 30,
          ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 25,
          130,
          80,
          10,
          10
        );
        blocks = [];
        decodeToBlocks(
          savedLevels[savedLevels.length - (savedLevels.length % 3) + j]
        );
        for (let k = 0; k < blocks.length; k++) {
          push();
          strokeWeight(1);
          translate(
            j * 150 + 32.75,
            ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 28
          );
          scale(0.25);
          scale(1 / (wh / 500));
          blocks[k].show();
          strokeWeight(3);
          pop();
        }
        fill(234, 183, 86);
        textSize(20);
        circle(
          j * 150 + 30,
          ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 25,
          30
        );
        fill(0);
        noStroke();
        text(
          savedLevels.length - (savedLevels.length % 3) + j,
          j * 150 + 30,
          ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 23
        );
        stroke(0);
        /* rect(
          j * 150 + 35,
          ((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 + 80,
          120,
          20,
          5,
          5
        ); */
      }
    }
    pop();
  } else {
    if (level != -1 || playing == true) {
      background(200, 230, 255);
      passed = true;
      tt++;
      if (checkIfStill()) {
        for (let i = 0; i < les.length; i++) {
          if (
            les[i].type == "sr" ||
            les[i].type == "r" ||
            les[i].type == "dr"
          ) {
            if (
              les[i].sprite.y < 300 &&
              les[i].sprite.y > 0 &&
              les[i].sprite.x < 500 &&
              les[i].sprite.x > 0
            ) {
              passed = false;
            }
          } else if (les[i].type == "g" || les[i].type == "dg") {
            if (
              les[i].sprite.y > 400 ||
              les[i].sprite.y < -100 ||
              les[i].sprite.x > 600 ||
              les[i].sprite.x < -100
            ) {
              passed = false;
              nextLevel(false);
            }
          }
        }
        if (passed == true) {
          if (level > 0) {
            passing = true;
            resetLevel();
            if (levels[level] == "l") {
              levels[level] = "u";
            }
            levels[level - 1] = "d";
            storeItem("levels", levels);
          } else {
            passing = true;
            resetLevel();
          }
        }
      }
      for (let i = 0; i < les.length; i++) {
        if (level != -1) {
          if (les[i].sprite.y > 600 && les[i].type == "g") {
            resetLevel();
            nextLevel(false);
            break;
          }
          if (les[i].sprite.y < -600 && les[i].type == "g") {
            resetLevel();
            nextLevel(false);
            break;
          }
          if (les[i].sprite.x > 800 && les[i].type == "g") {
            resetLevel();
            nextLevel(false);
            break;
          }
          if (les[i].sprite.x < -800 && les[i].type == "g") {
            resetLevel();
            nextLevel(false);
            break;
          }
        } else {
          if (les[i].sprite.y > 400 && les[i].type == "g") {
            resetLevel();
            let coded = code();
            playing = true;
            decode(coded);
            break;
          }
          if (les[i].sprite.y < -400 && les[i].type == "g") {
            resetLevel();
            let coded = code();
            playing = true;
            decode(coded);
            break;
          }
          if (les[i].sprite.x > 600 && les[i].type == "g") {
            resetLevel();
            let coded = code();
            playing = true;
            decode(coded);
            break;
          }
          if (les[i].sprite.x < -600 && les[i].type == "g") {
            resetLevel();
            let coded = code();
            playing = true;
            decode(coded);
            break;
          }
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
        if (level != ll) {
          rect(255, 150, 120, 50);
        }
        textSize(20);
        fill(0);
        let move = 65;
        if (level == -1) {
          text("Save", 183.5, 172);
        } else {
          text("All Levels", 183.5, 172);
        }
        if (level == -1) {
          text("Edit", 314, 172);
        } else {
          if (level != ll) {
            text("Next level", 314, 172);
          }
        }
        pop();
      } else if (level == 0) {
        push();
        scale(wh / 500);
        fill(243, 224, 207);
        rect(0, 0, 500, 300);
        fill(0);
        textSize(40);
        push();
        translate(0, -15);
        text("Red Remover", 250, 48);
        fill(232, 59, 46);
        text("Red", 160.1, 48);
        pop();
        strokeWeight(4);
        stroke(214 / 3, 153 / 3, 56 / 3);
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
        text(
          "Look at the shapes faces to see which way they will fall",
          250,
          70
        );
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
      if ((passing == false && level > 0) || playing == true) {
        push();
        scale(wh / 500);
        fill(255);
        if (level > 2 || (playing == true && passing == false)) {
          rect(-5, 280, 70, 40, 5, 5);
          fill(0);
          textSize(15);
          text("Reset", 32, 288.5);
        }
        fill(255);
        if (passing == false) {
          rect(445, 280, 70, 40, 5, 5);
        }
        fill(0);
        textSize(15);
        if (level != -1) {
          text("Exit", 473, 288.5);
        } else {
          if (passing == false) {
            text("Edit", 473, 288.5);
          }
        }
        pop();
      }
    } else if (level == -1) {
      background(200, 230, 255);
      if (dragged > -1) {
        blocks[dragged].x = mouseX / (wh / 550);
        blocks[dragged].y = mouseY / (wh / 550);
      }
      if (playing == 0) {
        for (let i = 0; i < blocks.length; i++) {
          if (dragged != i) {
            blocks[i].show();
          }
        }
      }
      push();
      scale(wh / 500);
      fill(214, 153, 56);
      circle(40, 260, 50);
      imageMode(CENTER);
      image(hfaces[0], 40, 260, hfaces[0].width / 15, hfaces[0].height / 15);
      angleMode(DEGREES);
      rectMode(CENTER);
      if (open == 1) {
        fill(255, 100, 100);
        if (shape == "r") {
          rect(100, 260, 35, 35);
        } else {
          circle(100, 260, 35);
        }
        push();
        translate(100, 260);
        rotate(90 * (mg - 1));
        drawFace("r", 0, 0);
        pop();
        fill(255, 135, 135);
        if (shape == "r") {
          rect(300, 260, 35, 35);
          makeScrews(300, 260, 35, 35);
        }
        fill(225, 10, 10);
        if (shape == "r") {
          rect(150, 260, 35, 35);
        } else {
          circle(150, 260, 35);
        }
        push();
        translate(150, 260);
        rotate(90 * (mg - 1));
        drawFace("r", 0, 0);
        pop();
        fill(200, 255, 200);
        if (shape == "r") {
          rect(350, 260, 35, 35);
          makeScrews(350, 260, 35, 35);
        }
        fill(125, 255, 125);
        if (shape == "r") {
          rect(200, 260, 35, 35);
        } else {
          circle(200, 260, 35);
        }
        push();
        translate(200, 260);
        rotate(90 * (mg - 1));
        drawFace("g", 0, 0);
        pop();
        fill(200, 200, 255);
        if (shape == "r") {
          rect(400, 260, 35, 35);
          makeScrews(400, 260, 35, 35);
        }
        fill(150, 150, 255);
        if (shape == "r") {
          rect(250, 260, 35, 35);
        } else {
          circle(250, 260, 35);
        }
        push();
        translate(250, 260);
        rotate(90 * (mg - 1));
        drawFace("b", 0, 0);
        pop();
        fill(225, 250, 255);
        rect(455, 250, 55, 15);
        rect(455, 270, 55, 15);
        image(sw, 455, 260, 48, 35);
      }
      strokeWeight(4);
      stroke(75, 0, 0);
      fill(255, 120, 120);
      circle(35, 35, 40);
      stroke(105, 30, 30);
      fill(255, 155, 155);
      circle(465, 35, 40);
      stroke(0, 75, 0);
      fill(120, 255, 120);
      circle(410, 35, 40);
      stroke(0, 0, 75);
      fill(120, 120, 255);
      circle(355, 35, 40);
      if (message == true) {
        stroke(0);
        strokeWeight(1);
        fill(255);
        rect(250, 20, 120, 20, 3, 3);
        noStroke();
        fill(0);
        textSize(8);
        text("Link copied to clipboard", 250, 19);
        strokeWeight(4);
      }
      push();
      stroke(0);
      fill(100, 200, 100);
      strokeJoin(ROUND);
      translate(406.5, 26);
      scale(0.5, 0.5);
      triangle(0, 0, 25, 20, 0, 35);
      strokeJoin(CORNER);
      pop();
      image(back, 35, 35, back.width / 17, back.height / 17);
      image(x, 465, 35, x.width / 17, x.height / 17);
      image(shareImg, 355, 35, x.width / 17, x.height / 17);
      pop();
      if (dragged >= 0 && playing == 0) {
        blocks[dragged].show();
      }
      camera.x = 250;
      camera.y = 150;
      camera.zoom = wh / 550;
    } else {
      background(0);
    }
  }
  if (page == 2 && level == 0) {
    push();
    textSize(25);
    scale(wh / 500);
    fill(0);
    text("More levels coming soon!", 250, 170);
    pop();
  }
}

function mouseReleased() {
  if (level == -1 && playing == false) {
    for (let i = blocks.length - 1; i > -1; i--) {
      if (blocks[i].y > 250 && open == 1 && dragged == i) {
        blocks.splice(i, 1);
      } else {
        blocks[i].scaling = false;
        if (dist(blocks[i].x, 0, 275, 0) < 10) {
          blocks[i].x = 275;
        }
      }
    }
    dragged = -1;
  }
}

function savee() {
  playing = false;
  level = -2;
  savedLevels[working] = code();
  storeItem("slevels", savedLevels);
}

function mousePressed() {
  if (message == true) {
    message = false;
  } else {
    if (level == -2) {
      if (
        dist(mouseX, mouseY, 35 * (wh / 500), (35 - pos) * (wh / 500)) <
        20 * (wh / 500)
      ) {
        level = 0;
      }
      if (
        mouseX > ((savedLevels.length % 3) * 150 + 30) * (wh / 500) &&
        mouseX < ((savedLevels.length % 3) * 150 + 30 + 130) * (wh / 500) &&
        mouseY >
          (((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
            155 -
            (pos + 65)) *
            (wh / 500) &&
        mouseY <
          (((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
            155 -
            (pos + 65) +
            80) *
            (wh / 500)
      ) {
        level = -1;
        working = savedLevels.length;
        blocks = [];
      } else {
        for (
          let i = 0;
          i < (savedLevels.length - (savedLevels.length % 3)) / 3;
          i++
        ) {
          for (let j = 0; j < 3; j++) {
            if (
              mouseX > (j * 150 + 30) * (wh / 500) &&
              mouseX < (j * 150 + 30 + 130) * (wh / 500) &&
              mouseY > (i * 100 + 155 - (pos + 65)) * (wh / 500) &&
              mouseY < (i * 100 + 155 + 80 - (pos + 65)) * (wh / 500)
            ) {
              working = i * 3 + j;
              playing = false;
              level = -1;
              blocks = [];
              decodeToBlocks(savedLevels[i * 3 + j]);
            }
          }
        }
        for (let j = 0; j < savedLevels.length % 3; j++) {
          if (
            mouseX > (j * 150 + 30) * (wh / 500) &&
            mouseX < (j * 150 + 30 + 130) * (wh / 500) &&
            mouseY >
              (((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
                155 -
                (pos + 65)) *
                (wh / 500) &&
            mouseY <
              (((savedLevels.length - (savedLevels.length % 3)) / 3) * 100 +
                155 +
                80 -
                (pos + 65)) *
                (wh / 500)
          ) {
            working = savedLevels.length - (savedLevels.length % 3) + j;
            playing = false;
            level = -1;
            blocks = [];
            decodeToBlocks(
              savedLevels[savedLevels.length - (savedLevels.length % 3) + j]
            );
          }
        }
      }
    } else {
      if (level == -1 && playing == false) {
        if (
          dist(mouseX, mouseY, 35 * (wh / 500), 35 * (wh / 500)) <
          20 * (wh / 500)
        ) {
          level = -2;
          pos = 0;
          resetLevel();
        } else {
          if (
            dist(mouseX, mouseY, 410 * (wh / 500), 35 * (wh / 500)) <
            20 * (wh / 500)
          ) {
            playy();
          } else if (
            dist(mouseX, mouseY, 465 * (wh / 500), 35 * (wh / 500)) <
            20 * (wh / 500)
          ) {
            blocks = [];
            mg = 1;
            shape = "r";
          } else if (dist(mouseX, mouseY, 355 * (wh / 500), 35 * (wh / 500)) <
          20 * (wh / 500)) {
            share();
          }
        }
      }
      if (level == -1 && playing == false) {
        if (
          dist(40 * (wh / 500), 260 * (wh / 500), mouseX, mouseY) <
          25 * (wh / 500)
        ) {
          if (open == 0) {
            open = 1;
          } else {
            open = 0;
          }
        } else if (mouseY < 228 * (wh / 500) || open == 0) {
          let scaling = false;
          for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].shape != "c") {
              if (
                dist(
                  mouseX / (wh / 550),
                  mouseY / (wh / 550),
                  blocks[i].x - blocks[i].w / 2,
                  blocks[i].y - blocks[i].h / 2
                ) < 5
              ) {
                scaling = true;
                blocks[i].scaling = 1;
                blocks[i].fmx = mouseX;
                blocks[i].fmy = mouseY;
              } else if (
                dist(
                  mouseX / (wh / 550),
                  mouseY / (wh / 550),
                  blocks[i].x + blocks[i].w / 2,
                  blocks[i].y - blocks[i].h / 2
                ) < 5
              ) {
                scaling = true;
                blocks[i].scaling = 2;
                blocks[i].fmx = mouseX;
                blocks[i].fmy = mouseY;
              } else if (
                dist(
                  mouseX / (wh / 550),
                  mouseY / (wh / 550),
                  blocks[i].x + blocks[i].w / 2,
                  blocks[i].y + blocks[i].h / 2
                ) < 5
              ) {
                scaling = true;
                blocks[i].scaling = 3;
                blocks[i].fmx = mouseX;
                blocks[i].fmy = mouseY;
              } else if (
                dist(
                  mouseX / (wh / 550),
                  mouseY / (wh / 550),
                  blocks[i].x - blocks[i].w / 2,
                  blocks[i].y + blocks[i].h / 2
                ) < 5
              ) {
                scaling = true;
                blocks[i].scaling = 4;
                blocks[i].fmx = mouseX;
                blocks[i].fmy = mouseY;
              }
            } else if (
              dist(
                mouseX / (wh / 550),
                mouseY / (wh / 550),
                blocks[i].x + blocks[i].w / 2,
                blocks[i].y
              ) < 5
            ) {
              scaling = true;
              blocks[i].scaling = 1;
              blocks[i].fmx = mouseX;
              blocks[i].fmy = mouseY;
            }
          }
          if (scaling == false) {
            for (let i = 0; i < blocks.length; i++) {
              if (
                mouseX / (wh / 550) > blocks[i].x - blocks[i].w / 2 &&
                mouseX / (wh / 550) < blocks[i].x + blocks[i].w / 2 &&
                mouseY / (wh / 550) > blocks[i].y - blocks[i].h / 2 &&
                mouseY / (wh / 550) < blocks[i].y + blocks[i].h / 2
              ) {
                dragged = i;
                break;
              }
            }
          }
        } else if (open == 1) {
          let type = " ";
          if (
            mouseX > 81 * (wh / 500) &&
            mouseX < 117 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500)
          ) {
            type = "r";
          }
          if (
            mouseX > 132 * (wh / 500) &&
            mouseX < 168 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500)
          ) {
            type = "dr";
          }
          if (
            mouseX > 182 * (wh / 500) &&
            mouseX < 218 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500)
          ) {
            type = "g";
          }
          if (
            mouseX > 232 * (wh / 500) &&
            mouseX < 267 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500)
          ) {
            type = "b";
          }
          if (
            mouseX > 282 * (wh / 500) &&
            mouseX < 317 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500) &&
            shape == "r"
          ) {
            type = "sr";
          }
          if (
            mouseX > 332 * (wh / 500) &&
            mouseX < 367 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500) &&
            shape == "r"
          ) {
            type = "sg";
          }
          if (
            mouseX > 382 * (wh / 500) &&
            mouseX < 418 * (wh / 500) &&
            mouseY > 242 * (wh / 500) &&
            mouseY < 278 * (wh / 500) &&
            shape == "r"
          ) {
            type = "sb";
          }
          if (type != " ") {
            blocks.push(
              new MakerBlock(
                type,
                mouseX / (wh / 550),
                mouseY / (wh / 550),
                35,
                35,
                mg,
                shape
              )
            );
            dragged = blocks.length - 1;
          }
          if (
            mouseX > 427 * (wh / 500) &&
            mouseY > 241 * (wh / 500) &&
            mouseX < 481 * (wh / 500) &&
            mouseY < 257 * (wh / 500)
          ) {
            if (mg == 4) {
              mg = 1;
            } else {
              mg++;
            }
          }
          if (
            mouseX > 427 * (wh / 500) &&
            mouseY > 261 * (wh / 500) &&
            mouseX < 481 * (wh / 500) &&
            mouseY < 277 * (wh / 500)
          ) {
            if (shape == "r") {
              shape = "c";
            } else {
              shape = "r";
            }
          }
        }
      } else {
        if (passing) {
          if (
            mouseX > 125 * (wh / 500) &&
            mouseX < 245 * (wh / 500) &&
            mouseY > 150 * (wh / 500) &&
            mouseY < 200 * (wh / 500)
          ) {
            if (level == -1) {
              savee();
            } else {
              if (level > 21) {
                page = 2;
              } else {
                page = 1;
              }
              level = 0;
            }
          }
          if (
            mouseX > 255 * (wh / 500) &&
            mouseX < 375 * (wh / 500) &&
            mouseY > 150 * (wh / 500) &&
            mouseY < 200 * (wh / 500)
          ) {
            if (level == -1) {
              playing = false;
            } else if (level != ll) {
              nextLevel(true);
            }
          }
          passing = false;
        } else if (level > 0 || playing == true) {
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
              tt = 0;
            }
          }

          if (
            (level > 2 || playing == true) &&
            mouseX > 0 &&
            mouseX < 65 * (wh / 500) &&
            mouseY > 280 * (wh / 500) &&
            mouseY < 300 * (wh / 500)
          ) {
            resetLevel();
            nextLevel(false);
            if (level == -1) {
              let coded = code();
              playing = true;
              decode(coded);
            }
          } else if (
            mouseX > 473 &&
            mouseX < 500 * (wh / 500) &&
            mouseY > 280 * (wh / 500) &&
            mouseY < 300 * (wh / 500)
          ) {
            resetLevel();
            if (level == -1) {
              playing = false;
            } else {
              level = 0;
              pos = 0;
            }
          }
        } else if (level == 0) {
          levelSelect();
        }
      }
    }
  }
}

class MakerBlock {
  constructor(type, x, y, w, h, gravity, shape) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scaling = 0;
    this.fmx = 0;
    this.fmy = 0;
    this.gravity = gravity;
    if (shape == null) {
      this.shape = "r";
    } else {
      this.shape = shape;
    }
  }
  show() {
    if (this.w < 20) {
      this.w = 20;
    }
    if (this.h < 20) {
      this.h = 20;
    }
    if (this.shape == "c") {
      this.h = this.w;
    }
    if (this.type == "sr") {
      fill(255, 135, 135);
    } else if (this.type == "r") {
      fill(255, 100, 100);
    } else if (this.type == "dr") {
      fill(225, 10, 10);
    } else if (this.type == "g") {
      fill(125, 255, 125);
    } else if (this.type == "sg") {
      fill(200, 255, 200);
    } else if (this.type == "b") {
      fill(150, 150, 255);
    } else if (this.type == "sb") {
      fill(200, 200, 255);
    }
    push();
    scale(wh / 550);
    translate(this.x, this.y);
    rectMode(CENTER);
    if (this.shape != "c") {
      if (dist(this.x, 0, 275, 0) < 10 && dragged >= 0) {
        push();
        translate(-this.x, -this.y);
        rect(275, this.y, this.w, this.h);
        fill(150, 0, 0);
        noStroke();
        rect(275, 165, 1, 330);
        pop();
      } else {
        rect(0, 0, this.w, this.h);
      }
    } else {
      if (dist(this.x, 0, 275, 0) < 10 && dragged >= 0) {
        push();
        translate(-this.x, -this.y);
        if (this.type == "sr") {
          fill(255, 135, 135);
        } else if (this.type == "r") {
          fill(255, 100, 100);
        } else if (this.type == "dr") {
          fill(225, 10, 10);
        } else if (this.type == "g") {
          fill(125, 255, 125);
        } else if (this.type == "sg") {
          fill(200, 255, 200);
        } else if (this.type == "b") {
          fill(150, 150, 255);
        } else if (this.type == "sb") {
          fill(200, 200, 255);
        }
        circle(275, this.y, this.w);
        fill(150, 0, 0);
        noStroke();
        rect(275, 165, 1, 330);
        pop();
      } else {
        circle(0, 0, this.w);
      }
    }
    fill(215, 215, 220);
    push();
    if (dist(this.x, 0, 275, 0) < 10 && dragged >= 0) {
      translate(-this.x, 0);
      translate(275, 0);
    }
    if (level != -2) {
      if (this.shape != "c") {
        circle(-this.w / 2, -this.h / 2, 6);
        circle(this.w / 2, -this.h / 2, 6);
        circle(-this.w / 2, this.h / 2, 6);
        circle(this.w / 2, this.h / 2, 6);
      } else {
        circle(this.w / 2, 0, 6);
      }
    }
    fill(235);
    if (this.type == "sb" || this.type == "sr" || this.type == "sg") {
      makeScrews(0, 0, this.w - 2 * (wh / 500), this.h - 2 * (wh / 500));
    } else {
      push();
      imageMode(CENTER);
      angleMode(DEGREES);
      rotate(90 * (this.gravity - 1));
      if (this.type != "dr") {
        drawFace(this.type, 0, 0);
      } else {
        drawFace("r", 0, 0);
      }
      pop();
    }
    pop();
    pop();
    if (this.shape != "c") {
      if (this.scaling == 1) {
        if (this.w - (mouseX - this.fmx) / (wh / 550) > 20) {
          this.w -= (mouseX - this.fmx) / (wh / 550);
        }
        if (this.h - (mouseY - this.fmy) / (wh / 550) > 20) {
          this.h -= (mouseY - this.fmy) / (wh / 550);
        }
        if (this.w - (mouseX - this.fmx) / (wh / 550) > 20) {
          this.x += (mouseX - this.fmx) / 2 / (wh / 550);
        }
        if (this.h - (mouseY - this.fmy) / (wh / 550) > 20) {
          this.y += (mouseY - this.fmy) / 2 / (wh / 550);
        }
        this.fmx = mouseX;
        this.fmy = mouseY;
      } else if (this.scaling == 2) {
        if (this.w + (mouseX - this.fmx) / (wh / 550) > 20) {
          this.w += (mouseX - this.fmx) / (wh / 550);
        }
        if (this.h - (mouseY - this.fmy) / (wh / 550) > 20) {
          this.h -= (mouseY - this.fmy) / (wh / 550);
        }
        if (this.w + (mouseX - this.fmx) / (wh / 550) > 20) {
          this.x += (mouseX - this.fmx) / 2 / (wh / 550);
        }
        if (this.y - (mouseY - this.fmy) / (wh / 550) > 20) {
          this.y += (mouseY - this.fmy) / 2 / (wh / 550);
        }
        this.fmx = mouseX;
        this.fmy = mouseY;
      } else if (this.scaling == 3) {
        if (this.w + (mouseX - this.fmx) / (wh / 550) > 20) {
          this.w += (mouseX - this.fmx) / (wh / 550);
        }
        if (this.h + (mouseY - this.fmy) / (wh / 550) > 20) {
          this.h += (mouseY - this.fmy) / (wh / 550);
        }
        if (this.w + (mouseX - this.fmx) / (wh / 550) > 20) {
          this.x += (mouseX - this.fmx) / 2 / (wh / 550);
        }
        if (this.h + (mouseY - this.fmy) / (wh / 550) > 20) {
          this.y += (mouseY - this.fmy) / 2 / (wh / 550);
        }
        this.fmx = mouseX;
        this.fmy = mouseY;
      } else if (this.scaling == 4) {
        if (this.w - (mouseX - this.fmx) / (wh / 550) > 20) {
          this.w -= (mouseX - this.fmx) / (wh / 550);
        }
        if (this.h + (mouseY - this.fmy) / (wh / 550) > 20) {
          this.h += (mouseY - this.fmy) / (wh / 550);
        }
        if (this.w - (mouseX - this.fmx) / (wh / 550) > 20) {
          this.x += (mouseX - this.fmx) / 2 / (wh / 550);
        }
        if (this.h + (mouseY - this.fmy) / (wh / 550) > 20) {
          this.y += (mouseY - this.fmy) / 2 / (wh / 550);
        }
        this.fmx = mouseX;
        this.fmy = mouseY;
      }
    } else if (this.scaling == 1) {
      if (this.w + (mouseX - this.fmx) / (wh / 550) > 20) {
        this.w += (mouseX - this.fmx) / (wh / 1100);
      }
      this.fmx = mouseX;
      this.fmy = mouseY;
    }
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
        circle(0 - this.sprite.w / 2 + 4, 0 - this.sprite.height / 2 + 4, 3, 3);
        circle(0 + this.sprite.w / 2 - 4, 0 - this.sprite.height / 2 + 4, 3, 3);
        circle(0 - this.sprite.w / 2 + 4, 0 + this.sprite.height / 2 - 4, 3, 3);
        circle(0 + this.sprite.w / 2 - 4, 0 + this.sprite.height / 2 - 4, 3, 3);
      } else {
        push();
        rotate(-this.sprite.rotation);
        rotate(90 * (this.gravity - 1));
        if (type == "r" || type == "dr") {
          if (int(random(300)) == 0 || this.image == null) {
            this.image = mfaces[int(random(mfaces.length))];
          }
          if (abs(this.sprite.vel.y) > 1 || abs(this.sprite.vel.x) > 1) {
            image(hfaces[0], 0, 0, hfaces[0].width / 18, hfaces[0].height / 18);
            this.image = mfaces[int(random(mfaces.length))];
          } else {
            image(
              this.image,
              0,
              0,
              this.image.width / 18,
              this.image.height / 18
            );
          }
        } else if (type == "g") {
          if (int(random(300)) == 0 || this.image == null) {
            this.image = hfaces[int(random(hfaces.length))];
          }
          if (abs(this.sprite.vel.y) > 1 || abs(this.sprite.vel.x) > 1) {
            image(
              scaredface,
              0,
              0,
              scaredface.width / 18,
              scaredface.height / 18
            );
            this.image = hfaces[int(random(hfaces.length))];
          } else {
            image(
              this.image,
              0,
              0,
              this.image.width / 18,
              this.image.height / 18
            );
          }
        } else if (this.type == "b") {
          if (int(random(300)) == 0 || this.image == null) {
            this.image = nfaces[int(random(nfaces.length))];
          }
          image(
            this.image,
            0,
            0,
            this.image.width / 18,
            this.image.height / 18
          );
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

function share() {
  httpPost("https://api2.thegamebox.ca/api/red-remover-levels", "json", {
    "data": {
        "level_code": code()
    }
}, function(result) {
  navigator.clipboard.writeText("game.thegamebox.ca/red_remover/?sharedLevel=" + result.guid);
  message = true;
});
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
    les.push(new Block("sg", 250, 250, 180, 25));
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
    les.push(new Block("dr", 253, 210, 40, 40, 2));
    les.push(new Block("sb", 255, 100, 40, 40));
    les.push(new Block("b", 255, 57, 40, 40));
    les.push(new Block("b", 212, 100, 40, 40, 4));
  } else if (level == 17) {
    les.push(new Block("sb", 275, 250, 40, 40));
    les.push(new Block("g", 315, 250, 40, 40, 2));
    les.push(new Block("sg", 125, 75, 200, 20, 2));
    les[2].sprite.rotation = 10;
    les.push(new Block("dr", 50, 0, 40));
    les.push(new Block("sb", 100, 50, 20, 20));
    les[4].sprite.rotation = 10;
    les.push(new Block("sb", 375, 150, 20, 40));
    les.push(new Block("b", 415, 150, 40, 40, 2));
  } else if (level == 18) {
    les.push(new Block("sg", 250, 150, 40, 40));
    les.push(new Block("dr", 25, 190, 40, 40, 4, "c"));
    les.push(new Block("dr", 475, 110, 40, 40, 2, "c"));
    les.push(new Block("dr", 250, 25, 40, 40));
    les.push(new Block("dr", 250, 275, 40, 40, 3));
    les.push(new Block("sb", 55, 190, 20, 40));
    les.push(new Block("sb", 445, 110, 20, 40));
    les.push(new Block("sb", 250, 55, 40, 20));
    les.push(new Block("sb", 250, 245, 40, 20));
  } else if (level == 19) {
    les.push(new Block("sg", 300, 100, 150, 25));
    les.push(new Block("sg", 200, 200, 150, 25));
    les.push(new Block("sg", 328, 204.5, 100, 25));
    les.push(new Block("sb", 100, 185, 40, 20));
    les.push(new Block("sb", 300, 155, 40, 15));
    les.push(new Block("b", 300, 135, 40, 20));
    les.push(new Block("dr", 100, 215, 40, 40, 3));
    les.push(new Block("g", 350, 50, 25));
    les[0].sprite.rotation = -10;
    les[1].sprite.rotation = 10;
    les[2].sprite.rotation = -10;
  } else if (level == 20) {
    les.push(new Block("r", 250, 250, 70, 70, 3));
    les.push(new Block("sr", 250, 205, 70, 20));
    les.push(new Block("g", 250, 170, 25));
    les.push(new Block("sg", 125, 125, 200, 20));
    les.push(new Block("sg", 375, 125, 200, 20));
    les[4].sprite.rotation = 3;
    les.push(new Block("sg", 485, 65, 20, 100));
    les.push(new Block("r", 50, 65, 70, 70, 4));
    les.push(new Block("sr", 100, 65, 25, 70));
  } else if (level == 21) {
    les.push(new Block("r", 50, 90, 70, 70, 4));
    les.push(new Block("r", 50, 210, 70, 70, 4));
    les.push(new Block("g", 125, 90, 20, 20, 2));
    les.push(new Block("g", 125, 210, 20, 20, 2));
    les.push(new Block("sr", 100, 90, 20, 70));
    les.push(new Block("sr", 100, 210, 20, 70));
    les.push(new Block("sb", 300, 150, 20, 80));
    les.push(new Block("sb", 300, 30, 20, 80));
    les.push(new Block("sb", 300, 270, 20, 80));
    les.push(new Block("sb", 320, 240, 20, 20));
    les.push(new Block("sb", 320, 180, 20, 20));
    les.push(new Block("sb", 320, 60, 20, 20));
    les.push(new Block("b", 320, 10, 20, 65));
    les.push(new Block("b", 320, 130, 21, 55));
  } else if (level == 22) {
    decode(
      "g.275.51.35.35.1.r/sg.275.300.35.35.1.r/sr.275.236.35.35.1.r/b.275.112.20.76.1.r/b.340.174.88.20.2.r/b.341.237.88.20.2.r/g.407.172.35.35.2.r/g.407.236.35.35.2.r/b.209.172.87.20.4.r/b.209.236.86.20.4.r/g.143.236.35.35.4.r/sr.275.172.35.35.4.r/g.142.172.35.35.4.r"
    );
  } else if (level == 23) {
    decode(
      "sb.211.290.35.35.1.r/sb.337.289.35.35.1.r/sb.275.289.35.35.1.r/b.415.196.103.221.2.r/g.234.101.35.35.1.r/g.275.96.35.35.1.r/g.315.99.35.35.1.r/dr.275.135.35.35.1.r/dr.275.251.35.35.1.r/dr.275.212.35.35.1.r/dr.275.173.35.35.1.r/b.131.197.93.221.4.r/sb.230.140.35.35.1.r/sb.319.137.35.35.1.r"
    );
  } else if (level == 24) {
    decode(
      "sb.332.105.35.35.1.r/sb.226.281.35.35.1.r/b.261.281.35.35.2.r/b.296.281.35.35.2.r/b.331.281.35.35.2.r/g.401.281.35.35.2.r/g.436.281.35.35.2.r/g.471.281.35.35.2.r/g.80.105.35.35.4.r/g.116.105.35.35.4.r/g.152.105.35.35.4.r/b.189.105.35.35.4.r/b.226.105.35.35.4.r/b.261.105.35.35.4.r/b.296.105.35.35.4.r/b.366.281.35.35.2.r/dr.183.153.35.35.1.c/dr.372.231.35.35.3.c/sg.280.192.250.20.1.r"
    );
    les[les.length - 1].sprite.rotation = 5;
  } else if (level == 25) {
    decode(
      "b.275.25.169.42.1.r/b.275.304.168.41.3.r/dr.275.126.35.35.3.r/g.275.88.35.35.3.r/g.275.242.35.35.1.r/dr.275.204.35.35.1.r/sb.470.165.20.30.1.r/sb.348.103.20.20.1.r/sb.342.234.20.20.1.r/sb.275.272.64.20.1.r/sb.356.166.20.30.1.r/sb.275.58.64.20.1.r/sb.207.103.20.20.1.r/sb.206.237.20.20.1.r/b.527.166.86.20.2.r/b.414.166.86.24.2.r"
    );
  } else if (level == 26) {
    decode(
      "sg.102.265.35.35.1.r/sg.448.266.35.35.1.r/g.172.265.35.35.2.r/g.207.265.35.35.2.r/g.343.266.35.35.4.r/g.413.266.35.35.4.r/g.137.265.35.35.2.r/g.378.266.35.35.4.r/dr.159.66.54.54.1.c/sb.230.111.266.20.1.r"
    );
    les[les.length - 1].sprite.rotation = 5;
  } else if (level == 27) {
    decode(
      "dr.336.292.38.45.3.r/sb.335.254.29.20.1.r/g.275.141.156.20.1.r/sg.275.173.23.20.1.r/b.219.32.35.35.1.r/sb.219.68.39.20.1.r/sg.219.288.37.35.1.r"
    );
  } else if (level == 28) {
    decode(
      "sb.275.212.370.21.1.r/b.135.144.20.105.1.r/b.243.144.20.106.1.r/b.188.144.20.106.1.r/b.303.144.20.106.1.r/b.361.144.20.106.1.r/b.418.144.20.105.1.r/dr.121.33.35.35.1.r/dr.177.32.35.35.1.r/dr.232.31.35.35.1.r/dr.293.31.35.35.1.r/dr.349.31.35.35.1.r/sb.45.94.20.20.1.r/b.23.94.20.20.4.r/sb.122.61.39.20.1.r/sb.177.61.40.20.1.r/sb.231.60.40.20.1.r/sb.293.61.39.20.1.r/sb.349.61.40.20.1.r/sr.453.60.42.20.1.r/sb.394.290.46.20.1.r/sb.505.290.47.20.1.r/g.453.25.35.35.1.r"
    );
  } else if (level == 29) {
    decode(
      "dr.77.56.35.35.1.r/g.77.98.35.35.1.r/sr.77.130.47.20.1.r/sr.275.131.279.20.1.r/g.275.99.35.35.1.r/sb.275.181.35.35.1.r/sg.382.183.35.35.1.r/dr.382.99.35.35.1.r/dr.162.99.35.35.1.r/sr.162.180.35.35.1.r/sb.75.269.88.44.1.r/dr.462.56.20.20.2.r/b.456.153.20.20.2.r/sb.435.56.20.24.2.r/sr.432.154.20.25.2.r"
    ); 
  }
}

function resetLevel() {
  for (let i = allSprites.length - 1; i > -1; i--) {
    allSprites[i].remove();
  }
  les = [];
  tt = 0;
}

function checkIfStill() {
  if (level == 0) {
    return false;
  }
  for (let i = 0; i < allSprites.length; i++) {
    if (
      (tt < 100 ||
        abs(allSprites[i].vel.x) > 0.1 ||
        abs(allSprites[i].vel.y) > 0.1) &&
      allSprites[i].y < 600 &&
      allSprites[i].y > -300 &&
      allSprites[i].x < 800 &&
      allSprites[i].x > -300
    ) {
      return false;
    }
  }
  return true;
}

function levelSelect() {
  if (page == 1) {
    for (let j = 1; j < 4; j++) {
      for (let i = 1; i < 8; i++) {
        if (
          mouseX > (60 * i - 10) * (wh / 500) &&
          mouseX < (60 * i + 30) * (wh / 500) &&
          mouseY + 18 * (wh / 500) > (60 * j + 36) * (wh / 500) &&
          mouseY + 18 * (wh / 500) < (60 * j + 76) * (wh / 500) &&
          levels[i + (j - 1) * 7 - 1] != "l"
        ) {
          goToLevel(i + (j - 1) * 7);
          break;
        }
      }
    }
    if (
      mouseX > (250 - 125) * (wh / 500) &&
      mouseX < (250 + 125) * (wh / 500) &&
      mouseY > (270 - 15) * (wh / 500) &&
      mouseY < (270 + 15) * (wh / 500)
    ) {
      level = -2;
      pos = 0;
    }
    if (
      mouseX > (475 - 12.5) * (wh / 500) &&
      mouseX < (475 + 12.5) * (wh / 500) &&
      mouseY > (158 - 27.5) * (wh / 500) &&
      mouseY < (158 + 27.5) * (wh / 500)
    ) {
      page = 2;
    }
  } else if (page == 2) {
    if (
      mouseX > (25 - 12.5) * (wh / 500) &&
      mouseX < (25 + 12.5) * (wh / 500) &&
      mouseY > (158 - 27.5) * (wh / 500) &&
      mouseY < (158 + 27.5) * (wh / 500)
    ) {
      page = 1;
    }
    if (
      mouseX > (250 - 125) * (wh / 500) &&
      mouseX < (250 + 125) * (wh / 500) &&
      mouseY > (270 - 15) * (wh / 500) &&
      mouseY < (270 + 15) * (wh / 500)
    ) {
      level = -2;
      pos = 0;
    }
    for (let j = 1; j < 4; j++) {
      for (let i = 1; i < 8; i++) {
        if (
          mouseX > (60 * i - 10) * (wh / 500) &&
          mouseX < (60 * i + 30) * (wh / 500) &&
          mouseY + 18 * (wh / 500) > (60 * j + 36) * (wh / 500) &&
          mouseY + 18 * (wh / 500) < (60 * j + 76) * (wh / 500) &&
          levels[i + (j - 1) * 7 - 1 + (page - 1) * 21] != "l"
        ) {
          if (i + (j - 1) * 7 + (page - 1) * 21 < ll + 1) {
            goToLevel(i + (j - 1) * 7 + (page - 1) * 21);
            break;
          }
        }
      }
    }
  }
}

function goToLevel(l) {
  level = l;
  nextLevel(false);
}

function drawLevels() {
  push();
  translate(0, -18);
  for (let j = 1; j < 4; j++) {
    for (let i = 1; i < 8; i++) {
      if (i + (j - 1) * 7 + (page - 1) * 21 < ll + 1) {
        if (
          mouseX > (60 * i - 10) * (wh / 500) &&
          mouseX < (60 * i + 30) * (wh / 500) &&
          mouseY + 18 * (wh / 500) > (60 * j + 36) * (wh / 500) &&
          mouseY + 18 * (wh / 500) < (60 * j + 76) * (wh / 500)
        ) {
          fill(234, 173, 76);
        } else {
          fill(214, 153, 56);
        }
        stroke(214 / 3, 153 / 3, 56 / 3);
        rect(60 * i - 10, 60 * j + 36, 40, 40, 10, 10);
        rectMode(CENTER);
        rect(60 * i - 10, 60 * j + 38, 25, 25, 11, 11);
        rectMode(CORNER);
        if (levels[i + (j - 1) * 7 - 1 + (page - 1) * 21] == "l") {
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
        } else if (levels[i + (j - 1) * 7 - 1 + (page - 1) * 21] == "u") {
          push();
          fill(100, 200, 100);
          strokeJoin(ROUND);
          translate(i * 60 + 6, j * 60 + 47);
          scale(0.5, 0.5);
          triangle(0, 0, 25, 20, 0, 35);
          strokeJoin(CORNER);
          pop();
        } else {
          push();
          translate(i * 60 + 10.5, j * 60 + 57);
          imageMode(CENTER);
          image(hfaces[0], 0, 0, hfaces[0].width / 20, hfaces[0].height / 20);
          pop();
        }
        strokeWeight(4);
        fill(0);
        noStroke();
        textSize(15);
        text(i + (j - 1) * 7 + (page - 1) * 21, 60 * i - 10, 60 * j + 36);
        stroke(50, 50, 0);
      }
    }
  }
  pop();
  if (
    mouseX > (250 - 125) * (wh / 500) &&
    mouseX < (250 + 125) * (wh / 500) &&
    mouseY > (270 - 15) * (wh / 500) &&
    mouseY < (270 + 15) * (wh / 500)
  ) {
    fill(234, 173, 76);
  } else {
    fill(214, 153, 56);
  }
  rectMode(CENTER);
  stroke(214 / 3, 153 / 3, 56 / 3);
  rect(250, 270, 250, 30, 10, 10);
  if (page == 1) {
    if (
      mouseX > (475 - 12.5) * (wh / 500) &&
      mouseX < (475 + 12.5) * (wh / 500) &&
      mouseY > (158 - 27.5) * (wh / 500) &&
      mouseY < (158 + 27.5) * (wh / 500)
    ) {
      fill(234, 173, 76);
    } else {
      fill(214, 153, 56);
    }
    rect(475, 158, 25, 55, 10, 10);
    imageMode(CENTER);
    image(a, 475, 158, a.width/16, a.height/16);
  } else if (page == 2) {
    if (
      mouseX > (25 - 12.5) * (wh / 500) &&
      mouseX < (25 + 12.5) * (wh / 500) &&
      mouseY > (158 - 27.5) * (wh / 500) &&
      mouseY < (158 + 27.5) * (wh / 500)
    ) {
      fill(234, 173, 76);
    } else {
      fill(214, 153, 56);
    }
    rect(20, 158, 25, 55, 8, 10);
    imageMode(CENTER);
    image(a2, 21.5, 158, a2.width/16, a2.height/16);
  }
  textSize(17);
  fill(0);
  noStroke();
  text("Level Maker", 250, 268);
  stroke(214 / 3, 153 / 3, 56 / 3);
  /* if (
    mouseX > (340 - 82.5) * (wh / 500) &&
    mouseX < (340 + 82.5) * (wh / 500) &&
    mouseY > (270 - 15) * (wh / 500) &&
    mouseY < (270 + 15) * (wh / 500)
  ) {
    fill(234, 173, 76);
  } else {
    fill(214, 153, 56);
  }
  rect(340, 270, 165, 30, 10, 10);
  rectMode(CORNER);
  fill(0);
  noStroke();
  textSize(19);
  text("Settings", 340, 267); */
}

function decode(le) {
  l = [];
  m = [];
  l = le.split("/");
  for (let i = 0; i < l.length; i++) {
    m.push(l[i].split("."));
  }
  for (let i = 0; i < m.length; i++) {
    les.push(
      new Block(
        m[i][0],
        parseInt(m[i][1]) - 25,
        parseInt(m[i][2]) - 15,
        parseInt(m[i][3]),
        parseInt(m[i][4]),
        parseInt(m[i][5]),
        m[i][6]
      )
    );
  }
}

function decodeToBlocks(le) {
  l = [];
  m = [];
  l = le.split("/");
  for (let i = 0; i < l.length; i++) {
    m.push(l[i].split("."));
  }
  for (let i = 0; i < m.length; i++) {
    blocks.push(
      new MakerBlock(
        m[i][0],
        parseInt(m[i][1]),
        parseInt(m[i][2]),
        parseInt(m[i][3]),
        parseInt(m[i][4]),
        parseInt(m[i][5]),
        m[i][6]
      )
    );
  }
}

function code() {
  let codedLevel = "";
  for (let i = 0; i < blocks.length; i++) {
    codedLevel = codedLevel + blocks[i].type + ".";
    codedLevel = codedLevel + int(blocks[i].x) + ".";
    codedLevel = codedLevel + int(blocks[i].y) + ".";
    codedLevel = codedLevel + int(blocks[i].w) + ".";
    codedLevel = codedLevel + int(blocks[i].h) + ".";
    codedLevel = codedLevel + blocks[i].gravity + ".";
    if (i != blocks.length - 1) {
      codedLevel = codedLevel + blocks[i].shape + "/";
    } else {
      codedLevel = codedLevel + blocks[i].shape;
    }
  }
  return codedLevel;
}

function makeScrews(xx, yy, ww, hh) {
  fill(100);
  circle(xx - ww / 2 + 4, yy - hh / 2 + 4, 3);
  circle(xx + ww / 2 - 4, yy - hh / 2 + 4, 3);
  circle(xx - ww / 2 + 4, yy + hh / 2 - 4, 3);
  circle(xx + ww / 2 - 4, yy + hh / 2 - 4, 3);
}

function drawFace(style, x, y) {
  if (style == "r") {
    image(mfaces[0], x, y, hfaces[0].width / 18, hfaces[0].height / 18);
  } else if (style == "b") {
    image(nfaces[6], x, y, hfaces[0].width / 18, hfaces[0].height / 18);
  } else if (style == "g") {
    image(hfaces[0], x, y, hfaces[0].width / 18, hfaces[0].height / 18);
  }
}

function playy() {
  tt = 0;
  if (level == -1 && playing == false) {
    if (blocks.length > 0) {
      resetLevel();
      let coded = code();
      playing = true;
      decode(coded);
    }
  }
}

function keyPressed() {
  if (key == " ") {
    playy();
  } else {
    console.log(code());
  }
  if (key == "c") {
    for (let i = 0; i < les.length; i++) {
      if (
        les[i].sprite.x > 0 &&
        les[i].sprite.x < 500 &&
        les[i].sprite.y > 0 &&
        les[i].sprite.y < 300
      ) {
        console.log(les[i].sprite.vel.x, les[i].sprite.vel.y);
      }
    }
  }
}