import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
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
        goomba.addTrait(new Killable(0.4));
        goomba.addTrait(new PendulumMove());
        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.draw = drawGoomba;
        return goomba;
    }
}

class Behavior extends Trait {
    constructor() {
        super('Behavior');
    }
    collides(goomba, them) {
        const isStomping = them.velocity.y > goomba.velocity.y;
        if (!them.Killable
            || (them.Killable && them.Killable.isDead)
            || (goomba.Killable && goomba.Killable.isDead)) {
            return;
        }
        if (them.Stomp) {
            if (isStomping) {
                goomba.PendulumMove.enabled = 0;
                goomba.Killable.kill();
            } else {
                them.Killable.kill();
            }
        } else {
            goomba.PendulumMove.dir = -goomba.PendulumMove.dir;
        }
    }
}