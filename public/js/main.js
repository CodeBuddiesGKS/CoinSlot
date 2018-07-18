import Camera from './Camera.js';
import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Gamepad from './Gamepad.js';
import Timer from './Timer.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadMario} from './entities/Mario.js';
import {bindKeyboardControls} from './input.js';
import {createCameraLayer} from './layers.js';
import {loadLevel} from './loaders/level.js';
import * as tools from './tools.js';

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

Promise.all([
    loadLevel('1-1'),
    loadMario(),
    loadGoomba(),
    loadKoopa()
]).then(([level, createMario, createGoomba, createKoopa]) => {
    const camera = new Camera();

    const mario = createMario();
    mario.position.set(16, 192);
    level.entities.add(mario);
    bindKeyboardControls(mario);

    const goomba = createGoomba();
    goomba.position.set(64, 192);
    level.entities.add(goomba);
    
    const koopa = createKoopa();
    koopa.position.set(32, 192); //608
    level.entities.add(koopa);
    
    tools.enableMouseControl(canvas, camera, level, mario);
    //tools.showCamera(level, camera);
    tools.showCollision(level);
    tools.showEntityHitbox(level);
    //tools.showGrid(level);

    const controller1 = new Gamepad(1);
    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        //// Shut off gamepad check until wanted
        // controller1.checkGamepadForUpdates(mario);

        //// Different implementation for camera chase
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
            mario.position.set(16, 192);
            camera.position.x = 0;
        }

        level.update(deltaTime);
        level.comp.draw(context, camera);
    };
    timer.start();
});
