import {Trait} from '../Entity.js';

export default class Velocity extends Trait {
    constructor() {
        super('Velocity');
    }
    update(entity, deltaTime) {
        // velocity = distance / time (m/s)
        // acceleration = distance / time^2 (m/s^2)
        // gravity = -9.8 m/s^2
        // const gravity = 2000;
        // entity.position.x += entity.velocity.x * deltaTime;
        // entity.position.y += entity.velocity.y * deltaTime;
        // entity.velocity.y += gravity * deltaTime;
    }
}
