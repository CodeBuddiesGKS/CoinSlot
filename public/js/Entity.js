import {Vector} from './math.js';

export default class Entity {
    constructor() {
        this.position = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.traits = [];
        this.velocity = new Vector(0, 0);
    }
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}

export class Trait {
    constructor(name) {
        this.NAME = name;
    }
    update() {
        console.warn('Unhandled update call in Trait');
    }
}
