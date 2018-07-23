import {Trait, Sides} from '../Entity.js';

export default class PendulumMove extends Trait {
    constructor() {
        super('PendulumMove');
        this.dir = -1;
        this.enabled = 1;
        this.slideSpeed = 200;
        this.walkSpeed = 30

        this.speed = this.walkSpeed;
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
