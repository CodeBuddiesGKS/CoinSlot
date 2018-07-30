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
            const x = this.tileToBounce.l / 16;
            const y = this.tileToBounce.t / 16;
            const tile = level.tileCollider.tiles.matrix.grid[x][y];
            tile.bounceDuration = 15/60;
            // tile.name = 'ow-sky';
            // tile.type = undefined;
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
                this.bounceTile(match);
            }
        }
    }
}
