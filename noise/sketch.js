let circles = [];
let mic;
let started = false;
let noiseLevel = 0;

function setup() {
  createCanvas(400, 400);
  
  // Create multiple circles
  for (let i = 0; i < 10; i++) {
    let circle = createSprite(width/2, height/2, 50, 50);
    circles.push(circle);
  }

  world.gravity.y = 10;
}

function mousePressed() {
  started = true;

  //initialize the microphone
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);

  if (started) {
    noiseLevel = mic.getLevel();
    console.log(mic.getLevel());
  }
  
  if (noiseLevel > 0.5) {
    for (let i = 0; i < circles.length; i++) {
      circles[i].position.x += random(-noiseLevel, noiseLevel);
      circles[i].position.y += random(-noiseLevel, noiseLevel);
    }
  }
  
  // Display text based on noise level
  if (noiseLevel > 0.5) {
    fill(255, 0, 0);
    text("Please be quiet!", width/2, height/2);
  } else {
    fill(0, 255, 0);
    text("Good volume!", width/2, height/2);
  }
}