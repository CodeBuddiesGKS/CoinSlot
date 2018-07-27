export default class Compositor {
    constructor() {
        this.layers = new Map();
    }
    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}