import Entity, {Trait} from '../Entity.js';
import Physics from '../traits/Physics.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadCoin(sprite) {
    return createCoinFactory(sprite);
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
        coin.velocity.y = -336;
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
        this.lifeTimeLimit = 24/60;
    }
    update(entity, deltaTime, level) {
        if (entity.lifetime > this.lifeTimeLimit) {
            this.avatar.itemQueue.push("coin");
            this.queue(() => level.entities.delete(entity));
        }
    }
}
