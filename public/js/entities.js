import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
    return loadMarioSprite().then(marioSprite => {
        const mario = new Entity();
        const gravity = 2000;
        mario.draw = (context) => {
            marioSprite.draw('idle', context, mario.position.x, mario.position.y);
        };
        mario.update = (deltaTime) => {
            // velocity = distance / time (m/s)
            // acceleration = distance / time^2 (m/s^2)
            // gravity = -9.8 m/s^2
            mario.position.x += mario.velocity.x * deltaTime;
            mario.position.y += mario.velocity.y * deltaTime;
            mario.velocity.y += gravity * deltaTime;
        };
        return mario;
    });
}