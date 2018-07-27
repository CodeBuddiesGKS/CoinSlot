import {Sides, Trait} from '../Entity.js';
import {Size, Color} from '../traits/Shift.js';

export default class Uppercut extends Trait {
    constructor() {
        super('Uppercut');
        this.tileToBounce;
    }
    bounceTile(tile) {
        this.tileToBounce = tile;
        this.queue((entity, deltaTime, level) => {
            const posX = this.tileToBounce.l / 16;
            const posy = this.tileToBounce.t / 16;
            console.log('bounce tile', entity, deltaTime, level, this.tileToBounce);
        });
    }
    obstruct(entity, side, match) {
        if (!entity.Solid.obstructs) {
            return;
        }
        if (side === Sides.TOP) {
            if (match.tile.type === "brick") {
                if (entity.Shift.size === Size.LG) {
                    console.log('break brick');
                } else {
                    console.log('bounce brick');
                    this.bounceTile(match);
                }
            } else if (match.tile.type === "powerup") {
                console.log('bounce & pop powerup');
            }
        }
    }
}
