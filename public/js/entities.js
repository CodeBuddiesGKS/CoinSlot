import Entity from './Entity.js';
import {createAnimation} from './animation.js';
import {loadSpriteSheet} from './loaders.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';

export function createMario() {
    return loadSpriteSheet('mario').then(marioSprite => {
        const mario = new Entity();
        mario.size.set(12, 16);
        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        const runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 10);

        function getMarioMovementFrame() {
            if (mario.Go.dir !== 0) {
                return runAnimation(mario.Go.distance);
            } else {
                return 'idle';
            }
        }

        mario.draw = (context) => {
            marioSprite.draw(
                getMarioMovementFrame(mario),
                context,
                0,
                0,
                mario.Go.heading === -1
            );
        };
        return mario;
    });
}
