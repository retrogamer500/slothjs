import {Shape} from './shape.js';

class Rect extends Shape {
    width = 0;
    height = 0;

    constructor(x=0, y=0, width=1, height=1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getBoundingBox() {
        return new Cuboid(this.x, this.y, 0,
            this.width, this.height, 0);
    }
}

export {Rect}