import Compositor from './Compositor.js';
import Entity from './Entity.js';
import GamepadState from './GamepadState.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {bindKeyboardControls} from './input.js';
import * as tools from './tools.js';
import {loadLevel} from './loaders.js';

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    mario.position.set(16, 144);
    level.entities.add(mario);
    bindKeyboardControls(mario);
    
    //tools.enableEntityDrag(canvas, level, mario);
    //tools.showCollision(level);
    //tools.showEntityHitbox(level);
    //tools.showGrid(level);

    const controller1 = new GamepadState(1);
    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        controller1.checkGamepadForUpdates(mario);
        level.update(deltaTime);
        level.comp.draw(context);
    };
    timer.start();
});
