import Entity from '../Entity.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

export function loadKoopa() {
    return loadSpriteSheet('koopa').then(koopaSprite => {
        return createKoopaFactory(koopaSprite);
    });
}

function createKoopaFactory(koopaSprite) {
    function drawKoopa(context) {
        const frame = koopaSprite.animations.get('walk')(this.lifetime);
        const flip = this.PendulumWalk.dir === -1;
        koopaSprite.draw(frame, context, 0, 0, flip);
    }

    return () => {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;
        koopa.addTrait(new PendulumWalk());
        koopa.draw = drawKoopa;
        return koopa;
    }
}
