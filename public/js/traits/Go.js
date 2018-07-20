import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('Go');
        this.accelerationFactor = 400;
        this.decelerationFactor = 400;
        this.dir = 0;
        this.distance = 0;
        this.heading = 1;
        this.dragCoefficient;
    }
    update(entity, deltaTime, level) {
        const absX = Math.abs(entity.velocity.x);

        if (this.dir !== 0) {
            //accelarate when controlled
            entity.velocity.x += this.accelerationFactor * deltaTime * this.dir;

            //drag gives the entity a top speed when controlled
            //the abs preserves the velocity direction
            const drag = this.dragCoefficient * entity.velocity.x * absX;
            entity.velocity.x -= drag;
            
            //don't change directions when in the air
            if ((entity.Jump && entity.Jump.freeFall <= 0)
                || !entity.Jump) {
                this.heading = this.dir;
            }
        } else if (entity.velocity.x !== 0) {
            //decelerate when not controlled && moving
            const decel = Math.min(absX, this.decelerationFactor * deltaTime);
            entity.velocity.x += entity.velocity.x > 0 ? -decel : decel;
        }

        //used for animations
        if (entity.velocity.x === 0) {
            this.distance = 0;
        } else {
            this.distance += absX * deltaTime;
        }
    }
}
