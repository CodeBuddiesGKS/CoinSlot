

export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check() {
        const entityArray = [...this.entities.values()];
        entityArray.forEach((subject, sIndex) => {
            for (let cIndex=sIndex+1; cIndex<entityArray.length; ++cIndex) {
                let candidate = entityArray[cIndex];
                if (subject.bounds.overlaps(candidate.bounds)) {
                    subject.collides(candidate);
                    candidate.collides(subject);
                }
            }
        });
    }
}