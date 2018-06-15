import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    mario.position.set(16, 192);
    mario.velocity.set(200, -600);

    const animationTimer = new Timer(1/60);
    animationTimer.update = (deltaTime) => {
        mario.update(deltaTime);
        comp.draw(context);
    }
    animationTimer.start();
});
