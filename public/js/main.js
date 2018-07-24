import Camera from './Camera.js';
import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Gamepad from './Gamepad.js';
import Keyboard from './Keyboard.js';
import Spawn from './traits/Spawn.js';
import Timer from './Timer.js';
import {loadEntityFactory} from './entities.js';
import {createDashboardLayer} from './layers/dashboard.js';
import {loadFont} from './loaders/font.js';
import {createLevelFactory} from './loaders/level.js';
import * as tools from './tools.js';

const canvas = document.getElementById("coinSlot");
main(canvas);

async function main(canvas) {
    const camera = new Camera();
    const context = canvas.getContext("2d");
    const controller = new Gamepad();
    const keyboard = new Keyboard();

    const [entityFactory, font] = await Promise.all([
        loadEntityFactory(),
        loadFont()
    ]);

    const levelFactory = createLevelFactory(entityFactory);
    const level = await levelFactory('1-1');
    level.comp.layers.push(createDashboardLayer(font));

    const mario = entityFactory.mario();
    keyboard.bindControls(mario);

    const spawnPoint = createSpawnPoint(mario, camera);
    level.entities.add(spawnPoint);

    //// Tools
    // tools.enableMouseControl(canvas, camera, level, mario);
    // tools.showCameraBox(level, camera);
    // tools.showTileCollision(level);
    // tools.showBoundingBox(level);

    const timer = new Timer(1/60);
    timer.update = (deltaTime) => {
        controller.checkActivity(mario);
        camera.followEntity(mario, canvas);
        level.update(deltaTime);
        level.comp.draw(context, camera);
    };
    timer.start();
}

function createSpawnPoint(playerEntity, camera) {
    const spawnPoint = new Entity();
    const spawn = new Spawn(playerEntity, camera);
    spawn.checkpoint.set(32, 160);
    spawnPoint.addTrait(spawn);
    return spawnPoint;
}
