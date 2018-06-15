export default class Timer {
    constructor(refreshRate = 1/60) {
        let accumalatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumalatedTime += (time - lastTime)/1000;
            while(accumalatedTime > refreshRate) {
                this.update(refreshRate);
                accumalatedTime -= refreshRate;
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
