import TileResolver from './TileResolver.js';
import {Sides} from './Entity.js';

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    checkX(entity) {
        let x;
        if (entity.velocity.x > 0) {
            x = entity.bounds.right;
        } else if (entity.velocity.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top,
            entity.bounds.bottom
        );
        matches.forEach(match => {
            if (!isObstructable(match)) {
                return;
            }
            if (entity.velocity.x > 0 && x > match.l) {
                entity.obstruct(Sides.RIGHT, match);
            } else if (entity.velocity.x < 0 && x < match.r) {
                entity.obstruct(Sides.LEFT, match);
            }
        });
    }
    checkY(entity) {
        let y;
        if (entity.velocity.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.velocity.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            entity.bounds.left,
            entity.bounds.right,
            y, y
        );
        callObstructForY(entity, matches, y);
    }
}

function callObstructForY(entity, matches, y) {
    if (matches.length === 1) {
        let match = matches[0];
        if (!isObstructable(match)) {
            return;
        }
        if (entity.velocity.y > 0 && y > match.t) {
            entity.obstruct(Sides.BOTTOM, match);
        } else if (entity.velocity.y < 0 && y < match.b) {
            entity.obstruct(Sides.TOP, match);
        }
        
    } else if (matches.length > 1) {
        let closestObstructableTile = undefined;
        matches.forEach(m => {
            if (isObstructable(m)) {
                let deltaX = +Math.abs(m.cx - entity.bounds.centerX).toFixed(1);
                if (!closestObstructableTile) {
                    closestObstructableTile = m;
                    closestObstructableTile.deltaX = deltaX;
                } else if (deltaX < closestObstructableTile.deltaX) {
                    closestObstructableTile = m;
                    closestObstructableTile.deltaX = deltaX;
                }
            }
        });
        if (!closestObstructableTile) {
            return;
        } else {
            if (entity.velocity.y > 0 && y > closestObstructableTile.t) {
                entity.obstruct(Sides.BOTTOM, closestObstructableTile);
            } else if (entity.velocity.y < 0 && y < closestObstructableTile.b) {
                entity.obstruct(Sides.TOP, closestObstructableTile);
            }
        }
    }
}

function isObstructable(match) {
    return match.tile.type === 'impassable'
        || match.tile.type === 'brick'
        || match.tile.type === 'powerup';
}