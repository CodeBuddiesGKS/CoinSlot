import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    checkX(entity) {
        let x;
        if (entity.velocity.x > 0) {
            x = entity.position.x + entity.size.x;
        } else if (entity.velocity.x < 0) {
            x = entity.position.x;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            x, x,
            entity.position.y,
            entity.position.y + entity.size.y
        );
        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
            if (entity.velocity.x > 0 && x > match.l) {
                entity.position.x = match.l - entity.size.x;
                entity.velocity.x = 0;
            } else if (entity.velocity.x < 0 && x < match.r) {
                entity.position.x = match.r;
                entity.velocity.x = 0;
            }
        });
    }
    checkY(entity) {
        let y;
        if (entity.velocity.y > 0) {
            y = entity.position.y + entity.size.y;
        } else if (entity.velocity.y < 0) {
            y = entity.position.y;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            entity.position.x,
            entity.position.x + entity.size.x,
            y, y
        );
        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
            if (entity.velocity.y > 0 && y > match.t) {
                entity.position.y = match.t - entity.size.y;
                entity.velocity.y = 0;
            } else if (entity.velocity.y < 0 && y < match.b) {
                entity.position.y = match.b;
                entity.velocity.y = 0;
            }
        });
    }
}