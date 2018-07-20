import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba').then(goombaSprite => {
        return createGoombaFactory(goombaSprite);
    });
}

function createGoombaFactory(goombaSprite) {
    const walkAnimation = goombaSprite.animations.get('walk');

    function getAnimationFrame(goomba) {
        if (goomba.Killable.isDead) {
            return 'dead';
        }
        return walkAnimation(goomba.lifetime);
    }

    function drawGoomba(context) {
        const frame = getAnimationFrame(this);
        goombaSprite.draw(frame, context, 0, 0);
    }

    return () => {
        const goomba = new Entity();
        goomba.size.set(16, 16);
        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());
        goomba.addTrait(new PendulumWalk());
        goomba.draw = drawGoomba;
        return goomba;
    }
}

class Behavior extends Trait {
    constructor() {
        super('Behavior');
    }
    collides(goomba, them) {
        if (goomba.Killable.isDead) {
            return;
        }
        if (them.Stomp) {
            if (them.velocity.y > goomba.velocity.y) {
                goomba.PendulumWalk.enabled = 0;
                goomba.Killable.kill();
                them.Stomp.bounce();
            } else {
                them.Killable.kill();
            }
        }
    }
}
