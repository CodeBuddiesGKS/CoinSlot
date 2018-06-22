import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';

export function createMario() {
    return loadMarioSprite().then(marioSprite => {
        const mario = new Entity();
        mario.size.set(12, 16);
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Velocity());
        mario.draw = (context) => {
            marioSprite.draw('idle', context, mario.position.x, mario.position.y);
        };
        return mario;
    });
}
