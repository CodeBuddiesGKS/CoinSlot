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
        this.color = Color.RYG;
        this.burnTime = 0;
        this.burnTimeLimit = 56/60;
        this.growTime = 0;
        this.growTimeLimit = 60/60;
        this.isGrowing = false;
        this.isBurning = false;
        this.size = Size.SM;
    }
    collides(us, them) {
        // if avatar.Shift.size === 'lg' && nudges enemy
        if (false) {
            // activate avatar.shrink() animation
            // avatar.Solid.on = false? or avatar.Killable.isKillable = false? new thing?
            // avatar.size.y = 16;
            // avatar.Shift.size = 'sm', might do this automatically in the animation
        }

        // if avatar.Shift.size === 'sm' && nudges enemy
        else if (false) {
            // freeze all entities (mario, npcs, items)
            // change sprite to sm-color-dead
            // 1/4 second later make him jump upwards
            // avatar.Solid.on = false
            // he is killed when he falls off the map?
        }
    }
    grow(us) {
        if (this.size === Size.SM) {
            this.queue(() => {
                this.isGrowing = true;
                us.Go.on = false;
                us.Jump.on = false;
                us.Physics.on = false;
            });
        }
    }
    shrink(us) {
        if (this.size === Size.LG) {
            this.queue(() => {
                this.isGrowing = true;
                us.Go.on = false;
                us.Jump.on = false;
                us.Physics.on = false;
            });
        }
    }
    toFire(us) {
        if (this.size === Size.LG) {
            this.queue(() => {
                this.isBurning = true;
                us.Go.on = false;
                us.Jump.on = false;
                us.Physics.on = false;
            });
        }
    }
    update(entity, deltaTime, level) {
        if (!this.on) {
            return;
        }
        if (this.isGrowing) {
            this.growTime += deltaTime;
            if (this.growTime > this.growTimeLimit) {
                this.queue(() => {
                    this.isGrowing = false;
                    this.size = Size.LG;
                    entity.Go.on = true;
                    entity.Jump.on = true;
                    entity.Physics.on = true;
                });
            }
        } else if (this.isBurning) {
            this.burnTime += deltaTime;
            if (this.burnTime > this.burnTimeLimit) {
                this.queue(() => {
                    this.isBurning = false;
                    this.color = Color.WYR;
                    entity.Go.on = true;
                    entity.Jump.on = true;
                    entity.Physics.on = true;
                });
            }
        }
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
        this.queue((entity, deltaTime, level) => {
            this.isBurning = false;
            this.isGrowing = false;
            this.burnTime = 0;
            this.growTime = 0;
        });
    }
}