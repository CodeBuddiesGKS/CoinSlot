import {loadAvatar} from './entities/Avatar.js';

import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';

import {loadBrokenBrick} from './entities/BrokenBrick.js';
import {loadCoin} from './entities/Coin.js';
import {loadUpgrade} from './entities/Upgrade.js';

import {loadSpriteSheet} from './loaders/loaders.js';

export function loadEntityFactory() {
    const entityFactories = {};

    return Promise.all([
        loadSpriteSheet('avatars'),
        loadSpriteSheet('npcs'),
        loadSpriteSheet('items')
    ])
    .then(([avatarSprite, npcSprite, itemSprite]) => {
        // Load Avatars
        entityFactories['avatar'] = loadAvatar(avatarSprite);

        // Load NPCs
        entityFactories['goomba'] = loadGoomba(npcSprite);
        entityFactories['koopa'] = loadKoopa(npcSprite);

        // Load Items
        entityFactories['brokenBrick'] = loadBrokenBrick(itemSprite);
        entityFactories['coin'] = loadCoin(itemSprite);
        entityFactories['upgrade'] = loadUpgrade(itemSprite);

        return entityFactories;
    });
}