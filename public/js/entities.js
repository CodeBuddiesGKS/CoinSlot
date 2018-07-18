import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadMario} from './entities/Mario.js';

export function loadEntities() {
    const entityFactories = {};

    function addFactory(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadGoomba().then(addFactory('goomba')),
        loadKoopa().then(addFactory('koopa')),
        loadMario().then(addFactory('mario'))
    ])
    .then(() => entityFactories);
}