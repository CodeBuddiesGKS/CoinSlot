import Camera from './Camera.js';
import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Gamepad from './Gamepad.js';
import Timer from './Timer.js';
import {loadEntityFactory} from './entities.js';
import {bindKeyboardControls} from './input.js';
import {createCameraLayer} from './layers.js';
import {loadLevelFactory} from './loaders/level.js';
import * as tools from './tools.js';

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");
const marioStartPosition = [32, 160];

loadEntityFactory()
.then(entityFactory => Promise.all([
    loadLevelFactory(entityFactory)('1-1'),
    entityFactory
]))
.then(([level, entityFactory]) => {
    const mario = entityFactory.mario();
    mario.position.set(...marioStartPosition);
    level.entities.add(mario);
    bindKeyboardControls(mario);

    const camera = new Camera();
    tools.enableMouseControl(canvas, camera, level, mario);
    //tools.showCamera(level, camera);
    //tools.showCollision(level);
    //tools.showEntityHitbox(level);
    //tools.showGrid(level);

    const controller1 = new Gamepad(1);

    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        controller1.checkGamepadForUpdates(mario);
        
        setupCameraChase(mario, camera);
        resetMarioWhenOutOfBounds(mario, camera);

        level.update(deltaTime);
        level.comp.draw(context, camera);
    };
    timer.start();
});

function resetMarioWhenOutOfBounds(mario, camera) {
    if (mario.position.y > 240) {
        mario.position.set(...marioStartPosition);
        camera.position.x = 0;
    }
}

function setupCameraChase(mario, camera) {
    if (mario.position.x > 100) {
        camera.position.x = mario.position.x - 100;
    }

    //// Different implementation for camera chase
    // let rightOffset = mario.position.x - (camera.position.x + 160);
    // if (rightOffset > 0) {
    //     camera.position.x += rightOffset;
    // }
    // let leftOffset = mario.position.x - (camera.position.x);
    // if (leftOffset < 0) {
    //     camera.position.x += leftOffset;
    // }
}
