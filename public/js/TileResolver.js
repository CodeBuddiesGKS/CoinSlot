export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }
    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        const l = indexX * this.tileSize;
        const r = l + this.tileSize;
        const t = indexY * this.tileSize;
        const b = t + this.tileSize;
        const cx = l + Math.floor(this.tileSize/2);
        const cy = t + Math.floor(this.tileSize/2);
        if (tile) {
            return {
                tile,
                l,
                r,
                t,
                b,
                cx,
                cy
            };
        }
    }
    searchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        );
    }
    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            });
        });
        return matches;
    }
    toIndex(pos) {
        return Math.floor(pos/this.tileSize);
    }
    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);
        return range;
    }
}
