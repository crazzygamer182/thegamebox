export default class Player extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.physics.world.enableBody(this, 0);
    }
    
    moveLeft() {
        this.x -= 5;
      }
      
      moveRight() {
        this.x += 5;
      }

      

    preload(scene) {
        scene.load.image('player', './assets/blue.png');
    }
}