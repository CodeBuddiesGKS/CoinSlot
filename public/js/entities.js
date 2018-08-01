import {loadAvatar} from './entities/Avatar.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadCoin} from './entities/Coin.js';
import {loadMushroom} from './entities/Mushroom.js';

export function loadEntityFactory() {
    const entityFactories = {};

    function addFactory(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        // Load Avatars
        loadAvatar().then(addFactory('avatar')),

        // Load NPCs
        loadGoomba().then(addFactory('goomba')),
        loadKoopa().then(addFactory('koopa')),

        // Load Items
        loadCoin().then(addFactory('coin')),
        loadMushroom().then(addFactory('mushroom'))
    ])
    .then(() => entityFactories);
}