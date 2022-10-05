export default function getPhysicsGameConfig(scene) {
    return {
        type: Phaser.WEBGL,        
        parent: 'phaser-example',
        physics: {
            default: "arcade",
            arcade: {
              gravity: { x: 0, y: 0 }
            }
          },
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1150,
            height: 860,
        },  
        scene: [ scene ]
    };
}