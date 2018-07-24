import {loadImage} from './loaders.js';
import SpriteSheet from '../SpriteSheet.js';

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

class Font {
    constructor(fontSprite, size) {
        this.fontSprite = fontSprite;
        this.size = size;
    }
    print(text, context, x, y) {
        [...text].forEach((char, index) => {
            this.fontSprite.draw(char, context, index * this.size + x, y);
        });
    }
}

export function loadFont() {
    return loadImage('./img/font.png')
        .then(image => {
            const fontSprite = new SpriteSheet(image);
            const size = 8;
            const rowLength = image.width;
            const rowCount = rowLength/size;
            for(let [index, char] of [...CHARS].entries()) {
                const x = index % rowCount;
                const y = Math.floor(index / rowCount);
                fontSprite.define(char, x*size, y*size, size, size);
            }
            return new Font(fontSprite, size);
        });
}