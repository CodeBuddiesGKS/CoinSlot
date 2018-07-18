import Entity from '../Entity.js';
import {loadSpriteSheet} from '../loaders/loaders.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';

const FAST_DRAG = 1/5000;
const SLOW_DRAG = 1/1500;

export function loadMario() {
    return loadSpriteSheet('mario').then(marioSprite => {
        return createMarioFactory(marioSprite);
    });
}

function createMarioFactory(marioSprite) {
    function drawMario(context) {
        const flip = this.Go.heading === -1;
        const frame = getMarioMovementFrame(this);
        marioSprite.draw(frame, context, 0, 0, flip);
    }
    function getMarioMovementFrame(mario) {
        if (mario.Jump.freeFall) {
            return 'jump';
        } else if (mario.Go.distance > 0) {
            if ((mario.velocity.x > 0 && mario.Go.dir < 0)
                || (mario.velocity.x < 0 && mario.Go.dir > 0)) {
                return 'break';
            }
            return marioSprite.animations.get('run')(mario.Go.distance);
        } else {
            return 'idle';
        }
    }
    function setTurboDrag(turboOn) {
        this.Go.dragCoefficient = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    return () => {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.offset.x = 1;
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.turbo = setTurboDrag;
        mario.turbo(false);
        mario.draw = drawMario;
        return mario;
    }
}
