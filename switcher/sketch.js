let stage = 0;
let blocks = [];
let p = 200;
let selectedX = 0;
let selectedY = 0;

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
  strokeJoin(ROUND);
  textAlign(CENTER, CENTER);
	startButton = createSprite(250, 200, 100, 35);
  startButton.draw = () => {
    fill(245, 206, 66);
    stroke(186, 157, 50);
    strokeWeight(4);
    rect(0, 0, startButton.width, startButton.height, 5, 5);
    noStroke();
    fill(0);
    text("Start", 0, 3);
    if (startButton.mouse.pressed()) {
      stage = 1;
			startGame();
      startButton.remove();
    }
  };
}

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function draw() {
  background(245, 129, 66);
  camera.x = 250;
  camera.y = 150;
  camera.zoom = wh / 500;
  push();
  scale(wh / 500);
	if (stage == 0) {
		fill(245, 206, 66);
		textSize(50);
		text("Switcher", 250, 75);
	} else {
    if (kb.presses('right')) {
      if (selectedX+1 < 9) {
        selectedX++;
      }
    }
    if (kb.presses('left')) {
      if (selectedX > 0) {
        selectedX--;
      }
    }
    if (kb.presses('up')) {
      if (selectedY > 0) {
        selectedY--;
      }
    }
    if (kb.presses('down')) {
      if (selectedY < 49) {
        selectedY++;
      }
    }
    if (kb.presses('space')) {
      swap(selectedX, selectedY, selectedX+1, selectedY);
    }
    if (kb.presses('m')) {
      p -= 100;
    }
  }
  pop();
}

function swap(x, y, nx, ny) {
  if (blocks[x][y] == null) {
    blocks[x][y] = blocks[nx][ny];
    blocks[x][y].x = blocks[nx][ny].x;
    blocks[x][y].y = blocks[nx][ny].y;
    blocks[x][y].sprite.x = blocks[nx][ny].sprite.x;
    blocks[x][y].sprite.y = blocks[nx][ny].sprite.y;
    blocks[nx][ny] = null;
  } else 
  if (blocks[nx][ny] == null) {
    blocks[nx][ny] = blocks[x][y];
    blocks[nx][ny].x = blocks[x][y].x;
    blocks[nx][ny].y = blocks[x][y].y;
    blocks[nx][ny].sprite.x = blocks[x][y].sprite.x;
    blocks[nx][ny].sprite.y = blocks[x][y].sprite.y;
    blocks[x][y] = null;
  } else {
    let temp = blocks[x][y].sprite.color;
    blocks[x][y].sprite.color = blocks[nx][ny].sprite.color;
    blocks[nx][ny].sprite.color = temp;
  }
  moveBlocksDown();
  checkAndSetColors();
}

//function to loop through all blocks and check if there are any with empty spaces below them, if so move the blocks down to fill the space
function moveBlocksDown() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length - 1; j++) {
      if (blocks[i][+1] == null) {
        if (blocks[i][j] != null) {
          swap(i, j, i, j + 1)
        }
      }
    }
  }
}


function checkAndSetColors() {
  console.log("checking...");
  // Check rows
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length - 2; j++) {
      if (blocks[i][j] != null && blocks[i][j + 1] != null && blocks[i][j + 2] != null) {
        const block1 = blocks[i][j].sprite.color + "";
        const block2 = blocks[i][j + 1].sprite.color + "";
        const block3 = blocks[i][j + 2].sprite.color + "";
        console.log(block1 == block2 && block2 == block3);
        if (
          block1 === block2 && block2 === block3
        ) {
          console.log("found");
          blocks[i][j].sprite.remove();
          blocks[i][j + 1].sprite.remove();
          blocks[i][j + 2].sprite.remove();
          blocks[i][j] = null;
          blocks[i][j + 1] = null;
          blocks[i][j + 2] = null; 
        }
      }
    }
  }
  // Check columns
  for (let i = 0; i < blocks.length - 2; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      if (blocks[i][j] != null && blocks[i + 1][j] != null && blocks[i + 2][j] != null) {
        const block1 = blocks[i][j].sprite.color + "";
        const block2 = blocks[i + 1][j].sprite.color + "";
        const block3 = blocks[i + 2][j].sprite.color + "";
        if (
          block1 === block2 && block2 === block3
        ) {
          console.log("found");
          blocks[i][j].sprite.remove();
          blocks[i + 1][j].sprite.remove();
          blocks[i + 2][j].sprite.remove();
          blocks[i][j] = null;
          blocks[i + 1][j] = null;
          blocks[i + 2][j] = null;
        }
      }
    }
  }
  moveBlocksDown();
}

function startGame() {
	allSprites.remove();
	let width = 10;
	let height = 50;
	for (let i = 0; i < width; i++) {
    blocks.push([]);
		for (let j = 0; j < height; j++) {
			blocks[i].push(new Block(i, j));
		}
	}
  selectedX = 0;
  selectedY = 0;
}

class Block {
	constructor(x, y) {
    this.x = x;
    this.y = y;
		this.size = 25;
		this.sprite = createSprite(x*this.size + 125, y*this.size + p, this.size, this.size, "kinematic");
		this.sprite.color = color(int(random(255)/150)*150, int(random(255)/150)*150, int(random(255)/150)*150);
		while (red(this.sprite.color) == 0 && green(this.sprite.color) == 0 && blue(this.sprite.color) == 0) {
			this.sprite.color = color(int(random(255)/150)*150, int(random(255)/150)*150, int(random(255)/150)*150);
		}
    this.sprite.draw = () => {
      if (this.x == selectedX && this.y == selectedY) {
        fill(red(this.sprite.color) + 150, green(this.sprite.color) + 150, blue(this.sprite.color) + 150);
        stroke(255);
      } else {
        fill(this.sprite.color);
        stroke(0);
      }
      rect(0, 0 + p - 200, this.sprite.width, this.sprite.height);
    };
	}
}