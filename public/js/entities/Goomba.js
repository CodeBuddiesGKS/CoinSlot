import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadGoomba(sprite) {
    return createGoombaFactory(sprite);
}

function createGoombaFactory(sprite) {
    const walkAnimation = sprite.animations.get('goomba-walk');

    function getAnimationFrame(goomba) {
        if (goomba.Killable.isDead) {
            return 'goomba-dead';
        }
        return walkAnimation(goomba.lifetime);
    }

    function drawGoomba(context) {
        const frame = getAnimationFrame(this);
        sprite.draw(frame, context, 0, 0);
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
                goomba.PendulumMove.on = false;
                goomba.Killable.kill();
            } else {
                them.Killable.kill();
            }
        } else {
            this.enemyRicochet(goomba, them);
        }
    }
    enemyRicochet(goomba, them) {
        if (goomba.PendulumMove.dir === 1) {
            goomba.PendulumMove.dir = -1;
            goomba.bounds.right = them.bounds.left - 1;
        } else {
            goomba.PendulumMove.dir = 1;
            goomba.bounds.left = them.bounds.right + 1;
        }
    }
}
