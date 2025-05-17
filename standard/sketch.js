let question;

function preload() {
  loadGameBox();
}

function setup() {
  createCanvas(1000, 600);
  question = createQuestion(500, 250, 1.85, "+", 1);
}

function draw() {
  drawBackground("classroom");
  question.show();
  drawGameBox();
}

function mousePressed() {
  question.checkAnswer();
  if (question.correct) {
    question = createQuestion(500, 250, 1.85, "+", 1);
  }
}