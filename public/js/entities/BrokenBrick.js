import Entity, {Trait} from '../Entity.js';
import Physics from '../traits/Physics.js';
import {loadSpriteSheet} from '../loaders/loaders.js';

const STATE_QUAD = Symbol('quad');
const STATE_SINGLETS = Symbol('singlets');

export function loadBrokenBrick() {
    return loadSpriteSheet('items').then(sprite => {
        return createBrokenBrickFactory(sprite);
    });
}

function createBrokenBrickFactory(sprite) {
    function draw(context) {
        const frame = getAnimationFrame(this);
        sprite.draw(frame, context, 0, 0);
    }
    
    function getAnimationFrame(brokenBrick) {
        return 'ow-brick-donut';
    }

    return () => {
        const brokenBrick = new Entity();
        brokenBrick.size.set(16, 16);
        brokenBrick.addTrait(new Behavior(STATE_QUAD, sprite));
        brokenBrick.draw = draw;
        return brokenBrick;
    }
}

class Behavior extends Trait {
    constructor(state, sprite) {
        super('Behavior');
        this.quadTime = 0;
        this.quadTimeLimit = 2/60;
        this.sprite = sprite;
        this.state = state;
    }
    update(entity, deltaTime, level) {
        if (this.state === STATE_QUAD) {
            this.quadTime += deltaTime;
            if (this.quadTime > this.quadTimeLimit) {
                const donutholeFactory = createDonutholeFactory(this.sprite);
                const dh1 = donutholeFactory(entity.position, {x:-70, y:-400}, true);
                const dh2 = donutholeFactory(entity.position, {x:70, y:-400}, false);
                const dh3 = donutholeFactory(entity.position, {x:-70, y:-300}, true);
                const dh4 = donutholeFactory(entity.position, {x:70, y:-300}, false);
                level.entities.add(dh1);
                level.entities.add(dh2);
                level.entities.add(dh3);
                level.entities.add(dh4);
                this.queue(() => level.entities.delete(entity));
            }
        }
    }
}

function createDonutholeFactory(sprite) {
    function draw(flip) {
        return (context) => {
            const frame = getAnimationFrame(this);
            sprite.draw(frame, context, 0, 0, flip);
        }
    }
    
    function getAnimationFrame(brokenBrick) {
        return 'ow-brick-donuthole';
    }

    return (p, v, flip) => {
        const donuthole = new Entity();
        donuthole.size.set(8, 8);
        donuthole.position.set(p.x, p.y);
        donuthole.velocity.set(v.x, v.y);
        donuthole.addTrait(new Behavior(STATE_SINGLETS));
        donuthole.addTrait(new Physics());
        donuthole.draw = draw(flip);
        return donuthole;
    }
}
