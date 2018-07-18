import TileResolver from "./TileResolver.js";

export function createCameraLayer(cameraToDraw) {
    return (context, fromCamera) => {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.strokeRect(
            cameraToDraw.position.x - fromCamera.position.x,
            cameraToDraw.position.y - fromCamera.position.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
    }
}

export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    function redraw(startIndex, endIndex) {
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x=startIndex; x<=endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnimation(
                            tile.name,
                            context,
                            x-startIndex,
                            y,
                            level.totalTime
                        );
                    } else {
                        sprites.drawTile(
                            tile.name,
                            context,
                            x - startIndex,
                            y
                        );
                    }
                });
            }
        }
    }

    return (context, camera) => {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.position.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(
            buffer,
            -camera.position.x % 16,
            -camera.position.y
        );
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
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return (context, camera) => {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);
            entity.draw(spriteBufferContext);
            context.drawImage(
                spriteBuffer, 
                entity.bounds.left - camera.position.x, 
                entity.bounds.top - camera.position.y
            );
        });
    }
}
