import Phaser, { Game } from "phaser";
import getGameConfig from './GameConfig';

export default class TwistedTimeTableGame extends Phaser.Scene {

    constructor ()
    {
        super('TwistedTimeTableGame');
    }

    create ()
    {
       console.log("Inside the Create")
    }
}



var game = new Phaser.Game(getGameConfig(TwistedTimeTableGame));