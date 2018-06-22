

export default class GamepadState {
    constructor(playerNumber) {
        this.buttonsPressed = [];
        this.buttonStates = new Map();
        this.pad;
        this.playerNumber = playerNumber - 1;
        this.findGamepads();
        //this.promptGamepads();
    }
    buttonPressCheck(button) {
        let press = 0;
        for(let i=0; i < this.buttonsPressed; ++i) {
            if (this.buttonsPressed[i] === button) {
                press = 1;
            }
        }
        return press;
    }
    canGame() {
        return "getGamepads" in navigator;
    }
    checkGamepadForUpdates(entity) {
        this.pad = navigator.getGamepads()[this.playerNumber];
        if (this.pad) {
            this.buttonsPressed = [];
            this.pad.buttons.forEach((button, bIndex) => {
                this.buttonStates.set(bIndex, button.pressed);
                if (button.pressed) {
                    this.buttonsPressed.push(bIndex);
                }
            });
        
            let leftPress = this.buttonPressCheck(14);
            let rightPress = this.buttonPressCheck(15);
            let upPress = this.buttonPressCheck(12);
            let downPress = this.buttonPressCheck(13);
            
            if (this.keyStates.get(code) === keyState) {
                return;
            }
            if (leftPress) {
                console.log('leftPress', leftPress);
            } else if (rightPress) {
                console.log('rightPress', rightPress);
                entity.Go.dir = rightPress;
            } else if (upPress) {
                console.log('upPress', upPress);
                entity.velocity.y -= 500;
            } else if (downPress) {
                console.log('downPress', downPress);
            }
        } else {
            console.log('Pad update skipped');
        }
    }
    findGamepads() {
        window.addEventListener('gamepadconnected', event => {
            this.pad = event.gamepad;
            console.log('Pad connected!');
        });
    }
    promptGamepads() {
        let pads = navigator.getGamepads();
        if (this.canGame()) {
            let prompt = "Player 1: press any button!";
            $("#gamepadPrompt").text(prompt);
    
            $(window).on("gamepadconnected", (event, pad) => {
                this.pad = pad;
                $("#gamepadPrompt").html("Player 1 connected!");
            });
    
            $(window).on("gamepaddisconnected", () => {
                $("#gamepadPrompt").text(prompt);
            });
    
            //setup an interval for Chrome
            let checkGP = window.setInterval(() => {
                let currentPad = navigator.getGamepads()[this.playerNumber];
                if (currentPad) {
                    if (!this.pad) {
                        $(window).trigger("gamepadconnected", currentPad);
                    }
                    window.clearInterval(checkGP);
                }
            }, 500);
        }
    }
}
