import Compositor from './Compositor.js';
import Entity from './Entity.js';
import KeyboardState from './KeyboardState.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {loadLevel} from './loaders.js';

function accelerate(mario, deltaX) {
    let quarter = deltaX/4;
    let intervalCount = 0;
    mario.velocity.x += quarter;
    let intervalRef = setInterval(() => {
        ++intervalCount;
        mario.velocity.x += quarter;
        if (intervalCount > 2) {
            clearInterval(intervalRef);
        }
    }, 50);
}

function bindControls(mario) {
    const input = new KeyboardState();
    function leftEvent(keyState) {
        if (keyState) {
            mario.velocity.x -= 100;
            //accelerate(mario, -100);
        } else {
            mario.velocity.x += 100;
        }
    }
    function rightEvent(keyState) {
        if (keyState) {
            mario.velocity.x += 100;
        } else {
            mario.velocity.x -= 100;
        }
    }
    function upEvent(keyState) {
        if (keyState) {
            mario.velocity.y -= 500;
        }
    }
    function downEvent(keyState) {}
    input.addCode(65, leftEvent); //a
    input.addCode(37, leftEvent); //left arrow
    input.addCode(68, rightEvent); //d
    input.addCode(39, rightEvent); //right arrow
    input.addCode(87, upEvent); //w
    input.addCode(38, upEvent); //up arrow
    input.addCode(83, downEvent); //s
    input.addCode(40, downEvent); //down arrow

    input.addCode(32, keyState => { //space
        if (keyState) {
            mario.Jump.start();
        } else {
            mario.Jump.cancel();
        }
    });
    input.listenTo();
}

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    mario.position.set(16, 192);
    bindControls(mario);
    
    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(mario);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                mario.velocity.set(0, 0);
                mario.position.set(event.offsetX, event.offsetY);
            }
        });
    });

    const animationTimer = new Timer(1/60);
    animationTimer.update = (deltaTime) => {
        level.update(deltaTime);
        level.comp.draw(context);
    }
    animationTimer.start();
});
