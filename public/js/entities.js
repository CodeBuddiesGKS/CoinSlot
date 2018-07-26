import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadAvatar} from './entities/Avatar.js';

export function loadEntityFactory() {
    const entityFactories = {};

    function addFactory(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadAvatar().then(addFactory('avatar')),
        loadGoomba().then(addFactory('goomba')),
        loadKoopa().then(addFactory('koopa'))
    ])
    .then(() => entityFactories);
}