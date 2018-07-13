import KeyboardState from './KeyboardState.js';

export function bindKeyboardControls(mario) {
    const input = new KeyboardState();

    function upEvent(pressed) {
        if (pressed) {
            mario.Jump.start();
        } else {
            mario.Jump.cancel();
        }
    }
    function downEvent(pressed) {}
    function leftEvent(pressed) {
        mario.Go.dir += pressed ? -1:1;
    }
    function rightEvent(pressed) {
        mario.Go.dir += pressed ? 1:-1;
    }
    function sprintEvent(pressed) {
        mario.turbo(pressed);
    }

    input.addCode('Space', upEvent);
    input.addCode('KeyP', upEvent);
    input.addCode('KeyW', upEvent);
    input.addCode('ArrowUp', upEvent);
    input.addCode('KeyS', downEvent);
    input.addCode('ArrowDown', downEvent);
    input.addCode('KeyA', leftEvent);
    input.addCode('ArrowLeft', leftEvent);
    input.addCode('KeyD', rightEvent);
    input.addCode('ArrowRight', rightEvent);
    input.addCode('KeyO', sprintEvent);
    
    input.listenTo();
}
