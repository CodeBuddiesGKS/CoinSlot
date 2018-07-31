import {Trait, Sides} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('Jump');
        this.airTime = 0;
        this.duration = 18/60; // 1/60
        this.engageTime = 0;
        this.gracePeriod = 1/10;
        this.requestTime = 0;
        this.speedBoost = 0.1;
        this.velocity = 200; // 500
    }
    get freeFall() {
        return this.airTime > 0;
    }
    start() {
        this.requestTime = this.gracePeriod;
    }
    cancel() {
        this.engageTime = 0;
    }
    obstruct(entity, side) {
        if (!this.on) {
            return;
        }
        if (side === Sides.BOTTOM) {
            this.airTime = -1;
        } else if (side === Sides.TOP) {
            this.cancel();
        }
    }
    update(entity, deltaTime, level) {
        if (!this.on) {
            return;
        }
        if (this.requestTime > 0) {
            if (this.airTime < 0) {
                this.engageTime = this.duration;
            }
            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.velocity.y = -(this.velocity
                + (Math.abs(entity.velocity.x) * this.speedBoost));
            this.engageTime -= deltaTime;
        }
        ++this.airTime;
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
        this.queue((entity, deltaTime, level) => {
            entity.velocity.y = 0;
            this.airTime = 0;
            this.engageTime = 0;
            this.requestTime = 0;
        });
    }
}
