import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    checkY(entity) {
        const matches = this.tiles.searchByRange(
            entity.position.x,
            entity.position.x + entity.size.x,
            entity.position.y,
            entity.position.y + entity.size.y
        );
        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
            if (entity.velocity.y > 0
                && entity.position.y + entity.size.y > match.t) {
                entity.position.y = match.t - entity.size.y;
                entity.velocity.y = 0;
            } else if (entity.velocity.y < 0
                && entity.position.y < match.b) {
                entity.position.y = match.b;
                entity.velocity.y = 0;
            }
        });
    }
    test(entity) {
        this.checkY(entity);
    }
}