import {Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor(decomposeTime = 0) {
        super('Killable');
        this.deadTime = 0;
        this.decomposeTime = decomposeTime;
        this.isDead = false;
    }
    kill() {
        this.queue(() => this.isDead = true);
    }
    revive() {
        this.deadTime = 0;
        this.isDead = false;
    }
    update(entity, deltaTime, level) {
        if (this.isDead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.decomposeTime) {
                this.queue(() => level.entities.delete(entity));
            }
        }

        if (entity.position.y > 240) {
            this.decomposeTime = 0;
            this.kill();
        }
    }
}
