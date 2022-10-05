import Phaser, { Game } from "phaser";
import NumberBlock from "./common/NumberBlock";
import getGameConfig from './GameConfig';
import inst from './assets/sideimage.png';
import correct from './assets/youwon_new.png'
import lost from './assets/botwon_new.png'
import bottt from './assets/botsmall.png'
import yesss from './assets/yes.mp3'
import botyesss from './assets/botyes.mp3'

export default class BlockIt extends Phaser.Scene {

    constructor ()
    {
        super('BlockIt');
        
        this.allNumBlocks = []
        this.gameOver = false
        this.isPlayerTurn = true
        
    }

    create ()
    {
        this.createNumberGrid(10, 10, 3)
        this.newNumbers()
        this.input.on('pointerdown', this.handleClick, this);
        this.question = new Phaser.GameObjects.Text(this, 550, 47.5, this.num1 + "X" + this.num2, { align: 'center', color: 'cyan', fontFamily: 'Verdana, Times, serif', fontSize: 67.5})
        this.question.setOrigin(0.5, 0.5)
        this.add.existing(this.question) 
        this.question2 = new Phaser.GameObjects.Text(this, 325, 47.5, " ", { align: 'center', color: 'lime', fontFamily: 'Verdana, Times, serif', fontSize: 67.5})
        this.question2.setOrigin(0.5, 0.5)
        this.add.existing(this.question2) 
        this.instrutions = new Phaser.GameObjects.Image(this, 975, 400, 'instru')
        this.add.existing(this.instrutions)
        this.corrects = new Phaser.GameObjects.Image(this, 500, 450, 'cor')
        this.bot = new Phaser.GameObjects.Image(this, 200, 50, 'bott')
        this.yes = this.sound.add('yess');
        this.botyes = this.sound.add('botyess');
    }
    createNumberGrid(numx, numy, missing) {
        for(let i=0; i< numx; ++i) {
            for(let j=0; j< numy; ++j) {
                let num = (i+1)*(j+1)
                let loc = j*10+i     
                let numBlock = new NumberBlock(this, num, 100+i*72, 100+j*72 + 50, true, false)    
                numBlock.gridX = i
                numBlock.gridY = j      
                this.add.existing(numBlock)
                if(!this.allNumBlocks[i]) {
                    this.allNumBlocks[i] = new Array()
                } 
                this.allNumBlocks[i][j] = numBlock
            }
        }
    }

    check(x, y) {
        this.pCheckCount = 0
        this.cCheckCount = 0
        for (let i = 0; i < 10; i++) {
            if (this.allNumBlocks[i][y].back.texture.key == 'blue') {
                this.pCheckCount += 1
                console.log(this.pCheckCount)
            } else {
                this.pCheckCount = 0
                if (this.allNumBlocks[i][y].back.texture.key == 'green') {
                    this.cCheckCount += 1
                } else {
                    this.cCheckCount = 0
                }
            }
            if (this.pCheckCount == 4) {
                this.time.delayedCall(1000, this.youWin, null, this)           
                this.gameOver = true              
            } else {
                if (this.cCheckCount == 4) {
                    this.time.delayedCall(1000, this.botWins, null, this) 
                    this.gameOver = true        
                }
            }
        }
        this.pCheckCount = 0
        this.cCheckCount = 0
        for (let i = 0; i < 10; i++) {
            if (this.allNumBlocks[x][i].back.texture.key == 'blue') {
                this.pCheckCount += 1
                console.log(this.pCheckCount)
            } else {
                this.pCheckCount = 0
                if (this.allNumBlocks[x][i].back.texture.key == 'green') {
                    this.cCheckCount += 1
                } else {
                    this.cCheckCount = 0
                }
            }
            if (this.pCheckCount == 4) {
                this.time.delayedCall(1000, this.youWin, null, this) 
                this.gameOver = true        
            } else {
                if (this.cCheckCount == 4) {
                    this.time.delayedCall(1000, this.botWins, null, this) 
                    this.gameOver = true        
                }
            }
        }
        this.pCheckCount = 0
        this.cCheckCount = 0
        let ix = x - Math.min(x, y)
        let j = y - Math.min(x, y)
        if (j < 0) {
            ix = ix - j
            j = 0
        }
        while (ix < 10 && j < 10) {
            if (this.allNumBlocks[ix][j].back.texture.key == 'blue') {
                this.pCheckCount += 1
                console.log(this.pCheckCount)
            } else {
                this.pCheckCount = 0
                if (this.allNumBlocks[ix][j].back.texture.key == 'green') {
                    this.cCheckCount += 1
                } else {
                    this.cCheckCount = 0
                }
            }
            if (this.pCheckCount == 4) {
                this.time.delayedCall(1000, this.youWin, null, this) 
                this.gameOver = true        
            } else {
                if (this.cCheckCount == 4) {
                    this.time.delayedCall(1000, this.botWins, null, this) 
                    this.gameOver = true        
                }
            }
            ix++
            j++
        }
        ix = x - Math.max(x, y)
        j = y + Math.max(x, y)
        if (ix < 0) {
            j -= ix
            ix = 0
        }
        if (j > 9) {
            ix = ix + j - 9
            j = 9
        }
        
        while (ix < 10 && j > 0) {
            if (this.allNumBlocks[ix][j].back.texture.key == 'blue') {
                this.pCheckCount += 1
                console.log(this.pCheckCount)
            } else {
                this.pCheckCount = 0
                if (this.allNumBlocks[ix][j].back.texture.key == 'green') {
                    this.cCheckCount += 1
                } else {
                    this.cCheckCount = 0
                }
            }
            if (this.pCheckCount == 4) {
                this.time.delayedCall(1000, this.youWin, null, this) 
                this.gameOver = true        
            } else {
                if (this.cCheckCount == 4) {
                    this.time.delayedCall(1000, this.botWins, null, this) 
                    this.gameOver = true        
                }
            }
            ix++
            j--
        }
    }

