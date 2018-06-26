export default class Gamepad {
    constructor(playerNumber) {
        this.buttonStates = new Map();
        this.pad;
        this.playerNumber = playerNumber - 1;
        this.findGamepads();
    }
    checkGamepadForUpdates(entity) {
        this.pad = navigator.getGamepads()[this.playerNumber];
        if (this.pad) {
            this.pad.buttons.forEach((button, bIndex) => {
                let prevState = this.buttonStates.get(bIndex);
                this.buttonStates.set(bIndex, button.pressed);
                let currState = button.pressed;
                if (prevState !== currState) {
                    let pressed = currState ? 1 : 0;
                    switch(bIndex) {
                        case 1:
                            //console.log('UpPress', currState);
                            if (currState) {
                                entity.Jump.start();
                            } else {
                                entity.Jump.cancel();
                            }
                            break;
                        case 13:
                            //console.log('DownPress', currState);
                            break;
                        case 14:
                            //console.log('LeftPress', currState);
                            entity.Go.dir += pressed ? -1:1;
                            break;
                        case 15:
                            //console.log('RightPress', currState);
                            entity.Go.dir += pressed ? 1:-1;
                            break;
                    }
                }
            });
        } else {
            console.log('Press any button to connect...');
        }
    }
    findGamepads() {
        window.addEventListener('gamepadconnected', event => {
            this.pad = event.gamepad;
            console.log('Pad connected!');
        });
    }
}
