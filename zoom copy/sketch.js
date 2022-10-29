let guy;
let ground;
let buildings = [];
let system;
let structures = [];

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
  ground = (233 - 35) * (wh / 500);
  centerCanvas();
  guy = new Guy();
  for (let i = 0; i < 10; i++) {
    buildings.push(new Building(i));
  }
  system = new ParticleSystem(createVector((100 * (wh / 500)), (235 * (wh / 500))));
  structures.push(new RideUp());
}

function draw() {
  background(0, 30, 0);
  noStroke();
  for (let i = 0; i < 10; i++) {
    buildings[i].show();
  }
  if (guy.y > ground - 10 * (wh / 500)) {
    system.addParticle();
    system.run();
  }
  fill(50);
  rect(0, 234 * (wh / 500), wh, ht);
  guy.show();
  onAnything = false;
  ground = (233 - 35) * (wh / 500);
  for (let i = 0; i < structures.length; i++) {
    structures[i].show();
    for (let j = 0; j < structures[i].blocks.length; j++) {
      if (abs(guy.x + ((35/2) * (wh / 500)) - structures[i].blocks[j].x + ((35/2) * (wh / 500))) < 35 * (wh / 500)) {
        if (structures[i].blocks[j].y < ground) {
          ground = structures[i].blocks[j].y;
        }
      }
    }
  }
}

class Guy {
  constructor() {
    this.x = 100 * (wh / 500);
    this.y = 198 * (wh / 500);
    this.v = 0;
  }
  show() {
    strokeWeight(4 * (wh / 500));
    stroke(0, 50, 155);
    fill(0, 100, 255);
    rect(this.x, this.y, 35 * (wh / 500), 35 * (wh / 500), 5, 5);
    this.v += 1 * (wh / 500);
    this.y += this.v;
    this.y = constrain(this.y, 0, ground);
  }
}

class RideUp {
  constructor() {
    this.blocks = [];
    this.blocks.push(new Block(wh*2, 0));
    this.blocks.push(new Block(wh*2 + (35 * (wh / 500)), 0));
    this.blocks.push(new Block(wh*2 + (35 * (wh / 500)), -35 * (wh / 500)));
    this.blocks.push(new Block(wh*2 + (70 * (wh / 500)), 0));
    this.blocks.push(new Block(wh*2 + (70 * (wh / 500)), -35 * (wh / 500)));
    this.blocks.push(new Block(wh*2 + (70 * (wh / 500)), -70 * (wh / 500)));
  }
  show() {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].show();
    }
  }
}

class Building {
  constructor(level) {
    this.x = (random(wh) + wh);
    this.y = (random(200) + 25) * (wh / 500);
    this.level = level;
  }
  show() {
    fill(0, 25+(this.level*3), 0);
    rect(this.x, this.y, (80 * (wh / 500)) + this.level*2, ht);
    this.x -= (1 * (wh / 500)) + (this.level/((wh / 500)))
    if (this.x < -wh/4) {
      this.x = (random(wh) + wh) * (wh / 500);
      this.height = (random(200) + 200) * (wh / 500);
    }
  }
}

function mousePressed() {
    if (guy.y > ground - 10 * (wh / 500)) {
      guy.v = -14 * (wh / 500);
    }
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = 198 * (wh / 500) + y;
  }
  show() {
    this.x -= 3 * (wh / 500);
    fill(0, 190, 0);
    strokeWeight(4 * (wh / 500));
    stroke(0, 90, 0);
    rect(this.x, this.y, 35 * (wh / 500), 35 * (wh / 500), 5, 5);
  }
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05 * (wh / 500));
  this.velocity = createVector(random(-1.1 * (wh / 500), -0.6 * (wh / 500)), random(-0.8 * (wh / 500), -0.3 * (wh / 500)));
  this.position = position.copy();
  this.lifespan = 150 * (wh / 500);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2 * (wh / 500);
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  fill(219, 125, 42, this.lifespan);
  ellipse(this.position.x, this.position.y, 3 * (wh / 500), 1 * (wh / 500));
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};