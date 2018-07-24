export function createCameraBoxLayer(cameraToDraw) {
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

export function createTileCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = (x, y) => {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return (context, camera) => {
        context.strokeStyle = 'blue';
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

export function createBoundingBoxLayer(level) {
    return (context, camera) => {
        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.strokeRect(
                entity.bounds.left - camera.position.x,
                entity.bounds.top - camera.position.y,
                entity.size.x,
                entity.size.y
            );
        });
    };
}
