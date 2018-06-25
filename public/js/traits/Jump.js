import {Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('Jump');
        this.duration = 1/60;
        this.velocity = 470;
        this.engageTime = 0;
    }
    start() {
        this.engageTime = this.duration;
    }
    cancel() {
        this.engageTime = 0;
    }
    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}
