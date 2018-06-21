export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, buffer.getContext('2d'), x, y);
    });

    return (context) => {
        context.drawImage(buffer, 0, 0);
    };
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = (x, y) => {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return (context) => {
        context.strokeStyle = 'green';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.strokeRect(
                x*tileSize,
                y*tileSize,
                tileSize,
                tileSize
            );
        });

        resolvedTiles.length = 0;
    };
}

export function createEntityHitboxLayer(level) {
    return (context) => {
        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.strokeRect(
                entity.position.x,
                entity.position.y,
                entity.size.x,
                entity.size.y
            );
        });
    };
}

export function createGridLayer(level) {
    return (context) => {
        context.strokeStyle = 'rgba(0,0,0,0.1)';
        context.lineWidth = 1;
        level.tiles.forEach((value, x, y) => {
            context.beginPath();
            context.strokeRect(x*16, y*16, 16, 16);
        });
    };
}

export function createSpriteLayer(entities) {
    return (context) => {
        entities.forEach(entity => {
            entity.draw(context);
        });
    }
}
