import Camera from './Camera.js';
import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Gamepad from './Gamepad.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {bindKeyboardControls} from './input.js';
import {createCameraLayer} from './layers.js';
import * as tools from './tools.js';
import {loadLevel} from './loaders/level.js';

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    const camera = new Camera();

    mario.position.set(16, 144);
    level.entities.add(mario);
    bindKeyboardControls(mario);
    
    tools.enableMouseControl(canvas, camera, level, mario);
    //tools.showCamera(level, camera);
    //tools.showCollision(level);
    //tools.showEntityHitbox(level);
    //tools.showGrid(level);

    const controller1 = new Gamepad(1);
    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        //controller1.checkGamepadForUpdates(mario);
        // Different implementation for camera chase
        // let rightOffset = mario.position.x - (camera.position.x + 160);
        // if (rightOffset > 0) {
        //     camera.position.x += rightOffset;
        // }
        // let leftOffset = mario.position.x - (camera.position.x);
        // if (leftOffset < 0) {
        //     camera.position.x += leftOffset;
        // }
        if (mario.position.x > 100) {
            camera.position.x = mario.position.x - 100;
        }
        // resets mario to the beginning if he falls off the map
        if (mario.position.y > 240) {
            mario.position.set(16, 144);
            camera.position.x = mario.position.x - 16;
        }
        level.update(deltaTime);
        level.comp.draw(context, camera);
    };
    timer.start();
});
