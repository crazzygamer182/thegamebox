import Phaser, { Game } from "phaser";
import getPhysicsGameConfig from './PhysicsConfig';
import Player from './FactorSector/Player.js';
import playerImg from './assets/blue.png';

export default class FactorSector extends Phaser.Scene {

    constructor ()
    {
        super('FactorSector');
       
    }

    preload() {
        //Player.preload(this)
        this.load.image('player', playerImg);
    }

    update () {
        var cursorKeys = this.input.keyboard.createCursorKeys();
        if (cursorKeys.left.isDown) {
            this.player.moveLeft();
        }
        else if (cursorKeys.right.isDown) {
            this.player.moveRight();
        }
    }


    create ()
    {
       console.log("Inside the Create")
        this.player = new Player(this, 500, 700);
        this.add.existing(this.player)
        //let player = new Phaser.GameObjects.Sprite(this, 500, 700,'player');
        //this.add.existing(player);
    }
}



var game = new Phaser.Game(getPhysicsGameConfig(FactorSector));