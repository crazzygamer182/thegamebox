let buttons = [];
let texts = [];
let selected = null;

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
  textFont(fontt);
  centerCanvas(width, ht);
  preset();
}

function centerCanvas(ww, wh) {
  let cx = (ww - width) / 2;
  let cy = (wh - height) / 2 + 25;
  cnv.position(cx, cy);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
}

function preset() {
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  buttons.push(new Button(250, 150, 50, 50, "Click Me!", consoleLog));
  texts.push(new TextEditor(250, 150, 50, 50));
}

function draw() {
  camera.zoom = wh / 500;
  camera.x = 250;
  camera.y = 150;
  background(50);
}

class TextEditor {
  constructor(x, y, width, height) {
    this.tex = "";
    this.sprite = createSprite(x, y, width, height);
    this.sprite.draw = () => {
      if (this.sprite.mouse.hovering()) {
        fill(40);
      } else {
        fill(25);
      }
      rect(0, 0, width, height);
      fill(0);
      text(this.tex, 0, 0);
      if (this.sprite.mouse.pressed()) {
        selected = texts.indexOf(this);
      }
    }
  }
}

class Button {
  constructor(x, y, width, height, tex, func) {
    this.sprite = createSprite(x, y, width, height);
    this.sprite.draw = () => {
      if (this.sprite.mouse.hovering()) {
        fill(125);
      } else {
        fill(100);
      }
      rect(0, 0, width, height);
      fill(0);
      text(tex, 0, 0);
      if (this.sprite.mouse.pressed()) {
        func();
      }
    }
  }
}

function keyPressed() {
  if (selected != null) {
    texts[selected].tex = texts[selected].tex + key;
  }
}

function consoleLog() {
  console.log("hello");
}