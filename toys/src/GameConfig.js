export default function getGameConfig(scene) {
    return {
        type: Phaser.WEBGL,        
        parent: 'phaser-example',
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