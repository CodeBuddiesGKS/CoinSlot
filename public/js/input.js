import KeyboardState from './KeyboardState.js';

export function bindControls(entity) {
    const input = new KeyboardState();

    function leftEvent(pressed) {
        entity.Go.dir = -pressed;
    }
    function rightEvent(pressed) {
        entity.Go.dir = pressed;
    }
    function upEvent(pressed) {
        if (pressed) {
            entity.velocity.y -= 500;
        }
    }
    function downEvent(pressed) {}

    input.addCode('KeyA', leftEvent);
    input.addCode('ArrowLeft', leftEvent);
    input.addCode('KeyD', rightEvent);
    input.addCode('ArrowRight', rightEvent);
    input.addCode('KeyW', upEvent);
    input.addCode('ArrowUp', upEvent);
    input.addCode('KeyS', downEvent);
    input.addCode('ArrowDown', downEvent);
    input.addCode('Space', pressed => {
        if (pressed) {
            entity.Jump.start();
        } else {
            entity.Jump.cancel();
        }
    });
    
    input.listenTo();
}
