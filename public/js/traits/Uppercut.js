import {Sides, Trait} from '../Entity.js';
import {Size, Color} from '../traits/Shift.js';

const BOUNCE_DURATION = 15/60;

export default class Uppercut extends Trait {
    constructor() {
        super('Uppercut');
    }
    handleBrick(tile) {
        this.brick = tile;
        this.queue((entity, deltaTime, level) => {
            const x = this.brick.l / 16;
            const y = this.brick.t / 16;
            const tile = level.tileCollider.tiles.matrix.grid[x][y];
            
            if (entity.Shift.size === Size.LG) {
                tile.name = 'ow-sky';
                tile.type = undefined;
                // spawn a broken brick with Physics turned off
                // spawn 4 pieces with Solid turned off
            } else {
                tile.bounceDuration = BOUNCE_DURATION;
            }
        });
    }
    handlePowerup(tile) {
        this.powerup = tile;
        this.queue((entity, deltaTime, level) => {
            const tileSize = level.tileCollider.tiles.tileSize
            const x = this.powerup.l / tileSize;
            const y = this.powerup.t / tileSize;
            const tile = level.tileCollider.tiles.matrix.grid[x][y];

            if (tile.contains.length) {
                tile.bounceDuration = BOUNCE_DURATION;
                
                const item = tile.contains.pop();
                if (item === "coin") {
                    const coin = level.entityFactory.coin();
                    coin.Behavior.avatar = entity;
                    coin.position.set(x*tileSize, y*tileSize - tileSize);
                    coin.velocity.y = -336;
                    level.entities.add(coin);
                } else if (item === "upgrade") {
                    //check marios size to determine item
                    const mushroom = level.entityFactory.mushroom();
                    mushroom.position.set(x*tileSize, y*tileSize - 1);
                    level.entities.add(mushroom);
                }
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
                this.handleBrick(match);
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
