import {createCollisionLayer, createEntityHitboxLayer, createGridLayer} from './layers.js';

export function enableEntityDrag(canvas, level, entity) {
    canvas.addEventListener('mousedown', event => {
        if (event.buttons === 1) {
            level.gravity = 0;
            entity.velocity.set(0, 0);
            entity.position.set(event.offsetX, event.offsetY);
        }
    });
    canvas.addEventListener('mousemove', event => {
        if (event.buttons === 1) {
            entity.position.set(event.offsetX, event.offsetY);
        }
    });
    canvas.addEventListener('mouseup', event => {
        if (event.buttons === 0) {
            level.gravity = 2000;
        }
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
