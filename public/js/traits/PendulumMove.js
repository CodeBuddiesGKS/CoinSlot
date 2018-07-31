import {Trait, Sides} from '../Entity.js';

export default class PendulumMove extends Trait {
    constructor(dir = -1) {
        super('PendulumMove');
        this.dir = dir;
        this.slideSpeed = 200;
        this.walkSpeed = 30

        this.speed = this.walkSpeed;
    }
    obstruct(entity, side) {
        if (!this.on) {
            return;
        }
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.dir = -this.dir;
        }
    }
    update(entity, deltaTime, level) {
        if (!this.on) {
            return;
        }
        entity.velocity.x = this.speed * this.dir;
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
        this.queue((entity, deltaTime, level) => {
            entity.velocity.x = 0;
        });
    }
}
