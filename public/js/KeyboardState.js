const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.codes = new Map();
        this.keyStates = new Map();
    }
    addCode(code, callback) {
        this.codes.set(code, callback);
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
