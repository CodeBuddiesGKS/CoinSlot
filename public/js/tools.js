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
        } else if (event.buttons === 2) {
            let screenX = Math.floor((event.offsetX/screenWidthRatio) / 16);
            let screenY = Math.floor((event.offsetY/screenHeightRatio) / 16);
            if (screenX === 0 && screenY === 14) {
                let roundedPos = Math.floor(camera.position.x / 256) * 256;
                camera.position.x = Math.max(0, roundedPos - 256);
            } else if (screenX === 15 && screenY === 14) {
                let roundedPos = Math.floor(camera.position.x / 256) * 256;
                camera.position.x = roundedPos + 256;
            }
        } else if (event.buttons === 4) {
            let x = Math.floor((event.offsetX/screenWidthRatio + camera.position.x) / 16);
            let y = Math.floor((event.offsetY/screenHeightRatio + camera.position.y) / 16);
            console.log('Coords', x, y);
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
    level.comp.layers.set('cameraBoxLayer', createCameraBoxLayer(camera));
}

export function showTileCollision(level) {
    level.comp.layers.set('tileCollisionLayer', createTileCollisionLayer(level));
}

export function showBoundingBox(level) {
    level.comp.layers.set('boundingBoxLayer', createBoundingBoxLayer(level));
}
