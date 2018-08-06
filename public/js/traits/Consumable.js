import {Trait} from '../Entity.js';

export default class Consumable extends Trait {
    constructor() {
        super('Consumable');
        this.isConsumed = false;
    }
    consume() {
        this.queue(() => this.isConsumed = true);
    }
    update(entity, deltaTime, level) {
        if (!this.on) {
            return;
        }

        if (this.isConsumed) {
            level.entities.delete(entity);
        }
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
    }
}
