import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

function createTiles(level, backgrounds) {
    function applyRange(background, xStart, xLength, yStart, yLength) {
        let xEnd = xStart + xLength;
        let yEnd = yStart + yLength;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type
                });
            }
        }
    }
    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLength, yStart, yLength] = range;
                applyRange(background, xStart, xLength, yStart, yLength);
            } else if (range.length === 3) {
                const [xStart, xLength, yStart] = range;
                applyRange(background, xStart, xLength, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
}

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
};

export function loadJSON(url) {
    return fetch(url).then(response => response.json());
}

export function loadLevel(name) {
    return loadJSON(`../levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();
        createTiles(level, levelSpec.backgrounds);
        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(backgroundLayer);
        level.comp.layers.push(spriteLayer);
        return level;
    });
}

export function loadSpriteSheet(name) {
    return loadJSON(`../sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL)
    ]))
    .then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH
        );
        sheetSpec.tiles.forEach(tileSpec => {
            sprites.defineTile(
                tileSpec.name,
                tileSpec.index[0],
                tileSpec.index[1]
            );
        });
        return sprites;
    });
}
