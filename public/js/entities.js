import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';

export function createMario() {
    return loadMarioSprite().then(marioSprite => {
        const mario = new Entity();
        mario.size.set(14, 47);

        mario.addTrait(new Jump());
        mario.addTrait(new Velocity());
        mario.draw = (context) => {
            marioSprite.draw('idle', context, mario.position.x, mario.position.y);
        };
        return mario;
    });
}
