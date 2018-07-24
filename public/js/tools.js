import {
    createCameraBoxLayer,
    createTileCollisionLayer,
    createBoundingBoxLayer
} from './layers/tool.js';

export function enableMouseControl(canvas, camera, level, entity) {
    let lastEvent;
    canvas.addEventListener('mousedown', event => {
        const screenWidthRatio = event.target.clientWidth / event.target.width;
        const screenHeightRatio = event.target.clientHeight / event.target.height;
        if (event.buttons === 1) {
            level.gravity = 0;
            entity.velocity.set(0, 0);
            entity.position.set(
                event.offsetX/screenWidthRatio + camera.position.x,
                event.offsetY/screenHeightRatio + camera.position.y
            );
        }
    });
    canvas.addEventListener('mousemove', event => {
        const screenWidthRatio = event.target.clientWidth / event.target.width;
        const screenHeightRatio = event.target.clientHeight / event.target.height;
        if (event.buttons === 1) {
            entity.position.set(
                event.offsetX/screenWidthRatio + camera.position.x,
                event.offsetY/screenHeightRatio + camera.position.y
            );
        } else if (event.buttons === 2
            && lastEvent && lastEvent.buttons === 2) {
            camera.position.x -= event.offsetX/screenWidthRatio - lastEvent.offsetX/screenWidthRatio;
        }
        lastEvent = event;
    });
    canvas.addEventListener('mouseup', event => {
        if (event.buttons === 0) {
            level.gravity = 2000;
        }
    });
    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
}

export function showCameraBox(level, camera) {
    level.comp.layers.push(createCameraBoxLayer(camera));
}

export function showTileCollision(level) {
    level.comp.layers.push(createTileCollisionLayer(level));
}

export function showBoundingBox(level) {
    level.comp.layers.push(createBoundingBoxLayer(level));
}
