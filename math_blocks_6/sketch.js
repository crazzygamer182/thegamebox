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
var layout

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
      if (this.blockNum == tenThousands) {
        chartNum = 6
      }
      if (this.blockNum == hunThousands) {
        chartNum = 7
      }
    } else {
      image(this.blockNum, this.xPos, this.yPos)
      chartNum = 1

    }
  }
}

function setup() {
  createCanvas(1200, 800);
  newQuestion()
  block1 = new Block(10)
  block1.mousePressed = 0
}

function preload() {
  layout = loadImage('layout.png')
  hundreds = loadImage('hundred.png');
  ones = loadImage('ones.png');
  tens = loadImage('tens.png');
  thousands = loadImage('thousand.png');
  yeeh = loadSound('yeeh.mp3')
  Wehay = loadSound('Wehay.mp3')
  welldonerec = loadSound('welldonerec.mp3')
  chart = loadImage('chart.png')
  hunThouChart = loadImage('hun-thou.png')
  tenThouChart = loadImage('ten-thou.png')
  thouChart = loadImage('thou.png')
  hunChart = loadImage('hun.png')
  tenChart = loadImage('ten.png')
  oneChart = loadImage('one.png')
  guy = loadImage('littleguy.png')
  correctGuy = loadImage('correct_guy.png')
  tenThousands = loadImage('thousand (1).png')
  hunThousands = loadImage('100_thousand.png')
}

function draw() {
  imageMode(CORNER)
  if (number == 'NaN') {
    number = 0
  }
  thousands.resize(100, 100)
  hundreds.resize(100, 100)
  tens.resize(15, 90)
  hunThousands.resize(125, 125)
  tenThousands.resize(15, 112)
  fill(175)
  textSize(40)
  background(220);
  if (chartNum == 2) {
    image(thouChart, 0, 240)
  } else if (chartNum == 3) {
    image(hunChart, 0, 240)
  } else if (chartNum == 4) {
    image(tenChart, 0, 240)
  } else if (chartNum == 5) {
    image(oneChart, 0, 240)
  } else if (chartNum == 1) {
    image(chart, 0, 240)
  } else if (chartNum == 6) {
    image(tenThouChart, 0, 240)
  } else {
    image(hunThouChart, 0, 240)
  }
  fill(0)
  text('Represent ' + makerNum + ' with the Base Ten Blocks.', 300, 200)
  fill(80)
  textSize(60)
  text(number, 710, 90)
  fill(0, 100, 255)
  rect(50, height - 100, 100, 50)
  rect(1035, 16, 150, 66)
  fill(200)
  rect(178, height - 100, 100, 50)
  fill(0)
  textSize(40)
  text('Clear', 52, height - 63)
  textSize(50)
  text('Undo', 1050, 65)
  textSize(40)
  text('Next', 186.5, height - 63)
  image(layout, 10, 10)
  number = 0
  blocks.map((block) => {
    block.show()
    if (block.mousePressed == 0) number += block.number
  })
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
  makerNum = int(random(189473)) + 83
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
  console.log(mouseX + '_' + mouseY)
  if (mouseX > 554 && mouseX < 602 && mouseY > 10 && mouseY < 59) {
    createNewBlock(ones, 1)
  } else {
    if (mouseX > 510 && mouseX < 525 && mouseY > 11 && mouseY < 132) {
      createNewBlock(tens, 10)
    } else {
      if (mouseX > 379 && mouseX < 485 && mouseY > 11 && mouseY < 118) {
        createNewBlock(hundreds, 100)
      } else {
        if (mouseX > 235 && mouseX < 353 && mouseY > 12 && mouseY < 131) {
          createNewBlock(thousands, 1000)
        } else {
          if (mouseX > 186 && mouseX < 205 && mouseY > 10 && mouseY < 157) {
            createNewBlock(tenThousands, 10000)
          } else {
            if (mouseX > 10 && mouseX < 165 && mouseY > 10 && mouseY < 159) {
              createNewBlock(hunThousands, 100000)
            } else {
              if (mouseX > 50 && mouseX < 149 && mouseY < height - 50 && mouseY > height - 100) {
                blocks.length = 0
                number = 0
              } else if (mouseX > 1035 && mouseX < 1185 && mouseY > 15 && mouseY < 81) {
                undo()
              } else {
                if (mouseX > 176 && mouseX < 277 && mouseY < height - 50 && mouseY > height - 100) {
                  newQuestion()
                }
              }
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
  if (lastBlock.number == 100000) {
    if (mouseX < 0 || mouseX > 75 || mouseY < 314 || mouseY > 489) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 10000) {
    if (mouseX < 200 || mouseX > 385 || mouseY < 312 || mouseY > 502) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 1000) {
    if (mouseX < 399 || mouseX > 501 || mouseY < 313 || mouseY > 514) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 100) {
    if (mouseX < 600 || mouseX > 699 || mouseY < 313 || mouseY > 514) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 10) {
    if (mouseX < 800 || mouseX > 984 || mouseY < 314 || mouseY > 523) {
      undo()
      chartNum = 1
    }
  }
  if (lastBlock.number == 1) {
    if (mouseX < 1000 || mouseX > 1146 || mouseY < 313 || mouseY > 559) {
      undo()
      chartNum = 1
    }
  }

  return false
}

function undo() {
  if (blocks.length > 0) {
    blocks.pop()
    bp.pop()
  }
}