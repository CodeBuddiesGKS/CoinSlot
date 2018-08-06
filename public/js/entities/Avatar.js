import Entity from '../Entity.js';
import {loadSpriteSheet} from '../loaders/loaders.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Shift, {Size, Color} from '../traits/Shift.js';
import Solid from '../traits/Solid.js';
import Stomp from '../traits/Stomp.js';
import Uppercut from '../traits/Uppercut.js';

const FAST_DRAG = 1/5000;
const SLOW_DRAG = 1/1500;

export function loadAvatar(sprite) {
    return createAvatarFactory(sprite);
}

function createAvatarFactory(sprite) {
    function draw(context) {
        const flip = this.Go.heading === -1;
        const frame = getFrame(this);
        sprite.draw(frame, context, 0, 0, flip);
    }
    function getFrame(avatar) {
        let color, size;
        if (avatar.Shift.isBurning) {
            color = sprite.animations.get('toFire')(avatar.Shift.burnTime);
        } else {
            color = Symbol.keyFor(avatar.Shift.color);
        }
        if (avatar.Shift.isGrowing) {
            size = sprite.animations.get('grow')(avatar.Shift.growTime);
            const prevSize = avatar.size.y;
            let newSize;
            if (size === "sm") {
                newSize = 16;
            } else if (size === "md") {
                newSize = 24;
            } else if (size === "lg") {
                newSize = 32;
            }
            const deltaY = prevSize-newSize;
            avatar.size.y = newSize;
            avatar.position.y += deltaY;
        } else {
            size = Symbol.keyFor(avatar.Shift.size);
        }
        
        let frame = size + '-' + color + '-';

        if (avatar.Jump.freeFall) {
            frame += 'jump';
        } else if (avatar.Go.distance > 0) {
            if ((avatar.velocity.x > 0 && avatar.Go.dir < 0)
                || (avatar.velocity.x < 0 && avatar.Go.dir > 0)) {
                frame += 'break';
            } else {
                frame += sprite.animations.get('run')(avatar.Go.distance);
            }
        } else {
            frame += 'idle';
        }

        return frame;
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
        avatar.addTrait(new Shift());
        avatar.addTrait(new Solid());
        avatar.addTrait(new Stomp());
        avatar.addTrait(new Uppercut());

        avatar.turbo = setTurboDrag;
        avatar.turbo(false);
        avatar.draw = draw;
        return avatar;
    }
}
