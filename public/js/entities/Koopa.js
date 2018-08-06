import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_WAKING = Symbol('waking');
const STATE_SLIDING = Symbol('sliding');

export function loadKoopa() {
    return loadSpriteSheet('npcs').then(sprite => {
        return createKoopaFactory(sprite);
    });
}

function createKoopaFactory(sprite) {
    const walkAnimation = sprite.animations.get('koopa-walk');

    function getAnimationFrame(koopa) {
        if (koopa.Behavior.state === STATE_HIDING
            || koopa.Behavior.state === STATE_SLIDING) {
            return 'koopa-shell';
        } else if (koopa.Behavior.state === STATE_WAKING) {
            return 'koopa-shell-with-legs';
        } else if (koopa.Behavior.state === STATE_WALKING) {
            return walkAnimation(koopa.lifetime);
        }
    }

    function drawKoopa(context) {
        const flip = this.PendulumMove.dir === -1;
        const frame = getAnimationFrame(this);
        sprite.draw(frame, context, 0, 0, flip);
    }

    return () => {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;
        koopa.addTrait(new Behavior());
        koopa.addTrait(new Killable(2));
        koopa.addTrait(new PendulumMove());
        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.draw = drawKoopa;
        return koopa;
    }
}

class Behavior extends Trait {
    constructor() {
        super('Behavior');
        this.hideTime = 0;
        this.hideTimeLimit = 7;
        this.state = STATE_WALKING;
        this.wakeTime = 0;
        this.wakeTimeLimit = 2;
    }
    collides(koopa, them) {
        const isStomping = them.velocity.y > koopa.velocity.y;
        if (!them.Killable
            || (them.Killable && them.Killable.isDead)
            || (koopa.Killable && koopa.Killable.isDead)) {
            return;
        }
        // this.state = STATE_HIDING;
        // koopa.Killable.kill();
        // koopa.velocity.set(100, -200);
        // koopa.Solid.on = false;

        if (them.Stomp) {
            if (isStomping) {
                switch (this.state) {
                    case STATE_WALKING:
                        this.setStateToHide(koopa, them);
                        break;
                    case STATE_HIDING:
                    case STATE_WAKING:
                        this.setStateToSlide(koopa, them);
                        break;
                    case STATE_SLIDING:
                        this.setStateToHide(koopa, them);
                        break;
                }
            } else {
                switch (this.state) {
                    case STATE_WALKING:
                        them.Killable.kill();
                        break;
                    case STATE_HIDING:
                    case STATE_WAKING:
                        this.setStateToSlide(koopa, them);
                        break;
                    case STATE_SLIDING:
                        them.Killable.kill();
                        break;
                }
            }
        } else {
            switch (this.state) {
                case STATE_WALKING:
                    this.enemyRicochet(koopa, them);
                    break;
                case STATE_SLIDING:
                    them.PendulumMove.on = false;
                    them.Killable.kill();
                    break;
            }
        }
    }
    enemyRicochet(koopa, them) {
        if (koopa.PendulumMove.dir === 1) {
            koopa.PendulumMove.dir = -1;
            koopa.bounds.right = them.bounds.left - 1;
        } else {
            koopa.PendulumMove.dir = 1;
            koopa.bounds.left = them.bounds.right + 1;
        }
    }
    setStateToHide(koopa, them) {
        this.state = STATE_HIDING;
        this.hideTime = 0;
        koopa.PendulumMove.on = false;
        koopa.PendulumMove.speed = koopa.PendulumMove.walkSpeed;
    }
    setStateToSlide(koopa, them) {
        this.state = STATE_SLIDING;
        koopa.PendulumMove.on = true;
        koopa.PendulumMove.speed = koopa.PendulumMove.slideSpeed;
        if (them.bounds.centerX < koopa.bounds.centerX) {
            koopa.PendulumMove.dir = 1;
            koopa.bounds.left = them.bounds.right + 1;
        } else {
            koopa.PendulumMove.dir = -1;
            koopa.bounds.right = them.bounds.left - 1;
        }
    }
    setStateToWake() {
        this.state = STATE_WAKING;
        this.wakeTime = 0;
    }
    setStateToWalk(koopa) {
        this.state = STATE_WALKING;
        koopa.PendulumMove.on = true;
    }
    update(entity, deltaTime, level) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideTimeLimit) {
                this.setStateToWake();
            }
        } else if (this.state === STATE_WAKING) {
            this.wakeTime += deltaTime;
            if (this.wakeTime > this.wakeTimeLimit) {
                this.setStateToWalk(entity);
            }
        }
    }
}
