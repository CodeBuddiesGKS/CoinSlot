import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('Go');
        this.dir = 0;
        this.distance = 0;
        this.heading = 1;
        this.speed = 6000;
    }
    update(entity, deltaTime) {
        entity.velocity.x = this.speed * this.dir * deltaTime;
        if (this.dir) {
            this.heading = this.dir;
            this.distance += Math.abs(entity.velocity.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }
}
