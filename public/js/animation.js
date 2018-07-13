export function createAnimation(frames, frameLength) {
    return (distance) => {
        const frameIndex = Math.floor(distance / frameLength) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    };
}
