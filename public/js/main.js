import Camera from './Camera.js';
import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Gamepad from './Gamepad.js';
import Timer from './Timer.js';
import {loadEntityFactory} from './entities.js';
import {bindKeyboardControls} from './input.js';
import {createCameraLayer} from './layers.js';
import {createLevelFactory} from './loaders/level.js';
import * as tools from './tools.js';

const canvas = document.getElementById("coinSlot");
const marioStartPosition = [32, 160];
main(canvas);

async function main(canvas) {
    const camera = new Camera();
    const context = canvas.getContext("2d");
    const controller1 = new Gamepad(1);

    const entityFactory = await loadEntityFactory();
    const levelFactory = createLevelFactory(entityFactory);
    const level = await levelFactory('1-1');

    const mario = entityFactory.mario();
    mario.position.set(...marioStartPosition);
    level.entities.add(mario);
    bindKeyboardControls(mario);

    tools.enableMouseControl(canvas, camera, level, mario);
    //tools.showCamera(level, camera);
    //tools.showCollision(level);
    //tools.showEntityHitbox(level);
    //tools.showGrid(level);

    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        controller1.checkGamepadForUpdates(mario);
        
        setupCameraChase(mario, camera);
        resetMarioWhenOutOfBounds(mario, camera);

        level.update(deltaTime);
        level.comp.draw(context, camera);
    };
    timer.start();
}

function resetMarioWhenOutOfBounds(mario, camera) {
    if (mario.position.y > 240) {
        mario.position.set(...marioStartPosition);
        camera.position.x = 0;
    }
}

function setupCameraChase(mario, camera) {
    //// Testing Chase
    if (mario.position.x > 100) {
        camera.position.x = mario.position.x - 100;
    }

    //// Real Chase
    // let rightOffset = mario.position.x - (camera.position.x + (canvas.width/2) - (mario.size.x/2));
    // if (rightOffset > 0) {
    //     camera.position.x += rightOffset;
    // }
    // if (mario.bounds.left < camera.position.x) {
    //     mario.bounds.left = camera.position.x;
    //     mario.velocity.x = 0;
    // }
}
