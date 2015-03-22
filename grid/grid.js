// TODO think about renaming this to interval
// then we can have open and closed intervals
// what about half-open, half-closed
class Range {
    constructor(min, max) {
        Object.assign(this, { min, max });
    }
    
    clamp(value) {
        return Math.min(Math.max(value, this.min), this.max);
    }
    
    // open/closed?
    contains(value) {
        return this.min <= value && value <= this.max;
    }
}

// where does this grid live in the scene?
// do we have a GridView which keeps track of this stuff?
// TODO create another datastucture like grid w/o a cellSize
// maybe GridView has the cellSize
class Grid {
    constructor(width, height, cellSize) {
        Object.assign(this, { width, height, cellSize });
        this.data = new Array(width * height);
        this.iRange = new Range(0, width);
        this.jRange = new Range(0, height);
    }

    get(i, j) {
        if (this.contains(i, j)) {
            return this.data[this._index(i,j)];
        }
    }

    set(i, j, value) {
        if (this.contains(i, j)) {
            this.data[this._index(i,j)] = value;
        }
    }

    _index(i, j) {
        return j * this.width + i;
    }

    contains(i, j) {
        return this.iRange.contains(i) && this.jRange.contains(j);
    }
}

export default Grid;
