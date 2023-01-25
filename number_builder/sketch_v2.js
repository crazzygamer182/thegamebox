let blocks = []
let ones
let tens
let hundreds
let thousands
let number = 0
var makerNum = 0
var yeeh
var Wehay
var welldonerec
var chart
var chartNum = 1
var lbp
var correct = 0
var sound
var isDecimal = false

class Block {
  constructor(blockNum, number) {
    this.blockNum = blockNum;
    this.mousePressed = 1
    this.xPos = mouseX
    this.yPos = mouseY
    this.realesed = 0
    this.number = number
  }
  show() {
    let i
    let j
    if (this.mousePressed == 1) {
      image(this.blockNum, mouseX, mouseY)
      this.xPos = mouseX
      this.yPos = mouseY
      if (this.blockNum == ones) {
        chartNum = 5
      }
      if (this.blockNum == tens) {
        chartNum = 4
      }
      if (this.blockNum == hundreds) {
        chartNum = 3
      }
      if (this.blockNum == thousands) {
        chartNum = 2
      }
    } else {
      image(this.blockNum, this.xPos, this.yPos)
      chartNum = 1

    }
  }
}

function setup() {
  let params = getURLParams();
  if (params.decimal == 'true') {
    isDecimal = true
  }
  if (1200 * (windowHeight / 800) < windowWidth) {
    wh = 1200 * (windowHeight / 800);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 800 * (windowWidth / 1200);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  newQuestion()
  block1 = new Block(10)
  block1.mousePressed = 0
}

function centerCanvas() {
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function preload() {
  hundreds = loadImage('hundred.png');
  ones = loadImage('ones.png');
  tens = loadImage('tens.png');
  thousands = loadImage('thousand.png');
  yeeh = loadSound('yeeh.mp3')
  Wehay = loadSound('Wehay.mp3')
  welldonerec = loadSound('welldonerec.mp3')
  chart = loadImage('chart.png')
  thouChart = loadImage('thou.png')
  hunChart = loadImage('hun.png')
  tenChart = loadImage('ten.png')
  oneChart = loadImage('one.png')
  decChart = loadImage('dec-chart.png')
  decThouChart = loadImage('dec-thou.png')
  decHunChart = loadImage('dec-hun.png')
  decTenChart = loadImage('dec-ten.png')
  decOneChart = loadImage('dec-one.png')
  guy = loadImage('littleguy.png')
  correctGuy = loadImage('correct_guy.png')
}

function draw() {
  scale(wh/1200);
  imageMode(CORNER)
  if (number == 'NaN') {
    number = 0
  }
  thousands.resize(165, 165)
  hundreds.resize(135, 135)
  tens.resize(20, 120)
  ones.resize(25, 25)
  fill(175)
  textSize(30)
  background(220);
  if (isDecimal == false) {
    if (chartNum == 2) {
      image(thouChart, 100, 240)
    } else if (chartNum == 3) {
      image(hunChart, 100, 240)
    } else if (chartNum == 4) {
      image(tenChart, 100, 240)
    } else if (chartNum == 5) {
      image(oneChart, 100, 240)
    } else {
      image(chart, 100, 240)
    }
  } else {
    if (chartNum == 2) {
      image(decThouChart, 100, 240)
    } else if (chartNum == 3) {
      image(decHunChart, 100, 240)
    } else if (chartNum == 4) {
      image(decTenChart, 100, 240)
    } else if (chartNum == 5) {
      image(decOneChart, 100, 240)
    } else {
      image(decChart, 100, 240)
    }
  }
  fill(0)
  text('Represent ' + makerNum + ' using the base ten blocks.', 570, 125)
  fill(80)
  textSize(60)
  text(number, 570, 200)
  fill(0, 100, 255)
  rect(50, height - 100, 100, 50)
  rect(1035, 16, 150, 66)
  if (isDecimal) {
    fill(0)
    circle(600, 313, 20)
  }

  fill(200)
  rect(178, height - 100, 100, 50)
  fill(0)
  textSize(40)
  text('Clear', 52, height - 63)
  textSize(50)
  text('Undo', 1050, 65)
  textSize(40)
  text('Next', 186.5, height - 63)
  image(thousands, 40, 40)
  image(hundreds, 245, 50)
  image(tens, 410, 50)
  image(ones, 480, 53)
  number = 0
  blocks.map((block) => {
    block.show()
    if (block.mousePressed == 0) number += block.number
  })
  if (isDecimal) {
    number = number / 100
  }
  imageMode(CENTER)
  if (correct > 0) {
    image(correctGuy, 600, 400)
  }
  if (makerNum != number) {
    correct = 0
  }
  if (makerNum == number) {
    correct++
  }
  if (correct == 1) {
    sound = int(random(3)) + 1
    if (sound == 1) {
      Wehay.play()
    } else {
      if (sound == 2) {
        welldonerec.play()
      } else {
        yeeh.play()
      }
    }
  }
}

function newQuestion() {
  makerNum = int(random(1753)) + 83
  if (isDecimal) {
    makerNum = makerNum / 100.0
  }
  blocks.length = 0
  number = 0
}

function touchStarted(event) {
  console.log(event)
  return mousePressed()
}

function touchEnded(event) {
  console.log(event)
  return mouseReleased()
}

function mousePressed() {
  console.log(mouseX/(wh/1200) + '_' + mouseY/(wh/1200))
  if (mouseX/(wh/1200) > 475 && mouseX/(wh/1200) < 538 && mouseY/(wh/1200) > 56 && mouseY/(wh/1200) < 106) {
    createNewBlock(ones, 1)
  } else {
    if (mouseX/(wh/1200) > 390 && mouseX/(wh/1200) < 457 && mouseY/(wh/1200) > 50 && mouseY/(wh/1200) < 200) {
      createNewBlock(tens, 10)
    } else {
      if (mouseX/(wh/1200) > 215 && mouseX/(wh/1200) < 362 && mouseY/(wh/1200) > 49 && mouseY/(wh/1200) < 198) {
        createNewBlock(hundreds, 100)
      } else {
        if (mouseX/(wh/1200) > 50 && mouseX/(wh/1200) < 199 && mouseY/(wh/1200) > 50 && mouseY/(wh/1200) < 198) {
          createNewBlock(thousands, 1000)
        } else {
          if (mouseX/(wh/1200) > 50 && mouseX/(wh/1200) < 149 && mouseY/(wh/1200) < height - 50 && mouseY/(wh/1200) > height - 100) {
            blocks.length = 0
            number = 0
          } else if (mouseX/(wh/1200) > 1035 && mouseX/(wh/1200) < 1185 && mouseY/(wh/1200) > 15 && mouseY/(wh/1200) < 81) {
            undo()
          } else {
            if (mouseX/(wh/1200) > 176 && mouseX/(wh/1200) < 277 && mouseY/(wh/1200) < height - 50 && mouseY/(wh/1200) > height - 100) {
              newQuestion()
            }
          }
        }
      }
    }
  }
  return false
}

function createNewBlock(blocksNum, number) {
  blocks.push(new Block(blocksNum, number))
}

function mouseReleased() {
  lastBlock = blocks[blocks.length - 1]
  if (lastBlock.mousePressed == 0) {
    return false
  }
  lastBlock.mousePressed = 0
  if (lastBlock.number == 1000) {
    if (mouseX/(wh/1200) < 99 || mouseX/(wh/1200) > 195 || mouseY/(wh/1200) < 309 || mouseY/(wh/1200) > 494) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 100) {
    if (mouseX/(wh/1200) < 349 || mouseX/(wh/1200) > 446 || mouseY/(wh/1200) < 309 || mouseY/(wh/1200) > 494) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 10) {
    if (mouseX/(wh/1200) < 600 || mouseX/(wh/1200) > 824 || mouseY/(wh/1200) < 309 || mouseY/(wh/1200) > 494) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 1) {
    if (mouseX/(wh/1200) < 849 || mouseX/(wh/1200) > 1046 || mouseY/(wh/1200) < 309 || mouseY/(wh/1200) > 592) {
      undo()
      chartNum = 1
    }
  }

  return false
}

function undo() {
  if (blocks.length > 0) {
    blocks.pop()
  }
}