import Compositor from './Compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

Promise.all([loadMarioSprite(), loadBackgroundSprites(), loadLevel('1-1')])
.then(([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const pos = { x: 16, y: 192 };

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);
        pos.x += 2;
        requestAnimationFrame(update);
    }
    update();
});
