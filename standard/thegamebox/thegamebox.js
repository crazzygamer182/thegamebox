let allQuestions = [];
let character;
let mouthOpenCharacter;
let frameCount = 0;
let animation = 0;
let message = "";
let font;
let backgrounds = new Map();
let board;

function loadGameBox() {
    character = loadImage("thegamebox/gbc.png");
    mouthOpenCharacter = loadImage("thegamebox/gbc_mo.png");
    font = loadFont("thegamebox/Comfortaa-Regular.ttf");
    backgrounds.set("classroom", loadImage("thegamebox/classroom.png"));
    board = loadImage("thegamebox/board.png");
}

function createQuestion(x, y, size, type, level) {
    return new Question(x, y, size, type, level);
}

function drawBackground(background) {
    image(backgrounds.get(background), 500, 300, 1000, 600);
}

function drawGameBox() {
    imageMode(CENTER);
    textFont(font);
    if (animation == 1) {
        frameCount++;
        if (frameCount < 50) {
            image(character, 825, 475+250 - frameCount*5, 250, 250);
        } else {
            frameCount = 0;
            animation = 2;
        }
    }
    if (animation == 2) {
        frameCount++;
        if (frameCount < 50) {
            fill(253, 138, 21);
            rect(665-35, 430+65, 175, 50, 5, 5);
            textSize(32);
            fill(0);
            text(message, 664-35, 429+65);
            image(mouthOpenCharacter, 825, 475, 250, 250);
        } else {
            frameCount = 0;
            animation = 3;
        }
    }
    if (animation == 3) {
        frameCount++;
        if (frameCount < 50) {
            image(character, 825, 475 + frameCount*5, 250, 250);
        } else {
            animation = 0;
            frameCount = 0;
        }
    }
}

class Question {
    constructor(x, y, size, type, level) {
        this.x = x;
        this.y = y;
        this.showing = true;
        this.options = [];
        this.width = 350*size;
        this.height = 200*size;
        if (type == "x") {
            this.type = "X";
        } else {
            this.type = type;
        }
        if (level == 1) {
            this.level = level;
        } else if (level == 2) {
            this.level = 10;
        } else {
            this.level = 100;
        }
        this.num1 = 0;
        this.num2 = 0;
        this.right = 0;
        this.optionNumbers = [];
        this.makeQuestion();
        allQuestions.push(this);
        this.text = this.num1 + " " + this.type + " " + this.num2 + " = ?";
        this.correct = false;
    }
    show() {
        if (!this.showing) {
            return
        }
        strokeWeight(4);
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        push();
        translate(this.x, this.y);
        scale(this.width/350, this.height/200);
        fill(150);
        //rect(0, 0, 350, 200, 10, 10);
        image(board, 0, 0, 350*1.1, 200*1.1);
        textSize(42);
        fill(230);
        text(this.text, -0.5, -0.5 - 45);
        pop();
        this.options.forEach(option => {
            option.show();
        })
    }
    makeQuestion() {
        if (this.type != "÷") {
          if (this.level == 1) {
            this.num1 = int(random(1, 8));
            this.num2 = int(random(1, 8));
          } else if (this.level == 10) {
            this.num1 = int(random(7, 20));
            this.num2 = int(random(7, 20));
          } else {
            this.num1 = int(random(100, 900));
            this.num2 = int(random(100, 900));
          }
        } else {
          if (this.level == 10) {
            this.right = int(random(1, 8));
            this.num2 = int(random(1, 8));
            this.num1 = this.num2 * this.right;
          } else if (this.level == 10) {
            this.right = int(random(7, 20));
            this.num2 = int(random(7, 20));
            this.num1 = this.num2 * this.right;
          } else {
            this.right = int(random(100, 900));
            this.num2 = int(random(100, 900));
            this.num1 = this.this.num2 * this.right;
          }
        }
        this.makeOptions();
      }
      makeOptions() {
        this.options = [];
        if (this.type == "+") {
            this.right = this.num1 + this.num2;
        } else if (this.type == "-") {
            this.right = this.num1 - this.num2;
        } else if (this.type == "X") {
            this.right = this.num1 * this.num2;
        } else {
            this.right = this.num1 / this.num2;
        }
        this.choice = random([0, 1, 2, 3]);
        if (this.choice == 0) {
            this.optionNumbers.push(this.right);
        } else {
            this.optionNumbers.push(this.makeAnswer());
        }
        if (this.choice == 1) {
            this.optionNumbers.push(this.right);
        } else {
            this.optionNumbers.push(this.makeAnswer());
        }
        if (this.choice == 2) {
            this.optionNumbers.push(this.right);
        } else {
            this.optionNumbers.push(this.makeAnswer());
        }
        if (this.choice == 3) {
            this.optionNumbers.push(this.right);
        } else {
            this.optionNumbers.push(this.makeAnswer());
        }
        for (let i = 0; i < 4; i++) {
            this.options.push(new Option(this, this.x - this.width/2 + (this.width*0.21428571428)/2 + this.width/35 + i * this.width*(85/350), this.y + this.height/2 - (this.width*0.21428571428)/2 - this.width/35, this.optionNumbers[i], this.width/350))
        }
    }
    makeAnswer() {
        if (this.type != "÷") {
            return int(random(this.right-5*this.level, this.right+5*this.level + 1) * random(1, 3) * random(0, 1));
        } else {
            return int(random(this.right, this.num2 + 1) * random(1, 3) * random(0, 1));
        }
    }
    checkMousePress() {
        this.found = false;
        //code that loops through options and checks if mouse is over any of them, print if it is
        this.options.forEach(option => {
            if (checkMouseOverOption(this, option)) {
                if (this.right == option.text) {
                    this.correct = true;
                } else {
                    this.correct = false;
                }
                this.found = true;
            }
        })
        if (!this.found) this.correct = null;
    }
    checkAnswer() {
        animation = 0;
        this.checkMousePress()
        console.log(this.correct);
        if (this.correct == true) {
            correctAnimation();
        } else if (this.correct == false){
            incorrectAnimation();
        }
    }
    
    hide() {
        this.showing = false;
    }
}

class Option {
    constructor(question, x, y, text, scale) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.scale = scale;
        this.question = question;
    }
    show() {
        push();
        translate(this.x, this.y);
        scale(this.scale, this.scale);
        rectMode(CENTER)
        if (checkMouseOverOption(this.question, this)) {
            fill(83, 89, 78)
        } else {
            noFill();
        }
        stroke(230);
        strokeWeight(3.5);
        rect(0, 0, 75, 75, 8, 8)
        textSize(32);
        fill(230)
        strokeWeight(0.8);
        text(this.text, -0.5, -0.5)
        pop();
    }
}

function mouseClicked() {
    console.log(mouseX, mouseY);
    if (animation == 2) {
        animation = 0;
    }
    allQuestions.forEach(question => {
        question.checkMousePress();
    })
}

function checkMouseOverOption(question, option) {
    if (mouseX > option.x - (question.width*0.21428571428)/2 && mouseX < option.x + (question.width*0.21428571428)/2 && mouseY > option.y - (question.width*0.21428571428)/2 && mouseY < option.y + (question.width*0.21428571428)/2) {
        return true
    } else {
        return false
    }
}

function correctAnimation() {
    giveMessage("Correct!");
}

function incorrectAnimation() {
    giveMessage("Incorrect");
}

function giveMessage(m) {
    animation = 1;
    message = m;
}