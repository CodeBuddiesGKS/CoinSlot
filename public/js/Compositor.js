export default class Compositor {
    constructor() {
        this.layers = new Map();
    }
    draw(context, camera, deltaTime) {
        this.layers.forEach(layer => {
            layer(context, camera, deltaTime);
        });
    }
}