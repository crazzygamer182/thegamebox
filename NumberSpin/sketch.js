let table = [];

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function preload() {
  fontt = loadFont("Comfortaa-Regular.ttf");
}

function setup() {
  textFont(fontt);
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  for (let i = 0; i < 10; i++) {
    table.push([]);
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      table[i][j] = new Block(i, j);
    }
  }
  counter = 0;
}

function draw() {
  frameRate(60);
  background(200);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      table[i][j].show();
    }
  }
  if (counter > 0) {
    if (counter < 100) {
      console.log("hey")
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          table[i][j].on = false;
        }
      }
    }
    counter++;
    if (counter > 75 && counter <= 100) {
      if (counter % 7 == 0) {
        table[int(random(10))][int(random(10))].on = true;
      }
      } else if (counter > 50 && counter <= 100) {
        if (counter % 4 == 0) {
          table[int(random(10))][int(random(10))].on = true;
        }
        } else if (counter > 25 && counter <= 100) {
          if (counter % 2 == 0) {
            table[int(random(10))][int(random(10))].on = true;
          }
          } else if (counter > 0 && counter <= 100) {
            table[int(random(10))][int(random(10))].on = true;
          } else if (counter > 100) {
            table[int(random(10))][int(random(10))].on = true;
            console.log("hi");
            counter = 0;
          } 
}
}

class Block {
  constructor(idX, idY) {
    this.idX = idX;
    this.idY = idY;
    this.on = false;
    this.number = (this.idX+1)*(this.idY+1);
  }
  show() {
    if (this.on == false) {
      fill(255);
    } else {
      fill(200, 50, 100);
    }
    strokeWeight(2 * (wh/500))
    stroke(0);
    rect((this.idX*25*(wh/500))+((wh-(25*10*(wh/500)))/2), (this.idY*25*(wh/500))+((ht-(25*10*(wh/500)))/2), 25*(wh/500), 25*(wh/500));
    noStroke();
    fill(0);
    textSize(15 * (wh/500));
    textAlign(CENTER, CENTER);
    text(this.number, (this.idX*25*(wh/500))+((wh-(25*10*(wh/500)))/2) + (12.4 * (wh/500)), (this.idY*25*(wh/500))+((ht-(25*10*(wh/500)))/2) + (11.8 * (wh/500)));
  }
}

function mousePressed() {
  if (counter == 0) {
    counter = 1;
  }
}