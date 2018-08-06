import Entity, {Trait} from '../Entity.js';
import Consumable from '../traits/Consumable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders/loaders.js';
import {Color, Size} from '../traits/Shift.js';

export function loadUpgrade(sprite) {
    return createUpgradeFactory(sprite);
}

function createUpgradeFactory(sprite) {
    function draw(upgrade, upgradeType) {
        return (context) => {
            const frame = getAnimationFrame(upgrade, upgradeType);
            sprite.draw(frame, context, 0, 0);
        }
    }

    function getAnimationFrame(upgrade, upgradeType) {
        if (upgradeType === 'mushroom') {
            return 'ow-mushroom-1';
        } else if (upgradeType === 'flower') {
            return sprite.animations.get('ow-flower')(upgrade.lifetime);
        }
    }


    return (upgradeType) => {
        const upgrade = new Entity();
        upgrade.size.set(16, 16);
        if (upgradeType === 'mushroom') {
            upgrade.addTrait(new PendulumMove(1, 50));
        }
        upgrade.addTrait(new Behavior(upgradeType));
        upgrade.addTrait(new Consumable());
        upgrade.addTrait(new Physics());
        upgrade.addTrait(new Solid());
        upgrade.draw = draw(upgrade, upgradeType);
        return upgrade;
    }
}

class Behavior extends Trait {
    constructor(upgradeType) {
        super('Behavior');
        this.upgradeType = upgradeType;
    }
    collides(upgrade, them) {
        if (them.Shift) {
            if (them.Shift.size === Size.SM) {
                them.Shift.grow(them);
            } else if (them.Shift.size === Size.LG
                && them.Shift.color !== Color.WYR) {
                them.Shift.toFire(them);
            }
            them.itemQueue.push(this.upgradeType);
            upgrade.Consumable.consume();
        } else if (upgrade.PendulumMove) {
            upgrade.PendulumMove.dir = -upgrade.PendulumMove.dir;
        }
    }
}
