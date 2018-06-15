import Compositor from './Compositor.js';
import Entity from './Entity.js';
import KeyboardState from './KeyboardState.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';

function bindControls(mario) {
    const input = new KeyboardState();
    function leftEvent(keyState) {
        if (keyState === 1) {
            mario.velocity.x = -100;
        } else {
            mario.velocity.x = 0;
        }
    }
    function rightEvent(keyState) {
        if (keyState === 1) {
            mario.velocity.x = 100;
        } else {
            mario.velocity.x = 0;
        }
    }
    function upEvent(keyState) {
        if (keyState === 1) {
            mario.velocity.y = -500;
        }
    }
    function downEvent(keyState) {}
    input.addCode(65, leftEvent); //a
    input.addCode(37, leftEvent); //left arrow
    input.addCode(68, rightEvent); //d
    input.addCode(39, rightEvent); //right arrow
    input.addCode(87, upEvent); //w
    input.addCode(38, upEvent); //up arrow
    input.addCode(83, downEvent); //s
    input.addCode(40, downEvent); //down arrow
    input.listenTo();
}

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
    //mario.velocity.set(200, -600);
    bindControls(mario);

    const animationTimer = new Timer(1/60);
    animationTimer.update = (deltaTime) => {
        mario.update(deltaTime);
        comp.draw(context);
    }
    animationTimer.start();
});
