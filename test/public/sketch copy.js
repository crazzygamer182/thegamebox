var socket;

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);
  noStroke();
  fill(0, 0, 255);
  circle(mouseX, mouseY, 50);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 0);
  circle(data.x, data.y, 50);
}

let grounds = [];
let players = [];
let ap = "sky";
let platDir = 1;

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  p = loadImage("p.png");
  p2 = loadImage("p2.png");
  p3 = loadImage("p3.png");
}

function setup() {
  socket = io('https://api.thegamebox.ca/');
  socket.on('mouse', newDrawing);
  if (500 * (windowHeight / 300) < windowWidth) {
    wh = 500 * (windowHeight / 300);
    ht = windowHeight;let grounds = [];
let players = [];
let ap = "sky";
let platDir = 1;
let direction = 1;

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  p = loadImage("p.png");
  p3 = loadImage("p3.png");
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
  stroke(0);
  strokeJoin(ROUND);
  player = new Sprite(250, 50, 35, 100);

  // Add a new variable to track whether the player is underneath a platform
  player.underneath = false;

  grounds.push(new Sprite(200, 225, 250, 35, "kinematic"));
  grounds.push(new Sprite(-100, 400, 250, 35, "static"));
  grounds.push(new Sprite(600, 400, 250, 35, "static"));
  grounds.push(new Sprite(250, 600, 1400, 35, "static"));
  world.gravity.y = 25;
  for (let i = grounds.length - 1; i > -1; i--) {
    grounds[i].draw = () => {
      if (ap == "sky") {
        if (i == 0) {
          push();
          translate(-grounds[0].x, -grounds[0].y);
          fill(50);
          stroke(200, 175, 175);
          rect(250, grounds[0].y + 3, 300, 10);
          pop();
        }
        stroke(82, 62, 0);
        fill(127, 96, 0);
      } else {
      }
      strokeWeight(7);
      rect(0, 2.5, grounds[i].width, 31, 10, 10);
    }
  }
  player.draw = () => {
    fill(255,122,122);
    push();
    /*rect(
      0,
      0,
      player.width,
      player.height
    );*/
    if (player.vel.x > 0.5) {
      image(p, 0, 0, p.width/5, p.height/5);
    } else if (player.vel.x < -0.5) {
      push();
      scale(-1, 1)
      image(p, 0, 0, p.width/5, p.height/5);
      pop();
    } else {
      if (direction == 1) {
        image(p3, 0, 0, p.width/5, p.height/5);
      } else {
        push();
        scale(-1, 1)
        image(p3, 0, 0, p.width/5, p.height/5);
        pop();
      }
    }
    pop();
    if (player.y < 600) {
      player.rotation = 0;
    }
  };
  camera.zoom = 0.35*(wh/500);
  player.color = "rgb(255,73,73)";
  player.bounciness = 0.4;
}

function draw() {
  background(16, 187, 222);
  stroke(255,73,73);
  strokeWeight(3*(wh/500));
  if (kb.pressing("up") || kb.pressing(" ")) {
    jump(); 
  }
  if (kb.pressing("right")) {
    player.vel.x = 8;
    direction = 1;
  }
  if (kb.pressing("left")) {
    player.vel.x = -8;
    direction = 0;
  }
  if (kb.pressing("down")) {
    world.gravity.y = 100;
  } else {
    world.gravity.y = 25;
  }
  if (player.vel.x > 0) {
    player.vel.x -= 0.08;
  } else if (player.vel.x < 0) {
    player.vel.x += 0.08;
  }
  camera.x = player.x/2 + 120;
  camera.y = player.y/2 + 175;
  if (ap == "sky") {
    if (grounds[0].x == 100) {
      platDir = 1; 
    }
    if (grounds[0].x == 400) {
      platDir = -1; 
    }
    grounds[0].x += platDir;
  } else {
    grounds[0].x = 250;
  }
  stroke(0);
}

function jump() {
  for (let i = grounds.length - 1; i > -1; i--) {
    if (player.colliding(grounds[i])) {
      player.vel.y = -14;
      return;
    }
  }
}

function mousePressed() {
  new Sprite(random(-300, 800), -300, 25);
}
  } else {
    wh = windowWidth;
    ht = 300 * (windowWidth / 500);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  stroke(0);
  strokeJoin(ROUND);
  player = new Sprite(250, 50, 35, 100);
  grounds.push(new Sprite(200, 225, 250, 35, "kinematic"));
  grounds.push(new Sprite(-100, 400, 250, 35, "static"));
  grounds.push(new Sprite(600, 400, 250, 35, "static"));
  grounds.push(new Sprite(250, 600, 1400, 35, "static"));
  world.gravity.y = 25;
  for (let i = grounds.length - 1; i > -1; i--) {
    grounds[i].draw = () => {
      if (ap == "sky") {
        if (i == 0) {
          push();
          translate(-grounds[0].x, -grounds[0].y);
          fill(50);
          stroke(200, 175, 175);
          rect(250, grounds[0].y + 3, 300, 10);
          pop();
        }
        stroke(82, 62, 0);
        fill(127, 96, 0);
      } else {
      }
      strokeWeight(7);
      rect(0, 2.5, grounds[i].width, 31, 10, 10);
    }
  }
  player.draw = () => {
    fill(255,122,122);
    push();
    /*rect(
      0,
      0,
      player.width,
      player.height
    );*/
    if (player.vel.x > 0.5) {
      image(p, 0, 0, p.width/5, p.height/5);
    } else if (player.vel.x < -0.5) {
      image(p2, 0, 0, p.width/5, p.height/5);
    } else {
      image(p3, 0, 0, p.width/5, p.height/5);
    }
    pop();
    if (player.y < 600) {
      player.rotation = 0;
    }
  };
  camera.zoom = 0.35*(wh/500);
  player.color = "rgb(255,73,73)";
  player.bounciness = 0.4;
}

function draw() {
  background(16, 187, 222);
  stroke(255,73,73);
  strokeWeight(3*(wh/500));
  if (kb.pressing("up") || kb.pressing(" ")) {
    jump(); 
  }
  if (kb.pressing("right")) {
    player.vel.x = 8;
  }
  if (kb.pressing("left")) {
    player.vel.x = -8;
  }
  if (kb.pressing("down")) {
    world.gravity.y = 100;
  } else {
    world.gravity.y = 25;
  }
  if (player.vel.x > 0) {
    player.vel.x -= 0.05;
  } else if (player.vel.x < 0) {
    player.vel.x += 0.05;
  }
  camera.x = player.x/2 + 120;
  camera.y = player.y/2 + 175;
  if (ap == "sky") {
    if (grounds[0].x == 100) {
      platDir = 1; 
    }
    if (grounds[0].x == 400) {
      platDir = -1; 
    }
    grounds[0].x += platDir;
  } else {
    grounds[0].x = 250;
  }
  stroke(0);
}

function jump() {
  for (let i = grounds.length - 1; i > -1; i--) {
    if (player.colliding(grounds[i])) {
      player.vel.y = -14;
      return;
    }
  }
}

function mousePressed() {
  new Sprite(random(-300, 800), -300, 50);
}