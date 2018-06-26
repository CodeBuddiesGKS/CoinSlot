export default class Timer {
    constructor(refreshRate = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime)/1000;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            while(accumulatedTime > refreshRate) {
                this.update(refreshRate);
                accumulatedTime -= refreshRate;
            }
            lastTime = time;
            this.enqueue();
        }
    }
    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }
    start() {
        this.enqueue();
    }
}