    youWin() {
        console.log('You win!')
        this.add.existing(this.corrects)        
    }

    botWins() {        
        console.log('Computer wins!')
        this.lo = new Phaser.GameObjects.Image(this, 500, 450, 'los')
        this.add.existing(this.lo)        
    }

    comTurn() {
        this.allNumBlocks[this.num1-1][this.num2-1].highlight('green')
        this.botyes.play()
        this.check(this.num1 - 1, this.num2 - 1)   
        if(!this.gameOver) {
            var timer = this.time.delayedCall(1000, this.newQuestionForPlayer, null, this)     
        }
    }

    newQuestionForPlayer() {
        this.newNumbers()
        this.question.destroy()
        this.question = new Phaser.GameObjects.Text(this, 550, 47.5, this.num1 + "X" + this.num2, { align: 'center', color: 'cyan', fontFamily: 'Verdana, Times, serif', fontSize: 67.5})
        this.question.setOrigin(0.5, 0.5)
        this.add.existing(this.question)
        this.question2.destroy()
        this.bot.destroy()
        this.isPlayerTurn = true
    }

    newNumbers() {
        for (let k=0; k < 1;) {
            this.fine = 0
            this.num1 = Math.floor(Math.random() * 9) + 1
            this.num2 = Math.floor(Math.random() * 9) + 1
            for(let i=0; i< 10; ++i) {
                for(let j=0; j< 10; ++j) {
                    if (this.allNumBlocks[i][j].num == this.num1*this.num2) {
                        if (this.allNumBlocks[i][j].back.texture.key != 'green' && this.allNumBlocks[i][j].back.texture.key != 'blue') {
                            this.fine++
                        }
                    }
                }
            }
            if (this.fine != 0) {
                k = 1
            }
        }
    }

    newNumbersForCom() {
      for (let k=0; k < 1;) {
        this.fine = 1
        this.num1 = Math.floor(Math.random() * 9) + 1
        this.num2 = Math.floor(Math.random() * 9) + 1
        for(let i=0; i< 10; ++i) {
            for(let j=0; j< 10; ++j) {
                if (this.allNumBlocks[i][j].num == this.num1*this.num2) {
                    if (this.allNumBlocks[i][j].back.texture.key == 'green' || this.allNumBlocks[i][j].back.texture.key == 'blue') {
                        this.fine--
                    }
                }
            }
        }
        if (this.fine == 1) {
            k = 1
        }
      }
    }

    newQuestionForCom() {
        this.newNumbersForCom()
        this.question2.destroy()
        this.bot.destroy()
        this.question2 = new Phaser.GameObjects.Text(this, 325, 47.5, this.num1 + "X" + this.num2, { align: 'center', color: 'lime', fontFamily: 'Verdana, Times, serif', fontSize: 67.5})
        this.question2.setOrigin(0.5, 0.5)
        this.add.existing(this.question2)
        this.bot = new Phaser.GameObjects.Image(this, 200, 50, 'bott')
        this.add.existing(this.bot)
        this.question.destroy()
        if(!this.gameOver) {
            var timer = this.time.delayedCall(2000, this.comTurn, null, this)
        }
    }

    handleClick(pointer, gameObjects) {
        if(!this.isPlayerTurn) return
        let numberBlock = gameObjects[0]
        if (numberBlock.num == this.num1*this.num2){
            if (numberBlock.back.texture.key != 'green' && numberBlock.back.texture.key != 'blue'){
                numberBlock.highlight('blue')
                this.check(numberBlock.gridX, numberBlock.gridY)
                this.yes.play()
                this.isPlayerTurn = false
                if(!this.gameOver) {
                    var timer = this.time.delayedCall(1000, this.newQuestionForCom, null, this)
                }
            }
        }
    }

    preload ()
    {
        //preload all the sprite textures and additional textures needed
        NumberBlock.preload(this);
        this.load.image('cor', correct);
        this.load.image('los', lost);
        this.load.image('instru', inst);
        this.load.image('bott', bottt);
        this.load.audio('yess', yesss);
        this.load.audio('botyess', botyesss);
    }
}





var game = new Phaser.Game(getGameConfig(BlockIt));