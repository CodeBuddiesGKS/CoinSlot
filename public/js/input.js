import KeyboardState from './KeyboardState.js';

export function bindKeyboardControls(entity) {
    const input = new KeyboardState();

    function upEvent(pressed) {
        if (pressed) {
            entity.Jump.start();
        } else {
            entity.Jump.cancel();
        }
    }
    function downEvent(pressed) {}
    function leftEvent(pressed) {
        entity.Go.dir += pressed ? -1:1;
    }
    function rightEvent(pressed) {
        entity.Go.dir += pressed ? 1:-1;
    }

    input.addCode('Space', upEvent);
    input.addCode('KeyW', upEvent);
    input.addCode('ArrowUp', upEvent);
    input.addCode('KeyS', downEvent);
    input.addCode('ArrowDown', downEvent);
    input.addCode('KeyA', leftEvent);
    input.addCode('ArrowLeft', leftEvent);
    input.addCode('KeyD', rightEvent);
    input.addCode('ArrowRight', rightEvent);
    
    input.listenTo();
}
