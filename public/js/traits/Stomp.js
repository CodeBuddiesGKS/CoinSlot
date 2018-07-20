import {Trait} from '../Entity.js';

export default class Stomp extends Trait {
    constructor() {
        super('Stomp');
        this.bounceSpeed = 200;
        this.queueBounce = false;
    }
    bounce() {
        this.queueBounce = true;
    }
    update(entity, deltaTime, level) {
        if (this.queueBounce) {
            entity.velocity.y = -this.bounceSpeed;
            this.queueBounce = false;
        }
    }
}
