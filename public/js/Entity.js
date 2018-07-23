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
    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }
    draw() {}
    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        });
    }
    obstruct(side, match) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }
    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });
        
        this.lifetime += deltaTime;
    }
}

export class Trait {
    constructor(name) {
        this.NAME = name;
        this.tasks = [];
    }
    collides(us, them) {}
    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }
    obstruct(entity, side, match) {}
    queue(task) {
        this.tasks.push(task);
    }
    update() {}
}
