const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor() {
        this.codes = new Map();
        this.keyStates = new Map();
    }
    addCode(code, callback) {
        this.codes.set(code, callback);
    }
    bindControls(entity) {    
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
        function sprintEvent(pressed) {
            entity.turbo(pressed);
        }
    
        this.addCode('Space', upEvent);
        this.addCode('KeyP', upEvent);
        this.addCode('KeyW', upEvent);
        this.addCode('ArrowUp', upEvent);
        this.addCode('KeyS', downEvent);
        this.addCode('ArrowDown', downEvent);
        this.addCode('KeyA', leftEvent);
        this.addCode('ArrowLeft', leftEvent);
        this.addCode('KeyD', rightEvent);
        this.addCode('ArrowRight', rightEvent);
        this.addCode('KeyO', sprintEvent);
        
        this.listenTo();
    }
    listenTo() {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                const code = event.code;
                const keyState = (event.type === 'keydown') ? PRESSED : RELEASED;
                if (!this.codes.has(code)) {
                    return;
                }
                event.preventDefault();
                if (this.keyStates.get(code) === keyState) {
                    return;
                }
                this.keyStates.set(code, keyState);
                this.codes.get(code)(keyState);
            });
        });
    }
}
