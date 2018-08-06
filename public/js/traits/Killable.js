import {Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor(deadTimeLimit = 0) {
        super('Killable');
        this.deadTime = 0;
        this.deadTimeLimit = deadTimeLimit;
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
        if (!this.on) {
            return;
        }

        if (this.isDead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.deadTimeLimit) {
                this.queue(() => level.entities.delete(entity));
            }
        }
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
    }
}
