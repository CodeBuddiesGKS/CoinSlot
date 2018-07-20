import {Trait, Sides} from '../Entity.js';

export default class PendulumWalk extends Trait {
    constructor() {
        super('PendulumWalk');
        this.dir = -1;
        this.enabled = 1;
        this.speed = 30;
    }
    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.dir = -this.dir;
        }
    }
    update(entity, deltaTime, level) {
        entity.velocity.x = this.speed * this.dir * this.enabled;
    }
}
