import {Trait} from '../Entity.js';
import {Vector} from '../math.js';

export default class PlayState extends Trait {
    constructor(entity, camera) {
        super('PlayState');
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
        if (!this.on) {
            return;
        }
        if (level.entities.has(this.avatar)) {
            this.avatar.itemQueue.forEach(item => {
                this.processItem(item);
            });
            this.avatar.itemQueue.length = 0;
            if (this.time > 0) {
                this.time -= deltaTime * 3;
                this.followAvatar(this.avatar);
            } else {
                this.time = 0;
                this.avatar.Killable.kill();
            }
        } else {
            if (this.lives > 0) {
                this.avatar.Killable.revive();
                this.avatar.position.set(this.checkpoint.x, this.checkpoint.y);
                level.entities.add(this.avatar);
                this.camera.position.x = 0;
                this.time = 400;
                --this.lives;
            } else {
                this.time = 0;
            }
        }
    }
    followAvatar(avatar) {
        //// Testing Chase
        if (avatar.position.x > 100) {
            this.camera.position.x = Math.max(0, avatar.position.x - 100);
        }
        //// Real Chase
        // const halfEntity = avatar.size.x/2;
        // const halfScreen = 256/2;
        // const chasePoint = halfScreen - halfEntity;
        // const isEntityPastChasePoint = avatar.position.x > chasePoint + this.camera.position.x;
        
        // if (isEntityPastChasePoint) {
        //     this.camera.position.x = avatar.position.x - chasePoint;
        // } else if (avatar.position.x < 0) {
        //     this.camera.position.x = 0;
        // }

        // if (avatar.bounds.left < this.camera.position.x) {
        //     avatar.bounds.left = this.camera.position.x;
        //     avatar.velocity.x = 0;
        // }
    }
    processItem(item) {
        if (item === "coin") {
            this.score += 200;
            this.coins += 1;
        } else if (item === "flower" || item === "mushroom") {
            this.score += 1000;
        }
    }
    get on() {
        return this.isOn;
    }
    set on(isOn) {
        this.isOn = isOn;
    }
}
