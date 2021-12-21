const INDEX_OUT_OF_BOUNDS = 'Index out of bounds';

class Grid {
    width;
    height;
    #grid

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.#grid = [];

        for(let i = 0; i < width; i++) {
            this.#grid.push(new Array(height).fill(undefined));
        }
    }
    
    get(x, y) {
        if(x < 0 || x >=this.width || y < 0 || y > this.height) {
            throw new Error(INDEX_OUT_OF_BOUNDS);
        }
        return this.#grid[x][y];
    }

    set(x, y, item) {
        if(x < 0 || x >=this.width || y < 0 || y > this.height) {
            throw new Error(INDEX_OUT_OF_BOUNDS);
        }

        this.#grid[x][y] = item;
    }

    set width(val) {
        if(val < this.width) {
            this.#grid.length = val;
        }
        if(val > this.width) {
            this.#grid.length = val;
            this.#grid.fill(undefined, this.width);
        }
        this.width = val;
    }

    set height(val) {
        for(let column of this.#grid) {
            if(val < this.height) {
                column.length = val;
            }
            if(val > this.height) {
                column.length = val;
                column.length.fill(undefined, this.height);
            }
        }
        this.height = val;
    }

    pathfind(sourceX, sourceY, destinationX, destinationY, emptyFunction) {
        
    }
}

export {Grid};