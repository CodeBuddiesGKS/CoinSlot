import Entity from '../Entity.js';
import {loadSpriteSheet} from '../loaders/loaders.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomp from '../traits/Stomp.js';

const FAST_DRAG = 1/5000;
const SLOW_DRAG = 1/1500;

export function loadAvatar(name) {
    return loadSpriteSheet(name).then(avatarSprite => {
        return createAvatarFactory(avatarSprite);
    });
}

function createAvatarFactory(avatarSprite) {
    function draw(context) {
        const flip = this.Go.heading === -1;
        const frame = getMovementFrame(this);
        avatarSprite.draw(frame, context, 0, 0, flip);
    }
    function getMovementFrame(avatar) {
        if (avatar.Jump.freeFall) {
            return 'jump';
        } else if (avatar.Go.distance > 0) {
            if ((avatar.velocity.x > 0 && avatar.Go.dir < 0)
                || (avatar.velocity.x < 0 && avatar.Go.dir > 0)) {
                return 'break';
            }
            return avatarSprite.animations.get('run')(avatar.Go.distance);
        } else {
            return 'idle';
        }
    }
    function setTurboDrag(turboOn) {
        this.Go.dragCoefficient = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    return () => {
        const avatar = new Entity();
        avatar.size.set(14, 16);
        avatar.offset.x = 1;

        avatar.addTrait(new Go());
        avatar.addTrait(new Jump());
        avatar.addTrait(new Killable());
        avatar.addTrait(new Physics());
        avatar.addTrait(new Solid());
        avatar.addTrait(new Stomp());

        avatar.turbo = setTurboDrag;
        avatar.turbo(false);
        avatar.draw = draw;
        return avatar;
    }
}
