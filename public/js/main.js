import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {bindControls} from './input.js';
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
    bindControls(mario);
    
    //tools.enableEntityDrag(canvas, level, mario);
    //tools.showCollision(level);
    //tools.showEntityHitbox(level);
    //tools.showGrid(level);

    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        level.update(deltaTime);
        level.comp.draw(context);
    };
    timer.start();
});
