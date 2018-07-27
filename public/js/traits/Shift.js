import {Trait} from '../Entity.js';

export const Size = {
    SM: Symbol.for('sm'),
    MD: Symbol.for('md'),
    LG: Symbol.for('lg')
};

export const Color = {
    RYG: Symbol.for('ryg'),
    WYR: Symbol.for('wyr'),
    WYG: Symbol.for('wyg'),
    BWC: Symbol.for('bwc'),
    GWY: Symbol.for('gwy'),
    RWY: Symbol.for('rwy'),
    TWC: Symbol.for('twc'),
    TTT: Symbol.for('ttt'),
    WWW: Symbol.for('www'),
    WWY: Symbol.for('wwy'),
    BWW: Symbol.for('bww')
};

export default class Shift extends Trait {
    constructor() {
        super('Shift');
        this.size = Size.SM;
        this.color = Color.RYG;
    }
    collides(us, them) {
        // if avatar collides with a mushroom
        if (false) {
            // mushroom.delete

            // this.size === 'sm'
            if (false) {
                // freeze all entities (mario, npcs, items)
                // activate avatar.grow() animation
                // avatar.size.y = 32;
                // avatar.Shift.size = 'lg', might do this automatically in the animation
            } else {
                // add to Players score
            }

        }

        // if avatar.Shift.size === 'lg' && nudges enemy
        else if (false) {
            // activate avatar.shrink() animation
            // avatar.Solid.obstructs = false? or avatar.Killable.isKillable = false? new thing?
            // avatar.size.y = 16;
            // avatar.Shift.size = 'sm', might do this automatically in the animation
        }

        // if avatar.Shift.size === 'sm' && nudges enemy
        else if (false) {
            // freeze all entities (mario, npcs, items)
            // change sprite to sm-color-dead
            // 1/4 second later make him jump upwards
            // avatar.Solid.obstructs = false
            // he is killed when he falls off the map?
        }
    }
    update (entity, deltaTime, level) {}
}