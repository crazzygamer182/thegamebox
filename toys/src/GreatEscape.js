import Phaser, { Game } from "phaser";
import NumberBlock from "./common/NumberBlock";
import getGameConfig from './GameConfig';

export default class GreatEscape extends Phaser.Scene {
    preload ()
    {
        //preload all the sprite textures and additional textures needed
        NumberBlock.preload(this);
    }

    constructor() {
        super('GreatEscape');
        this.turns = 0
        this.startingSide = ''
        this.cellMatrix = [new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)]
        this.task = ''
        let rand = Math.floor(Math.random() * 10); 
        if (rand == 0) {
            this.task = 'Select a prime number'
        } else if (rand == 1) {
            this.task = 'Select a perfect square'
        } else {
            this.task = 'Select a multiple of '+rand
        }
        this.taskNum = rand
    }

    create() {
        console.log("Inside the Create")
        this.createNumberGrid(10, 10)
        this.input.on('pointerdown', this.handleClick, this);
        this.txt = new Phaser.GameObjects.Text(this, 200, 20, this.task, { align: 'center', color: 'lime', fontFamily: 'Georgia, Times, serif', fontSize: 45, fontStyle: 'bold' })
        this.counterLabel = new Phaser.GameObjects.Text(this, 965, 720, 'Turns:', { align: 'center', color: 'lime', fontFamily: 'Georgia, Times, serif', fontSize: 45, fontStyle: 'bold' })
        this.counter = new Phaser.GameObjects.Text(this, 1025, 750, this.turns, { align: 'center', color: 'lime', fontFamily: 'Georgia, Times, serif', fontSize: 45, fontStyle: 'bold' })
        this.add.existing(this.txt)
        this.add.existing(this.counterLabel)
        this.add.existing(this.counter)
    }

    limit(index) {
        if (index < 0) {
            return 0
        } else if (index > 9) {
            return 9
        } else {
            return index
        }
    }

    verifyAdjacent(block) {
        let blockJ = -1
        let blockI = -1
        while (blockJ == -1) {
            blockI++
            blockJ = this.cellMatrix[blockI].indexOf(block)
        }
        console.log(blockI)
        console.log(blockJ)
        let topLeft = this.cellMatrix[this.limit(blockI - 1)][this.limit(blockJ - 1)]
        let top = this.cellMatrix[this.limit(blockI)][this.limit(blockJ - 1)]
        let topRight = this.cellMatrix[this.limit(blockI + 1)][this.limit(blockJ - 1)]
        let right = this.cellMatrix[this.limit(blockI + 1)][this.limit(blockJ)]
        let bottomRight = this.cellMatrix[this.limit(blockI + 1)][this.limit(blockJ + 1)]
        let bottom = this.cellMatrix[this.limit(blockI)][this.limit(blockJ + 1)]
        let bottomLeft = this.cellMatrix[this.limit(blockI - 1)][this.limit(blockJ + 1)]
        let left = this.cellMatrix[this.limit(blockI - 1)][this.limit(blockJ)]
        let bool = (topLeft.isHighlighted() || top.isHighlighted() || topRight.isHighlighted() || right.isHighlighted() || bottomRight.isHighlighted() || bottom.isHighlighted() || bottomLeft.isHighlighted() || left.isHighlighted())
        return bool
    }

    verifyTask(block) {
        let num = block.num
        if (this.taskNum == 0) {
            for(var i = 2; i < num; i++)
                if(num % i === 0) return false;
            return num > 1;
        } else if (this.taskNum == 1) {
            return Number.isInteger(Math.sqrt(num))
        } else {
            return (num % this.taskNum == 0)
        }
    }

    createNumberGrid(numx, numy, highlighted) {
        for (let i = 0; i < numx; i++){
            for (let j = 0; j < numy; j++){
                let num = 10 * j + i + 1
                let cell = this.add.existing(new NumberBlock(this, num, 240 + i * 72, 80 + j * 72 + 50, true, false))
                this.cellMatrix[i][j]=cell
            }
        }
    }

    handleClick(pointer, gameObjects) {
        let numberBlock = gameObjects[0]
        let edgeVerified = true
        if (this.turns == 0) {
            if (Math.floor(numberBlock.num / 10) == 0) {
                this.startingSide = 'top'
            } else if (Math.ceil(numberBlock.num / 10) == 10) {
                this.startingSide = 'bottom'
            } else if (numberBlock.num % 10 == 1) {
                this.startingSide = 'left'
            } else if (numberBlock.num % 10 == 0) {
                this.startingSide = 'right'
            } else {
                edgeVerified = false
            }
        }
        if (this.verifyTask(numberBlock) && edgeVerified) {
            numberBlock.highlight('green')
            this.updateTask()
            this.turns++
            this.counter.destroy()
            this.counter = new Phaser.GameObjects.Text(this, 1025, 750, this.turns, { align: 'center', color: 'lime', fontFamily: 'Georgia, Times, serif', fontSize: 45, fontStyle: 'bold' })
            this.add.existing(this.counter)
        }
    }

    updateTask() { 
        let rand = Math.floor(Math.random() * 10); 
        if (rand == 0) {
            this.task = 'Select a prime number'
        } else if (rand == 1) {
            this.task = 'Select a perfect square'
        } else {
            this.task = 'Select a multiple of '+rand
        }
        this.txt.setText(this.task)
        this.taskNum = rand
    }
}


var game = new Phaser.Game(getGameConfig(GreatEscape));