import Entity, {Trait} from '../Entity.js';
import Consumable from '../traits/Consumable.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import {Size} from '../traits/Shift.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadCoin() {
    return loadSpriteSheet('items').then(sprite => {
        return createCoinFactory(sprite);
    });
}

function createCoinFactory(sprite) {
    function draw(context) {
        const frame = getAnimationFrame(this);
        sprite.draw(frame, context, 0, 0);
    }

    function getAnimationFrame(coin) {
        return sprite.animations.get('coin')(coin.lifetime);
    }

    return () => {
        const coin = new Entity();
        coin.size.set(16, 16);
        coin.addTrait(new Behavior());
        coin.addTrait(new Physics());
        coin.draw = draw;
        return coin;
    }
}

class Behavior extends Trait {
    constructor() {
        super('Behavior');
        this.avatar;
    }
    update(entity, deltaTime, level) {
        if (entity.lifetime > 24/60) {
            this.avatar.itemQueue.push("coin");
            this.queue(() => level.entities.delete(entity));
        }
    }
}
