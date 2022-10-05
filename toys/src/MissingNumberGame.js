import Phaser, { Game } from "phaser";
import NumberBlock from "./common/NumberBlock";
import getGameConfig from './GameConfig';
import correct from './assets/CORRECT.png'
import lo from './assets/logo.jpeg'

Object.defineProperty(Array.prototype, 'shuffle', {
    value: function() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
});


export default class MissingNumberGame extends Phaser.Scene {

    constructor ()
    {
        super('MissingNumberGame');
        this.left = 5
    }

    create ()
    {
      console.log("Inside the Create")
      let missing = []
      for(let i=0; i<5; ++i) {
        missing.push(this.getRandomMissing())
      }  
      this.createNumberGrid(10,10, missing)
      for(let i=0; i<5; ++i) {
        missing.push(this.getRandomMissing())
      }
      let txt = new Phaser.GameObjects.Text(this, 580, 50, "Place The Missing Numbers On The Times Table", { align: 'center', color: 'green', fontFamily: 'Verdana, Times, serif', fontSize: 40, fontStyle: 'bold' })
      let ins = new Phaser.GameObjects.Text(this, 400, 50, "Drag the number squares into the correct empty spots on the number grid", { align: 'center', color: 'lime', fontFamily: 'Verdana, Times, serif', fontSize: 67.5, fontStyle: 'bold' })
      txt.setOrigin(0.5, 0.5)
      this.add.existing(txt)  
      missing.shuffle()
      console.log(missing)
      this.createAvailableNumbers(missing)
      this.input.on('drag', this.handleDrag, this);
      this.input.on('dragend', this.handleDragEnd, this);
      this.input.on('drop', this.handleDrop, this);
      this.corrects = new Phaser.GameObjects.Image(this, 600, 450, 'cor')
      this.logo = new Phaser.GameObjects.Image(this, 950, 700, 'log')
      //this.add.existing(this.logo)
    }

    handleDrag(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    }
      
      
    handleDragEnd(pointer, gameObject, dropped) {
        if(!dropped) {
            gameObject.goBack();
        }        
    }

    handleDrop(pointer, gameObject, dropZone) {
        console.log(dropZone)        
        if (gameObject.num == dropZone.parentContainer.num) {
            gameObject.x = dropZone.parentContainer.x
            gameObject.y = dropZone.parentContainer.y
            this.input.setDraggable(gameObject, false);
            this.left--
            if (this.left == 0) {
                var timer = this.time.delayedCall(2500, this.done, null, this)
                this.add.existing(this.corrects)
            }
        } else {
            gameObject.goBack();
        }        
    }

    done() {
        console.log("Done")
        this.left = 5
        this.scene.restart()
    }

    createAvailableNumbers(numbers) {
        let i=0, j=0
        numbers.forEach((num) => {
            let numx = parseInt(num/10)+1
            let numy = num%10+1
            let numObj = new NumberBlock(this, numx * numy , 900 + j*100, 200 + parseInt(i/2)*80, true)
            this.add.existing(numObj)  
            this.input.setDraggable(numObj);          
            i++
            if(i%2 == 0) {
                j=0
            } else {
                j=1             
            }
        })
    }

    getRandomMissing() {
        let n = parseInt(10 + Math.random()*89)
        let left = 5
        while (n%10 == 0) {
            n = parseInt(10 + Math.random()*89)
        }
        return n
    }

    createNumberGrid(numx, numy, missing) {
        console.log(missing)
        for(let i=0; i< numx; ++i) {
            for(let j=0; j< numy; ++j) {
                let num = (i+1)*(j+1)
                let loc = j*10+i                
                if (missing.includes(loc)) {
                    this.add.existing(new NumberBlock(this, num , 100+i*72, 100+j*72 + 50, false, true))
                } else {
                    this.add.existing(new NumberBlock(this, num , 100+i*72, 100+j*72 + 50, true, false))
                }
                
            }
        }
    }

    preload ()
    {
        //preload all the sprite textures and additional textures needed
        NumberBlock.preload(this);
        this.load.image('cor', correct);
        this.load.image('log', lo);
    }
}



var game = new Phaser.Game(getGameConfig(MissingNumberGame));