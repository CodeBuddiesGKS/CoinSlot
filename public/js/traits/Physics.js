import {Sides, Trait} from '../Entity.js';

export default class Physics extends Trait {
    constructor() {
        super('Physics');
    }
    update(entity, deltaTime, level) {
        if (!this.on) {
            return;
        }
        entity.position.x += entity.velocity.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.position.y += entity.velocity.y * deltaTime;
        level.tileCollider.checkY(entity);

        entity.velocity.y += level.gravity * deltaTime;
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
    }
}
