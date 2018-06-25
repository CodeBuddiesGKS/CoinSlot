import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadMarioSprite() {
    return loadImage('img/characters.gif').then(image => {
        const sprites = new SpriteSheet(image, 12, 16);
        sprites.define('idle', 277, 44, 12, 16);
        return sprites;
    });
}
