const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.keyCodes = new Map();
        this.keyStates = new Map();
    }
    addCode(keyCode, callback) {
        this.keyCodes.set(keyCode, callback);
    }
    listenTo() {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                const keyCode = event.keyCode;
                const keyState = (event.type === 'keydown') ? PRESSED : RELEASED;
                if (!this.keyCodes.has(keyCode)) {
                    return;
                }
                event.preventDefault();
                if (this.keyStates.get(keyCode) === keyState) {
                    return;
                }
                this.keyStates.set(keyCode, keyState);
                this.keyCodes.get(keyCode)(keyState);
            });
        });
    }
}