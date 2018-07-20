import { Vector } from "./math.js";

export default class Camera {
    constructor() {
        this.position = new Vector(0, 0);
        this.size = new Vector(256, 240);
    }
    followEntity(entity, canvas) {
        //// Testing Chase
        // if (entity.position.x > 100) {
        //     this.position.x = Math.max(0, entity.position.x - 100);
        // }
        //// Real Chase
        const halfEntity = entity.size.x/2;
        const halfScreen = canvas.width/2;
        const chasePoint = halfScreen - halfEntity;
        const isEntityPastChasePoint = entity.position.x > chasePoint + this.position.x;
        
        if (isEntityPastChasePoint) {
            this.position.x = entity.position.x - chasePoint;
        } else if (entity.position.x < 0) {
            this.position.x = 0;
        }

        if (entity.bounds.left < this.position.x) {
            entity.bounds.left = this.position.x;
            entity.velocity.x = 0;
        }
    }
}