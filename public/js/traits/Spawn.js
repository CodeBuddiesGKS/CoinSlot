import {Trait} from '../Entity.js';
import {Vector} from '../math.js';

export default class Spawn extends Trait {
    constructor(entity, camera) {
        super('Spawn');
        this.checkpoint = new Vector(0, 0);
        this.player = entity;
        this.camera = camera;
    }
    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.Killable.revive();
            this.camera.position.x = 0;
            this.player.position.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        }
    }
}
