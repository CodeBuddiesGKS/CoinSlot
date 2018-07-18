import {Trait, Sides} from '../Entity.js';

export default class PendulumWalk extends Trait {
    constructor() {
        super('PendulumWalk');
        this.speed = 30;
        this.dir = -1;
    }
    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.dir = -this.dir;
        }
    }
    update(entity, deltaTime) {
        entity.velocity.x = this.speed * this.dir;
    }
}
