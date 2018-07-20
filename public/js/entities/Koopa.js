import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_WAKING = Symbol('waking');
const STATE_SLIDING = Symbol('sliding');

export function loadKoopa() {
    return loadSpriteSheet('koopa').then(koopaSprite => {
        return createKoopaFactory(koopaSprite);
    });
}

function createKoopaFactory(koopaSprite) {
    const walkAnimation = koopaSprite.animations.get('walk');

    function getAnimationFrame(koopa) {
        if (koopa.Behavior.state === STATE_HIDING
            || koopa.Behavior.state === STATE_SLIDING) {
            return 'shell';
        } else if (koopa.Behavior.state === STATE_WAKING) {
            return 'shell-with-legs';
        } else if (koopa.Behavior.state === STATE_WALKING) {
            return walkAnimation(koopa.lifetime);
        }
    }

    function drawKoopa(context) {
        const flip = this.PendulumWalk.dir === -1;
        const frame = getAnimationFrame(this);
        koopaSprite.draw(frame, context, 0, 0, flip);
    }

    return () => {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;
        koopa.addTrait(new Behavior());
        koopa.addTrait(new Killable());
        koopa.addTrait(new PendulumWalk());
        koopa.Killable.decomposeTime = 400;
        koopa.draw = drawKoopa;
        return koopa;
    }
}

class Behavior extends Trait {
    constructor() {
        super('Behavior');
        this.hideTime = 0;
        this.hideDuration = 7;
        this.state = STATE_WALKING;
        this.wakeTime = 0;
        this.wakeDuration = 2;
    }
    collides(koopa, them) {
        const isStomping = them.velocity.y > koopa.velocity.y;

        if (koopa.Killable.isDead) {
            return;
        }

        if (this.state === STATE_SLIDING
            && them.Killable) {
            them.Killable.kill();
        }

        if (them.Stomp) {
            if (isStomping) {
                if (this.state === STATE_WALKING) {
                    this.setStateToHide(koopa, them);
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
                }
            }
        }
    }
    setStateToHide(koopa, them) {
        this.state = STATE_HIDING;
        them.bounds.bottom = koopa.bounds.top + 1;
        them.Stomp.bounce();
        this.hideTime = 0;
        koopa.PendulumWalk.enabled = 0;
    }
    setStateToSlide(koopa, them) {
        this.state = STATE_SLIDING;
        koopa.PendulumWalk.enabled = 1;
        koopa.PendulumWalk.speed = 200;
        if (them.bounds.centerX < koopa.bounds.centerX) {
            koopa.PendulumWalk.dir = 1;
            koopa.bounds.left = them.bounds.right + 1;
        } else {
            koopa.PendulumWalk.dir = -1;
            koopa.bounds.right = them.bounds.left - 1;
        }
    }
    setStateToWake() {
        this.state = STATE_WAKING;
        this.wakeTime = 0;
    }
    setStateToWalk(koopa) {
        this.state = STATE_WALKING;
        koopa.PendulumWalk.enabled = 1;
    }
    update(entity, deltaTime, level) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration) {
                this.setStateToWake();
            }
        } else if (this.state === STATE_WAKING) {
            this.wakeTime += deltaTime;
            if (this.wakeTime > this.wakeDuration) {
                this.setStateToWalk(entity);
            }
        }
    }
}
