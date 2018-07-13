import Level from '../Level.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';
import {loadJSON, loadSpriteSheet} from './loaders.js';
import {Matrix} from '../math.js';

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {name: tile.name});
    }

    return grid;
}

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type});
    }

    return grid;
}

function expandTiles(tiles, patterns) {
    const expandedTiles = [];

    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (let {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern) {
                    let t = patterns[tile.pattern].tiles;
                    walkTiles(t, derivedX, derivedY);
                } else {
                    expandedTiles.push({
                        tile: tile, 
                        x: derivedX,
                        y: derivedY
                    });
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);

    return expandedTiles;
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;
        return expandSpan(xStart, xLength, yStart, yLength);
    } else if (range.length === 3) {
        const [xStart, xLength, yStart] = range;
        return expandSpan(xStart, xLength, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}

//this is called a generator function, it can be used for lazy iteration
//yield returns an iterator. e.g. {value: {x, y}, done: false}
function* expandSpan(xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y};
        }
    }
}

export function loadLevel(name) {
    return loadJSON(`../levels/${name}.json`)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet)
        ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();

            //Merge all layers for collsion detection
            const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
                return mergedTiles.concat(layerSpec.tiles);
            }, []);

            //Collision Layer
            const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
            level.setCollisionGrid(collisionGrid);

            //Background Layer
            levelSpec.layers.forEach(layer => {
                const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
                const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
                level.comp.layers.push(backgroundLayer);
            });

            //Sprite Layer
            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.layers.push(spriteLayer);

            return level;
        });
}