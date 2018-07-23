import {Sides, Trait} from '../Entity.js';

export default class Solid extends Trait {
    constructor() {
        super('Solid');
        this.obstructs = true;
    }
    obstruct(entity, side, match) {
        if (!this.obstructs) {
            return;
        }
        if (side === Sides.TOP) {
            entity.bounds.top = match.b;
            entity.velocity.y = 0;
        } else if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.t;
            entity.velocity.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.r;
            entity.velocity.x = 0;
        } else if (side === Sides.RIGHT) {
            entity.bounds.right = match.l;
            entity.velocity.x = 0;
        }
    }
}
