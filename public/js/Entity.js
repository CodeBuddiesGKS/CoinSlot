import BoundingBox from './BoundingBox.js';
import {Vector} from './math.js';

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};

export default class Entity {
    constructor() {
        this.lifetime = 0;
        this.offset = new Vector(0, 0);
        this.position = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.traits = [];
        this.velocity = new Vector(0, 0);
        
        this.bounds = new BoundingBox(this.position, this.size, this.offset);
    }
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
        
        this.lifetime += deltaTime;
    }
}

export class Trait {
    constructor(name) {
        this.NAME = name;
    }
    obstruct() {}
    update() {
        console.warn('Unhandled update call in Trait');
    }
}
