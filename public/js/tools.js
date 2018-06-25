import {createCollisionLayer, createEntityHitboxLayer, createGridLayer} from './layers.js';

export function enableMouseControl(canvas, camera, level, entity) {
    let lastEvent;
    canvas.addEventListener('mousedown', event => {
        if (event.buttons === 1) {
            level.gravity = 0;
            entity.velocity.set(0, 0);
            entity.position.set(
                event.offsetX + camera.position.x,
                event.offsetY + camera.position.y
            );
        }
    });
    canvas.addEventListener('mousemove', event => {
        if (event.buttons === 1) {
            entity.position.set(
                event.offsetX + camera.position.x,
                event.offsetY + camera.position.y
            );
        } else if (event.buttons === 2
            && lastEvent && lastEvent.buttons === 2) {
            camera.position.x -= event.offsetX - lastEvent.offsetX;
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

export function showCollision(level) {
    level.comp.layers.push(createCollisionLayer(level));
}

export function showEntityHitbox(level) {
    level.comp.layers.push(createEntityHitboxLayer(level));
}

export function showGrid(level) {
    level.comp.layers.push(createGridLayer(level));
}
