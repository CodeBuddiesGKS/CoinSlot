import {Sides, Trait} from '../Entity.js';
import {Size, Color} from '../traits/Shift.js';

const BOUNCE_DURATION = 15/60;

export default class Uppercut extends Trait {
    constructor() {
        super('Uppercut');
    }
    handleBrick(tile, entity) {
        this.brick = tile;
        this.entity = entity;
        this.queue((entity, deltaTime, level) => {
            const x = this.brick.l / 16;
            const y = this.brick.t / 16;
            const tile = level.tileCollider.tiles.matrix.grid[x][y];
            
            if (this.entity.Shift.size === Size.LG) {
                console.log('break brick');
                // tile.name = 'ow-sky';
                // tile.type = undefined;
            } else {
                console.log('bounce brick');
                tile.bounceDuration = BOUNCE_DURATION;
            }
        });
    }
    handlePowerup(tile) {
        this.powerup = tile;
        this.queue((entity, deltaTime, level) => {
            const x = this.powerup.l / 16;
            const y = this.powerup.t / 16;
            const tile = level.tileCollider.tiles.matrix.grid[x][y];
            if (tile.contains.length) {
                tile.bounceDuration = BOUNCE_DURATION;
                tile.queuePop = true;
            }
        });
    }
    obstruct(entity, side, match) {
        if (!this.on) {
            return;
        }
        if (!entity.Solid.on) {
            return;
        }
        if (side === Sides.TOP) {
            if (match.tile.type === "brick") {
                this.handleBrick(match, entity);
            } else if (match.tile.type === "powerup") {
                this.handlePowerup(match);
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
