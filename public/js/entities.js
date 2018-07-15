import Entity from './Entity.js';
import {createAnimation} from './animation.js';
import {loadSpriteSheet} from './loaders/loaders.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';

const FAST_DRAG = 1/5000;
const SLOW_DRAG = 1/1500;

export function createMario() {
    return loadSpriteSheet('mario').then(marioSprite => {
        const mario = new Entity();
        mario.size.set(12, 16);
        mario.addTrait(new Go());
        mario.Go.dragCoefficient = SLOW_DRAG;
        mario.addTrait(new Jump());
        mario.turbo = (turboOn) => {
            mario.Go.dragCoefficient = turboOn ? FAST_DRAG : SLOW_DRAG;
        }

        const runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 8);

        function getMarioMovementFrame() {
            if (mario.Jump.freeFall) {
                return 'jump';
            } else if (mario.Go.distance > 0) {
                if ((mario.velocity.x > 0 && mario.Go.dir < 0)
                    || (mario.velocity.x < 0 && mario.Go.dir > 0)) {
                    return 'break';
                }
                return runAnimation(mario.Go.distance);
            } else {
                return 'idle';
            }
        }

        mario.draw = (context) => {
            let frame = getMarioMovementFrame(mario);
            // Adjusts marios collision detection width
            // let marioSpriteBuffer = marioSprite.tiles.get(frame)[0];
            // mario.size.set(marioSpriteBuffer.width, marioSpriteBuffer.height);
            marioSprite.draw(
                frame,
                context,
                0,
                0,
                mario.Go.heading === -1
            );
        };
        return mario;
    });
}
