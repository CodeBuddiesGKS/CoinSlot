import Entity from '../Entity.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba').then(goombaSprite => {
        return createGoombaFactory(goombaSprite);
    });
}

function createGoombaFactory(goombaSprite) {
    function drawGoomba(context) {
        const frame = goombaSprite.animations.get('walk')(this.lifetime);
        goombaSprite.draw(frame, context, 0, 0);
    }

    return () => {
        const goomba = new Entity();
        goomba.size.set(16, 16);
        goomba.addTrait(new PendulumWalk());
        goomba.draw = drawGoomba;
        return goomba;
    }
}
