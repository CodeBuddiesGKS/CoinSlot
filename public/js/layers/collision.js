export function createCollisionLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    function redraw(startIndex, endIndex, deltaTime) {
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x=startIndex; x<=endIndex; ++x) {
            const col = level.tileCollider.tiles.matrix.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    drawTile(tile, x, y, level, sprites, context, startIndex, endIndex, deltaTime);
                });
            }
        }
    }

    return (context, camera, deltaTime) => {
        const drawWidth = level.tileCollider.tiles.toIndex(camera.size.x);
        const drawFrom = level.tileCollider.tiles.toIndex(camera.position.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo, deltaTime);

        context.drawImage(
            buffer,
            -camera.position.x % 16,
            -camera.position.y
        );
    };
}

function bounceHeightCurve(bounceDuration, deltaTime) {
    return ((-1/64) + Math.pow(bounceDuration - (1/8), 2)) * 32;
}

function drawTile(tile, x, y, level, sprites, context, startIndex, endIndex, deltaTime) {
    if (tile.type === "brick") {
        if (tile.bounceDuration > 0) {
            y += bounceHeightCurve(tile.bounceDuration, deltaTime);
            tile.bounceDuration -= deltaTime;
        }
        sprites.drawTile(tile.name, context, x - startIndex, y);
    } else if (tile.type === "powerup") {
        if (tile.bounceDuration > 0) {
            y += bounceHeightCurve(tile.bounceDuration, deltaTime);
            tile.bounceDuration -= deltaTime;
        }
        if (tile.queuePop) {
            if (tile.contains.length) {
                const item = tile.contains.pop();
                console.log('Item', item);
                if (item === "upgrade") {
                    //check marios size
                    const mushroom = level.entityFactory.mushroom();
                    mushroom.position.set(x*sprites.width, y*sprites.height - 1);
                    level.entities.add(mushroom);
                }
            }
            tile.queuePop = false;
        }
        if (tile.contains.length) {
            sprites.drawAnimation(tile.name, context, x-startIndex, y, level.totalTime);
        } else {
            sprites.drawTile(tile.name + "-empty", context, x - startIndex, y);
        }
    } else if (sprites.animations.has(tile.name)) {
        sprites.drawAnimation(tile.name, context, x-startIndex, y, level.totalTime);
    } else {
        sprites.drawTile(tile.name, context, x - startIndex, y);
    }
}
