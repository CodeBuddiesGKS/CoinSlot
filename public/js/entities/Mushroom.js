import Entity, {Trait} from '../Entity.js';
import Consumable from '../traits/Consumable.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import {Size} from '../traits/Shift.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadMushroom() {
    return loadSpriteSheet('items').then(sprite => {
        return createMushroomFactory(sprite);
    });
}

function createMushroomFactory(sprite) {
    function draw(context) {
        const frame = getAnimationFrame(this);
        sprite.draw(frame, context, 0, 0);
    }
    
    function getAnimationFrame(mushroom) {
        return 'ow-mushroom-1';
    }


    return () => {
        const mushroom = new Entity();
        mushroom.size.set(16, 16);
        mushroom.addTrait(new Behavior());
        mushroom.addTrait(new Consumable());
        mushroom.addTrait(new PendulumMove(1, 50));
        mushroom.addTrait(new Physics());
        mushroom.addTrait(new Solid());
        mushroom.draw = draw;
        return mushroom;
    }
}

class Behavior extends Trait {
    constructor() {
        super('Behavior');
    }
    collides(mushroom, them) {
        if (them.Shift) {
            them.Shift.grow(them);
            mushroom.Consumable.consume();
        } else {
            mushroom.PendulumMove.dir = -mushroom.PendulumMove.dir;
        }
    }
}
