import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('Go');
        this.dir = 0;
        this.speed = 6000;
    }
    update(entity, deltaTime) {
        entity.velocity.x = this.speed * this.dir * deltaTime;
    }
}
