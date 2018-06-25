export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 2560;
    buffer.height = 240;

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, buffer.getContext('2d'), x, y);
    });

    return (context, camera) => {
        context.drawImage(buffer, -camera.position.x, -camera.position.y);
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

    return (context, camera) => {
        context.strokeStyle = 'green';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.strokeRect(
                x*tileSize - camera.position.x,
                y*tileSize - camera.position.y,
                tileSize,
                tileSize
            );
        });

        resolvedTiles.length = 0;
    };
}

export function createEntityHitboxLayer(level) {
    return (context, camera) => {
        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.strokeRect(
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y,
                entity.size.x,
                entity.size.y
            );
        });
    };
}

export function createGridLayer(level) {
    return (context, camera) => {
        context.strokeStyle = 'rgba(0,0,0,0.1)';
        context.lineWidth = 1;
        level.tiles.forEach((value, x, y) => {
            context.beginPath();
            context.strokeRect(x*16, y*16, 16, 16);
        });
    };
}

export function createSpriteLayer(entities, width=64, height=64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = width;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return (context, camera) => {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);
            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer, 
                entity.position.x - camera.position.x, 
                entity.position.y - camera.position.y
            );
        });
    }
}
