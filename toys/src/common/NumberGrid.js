import NumberBlock from "./NumberBlock";

export default class NumberGrid extends Phaser.GameObjects.Container {
    constructor (scene, x, y, numx, numy)
    {
        super(scene, x, y);
        for(let i=0; i< numx; ++i) {
            for(let j=0; j< numy; ++j) {
                
                this.add(new NumberBlock(scene, (i+1)*(j+1), 10+i*72, 10+j*72))
            }
        }                
        this.setPosition(x, y);
    }

    static preload(scene) {
        NumberBlock.preload(scene)
    }
}