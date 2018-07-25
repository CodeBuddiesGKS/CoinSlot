import {Trait} from '../Entity.js';
import {Vector} from '../math.js';

export default class Play extends Trait {
    constructor(entity, camera) {
        super('Play');
        this.avatar = entity;
        this.camera = camera;
        this.checkpoint = new Vector(0, 0);
        this.coins = 0;
        this.lives = 3;
        this.score = 0;
        this.time = 400;
        this.world = '1-1';
    }
    update(entity, deltaTime, level) {
        if (!level.entities.has(this.avatar) && this.lives > 0) {
            --this.lives;
            this.avatar.Killable.revive();
            this.time = 400;
            this.camera.position.x = 0;
            this.avatar.position.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.avatar);
        } else if (this.lives === 0) {
            this.time = 0;
        } else {
            if (this.time <= 0) {
                this.time = 0;
                this.avatar.Killable.kill();
            } else {
                this.time -= deltaTime * 3;
            }
            this.followAvatar(this.avatar);
        }
    }
    followAvatar(avatar) {
        //// Testing Chase
        // if (avatar.position.x > 100) {
        //     this.camera.position.x = Math.max(0, avatar.position.x - 100);
        // }
        //// Real Chase
        const halfEntity = avatar.size.x/2;
        const halfScreen = 256/2;
        const chasePoint = halfScreen - halfEntity;
        const isEntityPastChasePoint = avatar.position.x > chasePoint + this.camera.position.x;
        
        if (isEntityPastChasePoint) {
            this.camera.position.x = avatar.position.x - chasePoint;
        } else if (avatar.position.x < 0) {
            this.camera.position.x = 0;
        }

        if (avatar.bounds.left < this.camera.position.x) {
            avatar.bounds.left = this.camera.position.x;
            avatar.velocity.x = 0;
        }
    }
}
