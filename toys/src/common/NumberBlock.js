import blockImg from '../assets/white.png';
import greyBlockImg from '../assets/grey.png';
import yellowBlockImg from '../assets/yellow.png';
import emptyBlock from '../assets/empty.png';
import greenBlockImg from '../assets/green.png';
import blueBlockImg from '../assets/blue.png';

export default class NumberBlock extends Phaser.GameObjects.Container {
    constructor (scene, num, x, y, isNumVisible, isDropZone)
    {
        super(scene, x, y);
        this.originalX = x
        this.originalY = y
        this.gridX = 0
        this.gridY = 0
        this.num = num
        this.img = 'white'
        //this.setTexture('numberblock');  
        if (isNumVisible) {
            this.back = new Phaser.GameObjects.Image(scene, 0, 0, this.img)
            this.add(this.back)
            
            let txt = new Phaser.GameObjects.Text(scene, 0, 0, num, { align: 'center', color: 'black', fontFamily: 'Verdana, Times, serif', fontSize: 35, fontStyle: 'bold' })
            txt.setOrigin(0.5, 0.5)
            this.add(txt);
        }  else {
            this.back = new Phaser.GameObjects.Image(scene, 0, 0, 'emptyBlock')
            this.add(this.back)
        }     
        this.setInteractive(new Phaser.Geom.Rectangle(-36, -36, 72, 72), Phaser.Geom.Rectangle.Contains)
        this.setPosition(x, y);

        if (isDropZone) {
            var zone = new Phaser.GameObjects.Zone(scene, 0, 0, 72, 72);
            zone.setRectangleDropZone(72, 72);
            this.add(zone); 
        }
        
    }

    goBack() {
        this.x = this.originalX
        this.y = this.originalY
    }

    highlight(color) {
        this.back.setTexture(color)
    }

    isHighlighted() {
        return (this.back.texture.key !== 'white')
    }

    static preload(scene) {
        scene.load.image('white', blockImg);
        scene.load.image('grey', greyBlockImg);
        scene.load.image('emptyBlock', emptyBlock);
        scene.load.image('yellow', yellowBlockImg);
        scene.load.image('green', greenBlockImg);
        scene.load.image('blue', blueBlockImg);
        
    }
}