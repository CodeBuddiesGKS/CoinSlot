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
                entity.bounds.right = match.l;
                entity.velocity.x = 0;
                entity.obstruct(Sides.RIGHT);
            } else if (entity.velocity.x < 0 && x < match.r) {
                entity.bounds.left = match.r;
                entity.velocity.x = 0;
                entity.obstruct(Sides.LEFT);
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
                entity.bounds.bottom = match.t;
                entity.velocity.y = 0;
                entity.obstruct(Sides.BOTTOM);
            } else if (entity.velocity.y < 0 && y < match.b) {
                entity.bounds.top = match.b;
                entity.velocity.y = 0;
                entity.obstruct(Sides.TOP);
            }
        });
    }
}