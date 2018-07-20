import {Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('Killable');
        this.deadTime = 0;
        this.decomposeTime = 0.40;
        this.isDead = false;
    }
    kill() {
        this.isDead = true;
    }
    revive() {
        this.isDead = false;
        this.deadTime = 0;
    }
    update(entity, deltaTime, level) {
        if (this.isDead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.decomposeTime) {
                level.entities.delete(entity);
            }
        }

        if (entity.position.y > 240) {
            this.kill();
        }
    }
}
