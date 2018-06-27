import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('Go');
        this.acceleration = 400;
        this.deceleration = 300;
        this.dir = 0;
        this.distance = 0;
        this.heading = 1;
        this.windResistance = 1/2000;
    }
    update(entity, deltaTime) {
        const absX = Math.abs(entity.velocity.x);
        if (this.dir !== 0) {
            entity.velocity.x += this.acceleration * deltaTime * this.dir;
            if (entity.Jump && entity.Jump.freeFall <= 0) {
                this.heading = this.dir;
            } else if (!entity.Jump) {
                this.heading = this.dir;
            }
        } else if (entity.velocity.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.velocity.x += entity.velocity.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }
        const drag = this.windResistance
            * entity.velocity.x
            * absX;
        entity.velocity.x -= drag;

        this.distance += absX * deltaTime;
    }
}
