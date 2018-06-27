import Compositor from "./Compositor.js";
import TileCollider from './TileCollider.js';
import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.gravity = 1500;
        this.tiles = new Matrix();
        this.totalTime = 0;
        this.tileCollider = new TileCollider(this.tiles);
    }
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.position.x += entity.velocity.x * deltaTime;
            this.tileCollider.checkX(entity);
            entity.position.y += entity.velocity.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.velocity.y += this.gravity * deltaTime;
        });
        this.totalTime += deltaTime;
    }
}
