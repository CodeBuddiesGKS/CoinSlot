import {loadAvatar} from './entities/Avatar.js';

import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';

import {loadBrokenBrick} from './entities/BrokenBrick.js';
import {loadCoin} from './entities/Coin.js';
import {loadUpgrade} from './entities/Upgrade.js';

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
        loadBrokenBrick().then(addFactory('brokenBrick')),
        loadCoin().then(addFactory('coin')),
        loadUpgrade().then(addFactory('upgrade'))
    ])
    .then(() => entityFactories);
}