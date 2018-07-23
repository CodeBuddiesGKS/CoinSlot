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
            if (match.tile.type !== 'impassable') {
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
        matches.forEach(match => {
            if (match.tile.type !== 'impassable') {
                return;
            }
            if (entity.velocity.y > 0 && y > match.t) {
                entity.obstruct(Sides.BOTTOM, match);
            } else if (entity.velocity.y < 0 && y < match.b) {
                entity.obstruct(Sides.TOP, match);
            }
        });
    }
}