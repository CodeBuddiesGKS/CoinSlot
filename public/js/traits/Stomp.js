import {Trait} from '../Entity.js';

export default class Stomp extends Trait {
    constructor() {
        super('Stomp');
        this.bounceSpeed = 200;
    }
    bounce(us, them) {
        us.bounds.bottom = them.bounds.top - 1;
        us.velocity.y = -this.bounceSpeed;
    }
    collides(us, them) {
        if (!them.Killable
            || (them.Killable && them.Killable.isDead)
            || (us.Killable && us.Killable.isDead)) {
            return;
        }
        if (us.velocity.y > them.velocity.y) {
            this.bounce(us, them);
        }
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
    }
}
