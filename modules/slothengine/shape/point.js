import {Shape} from './shape.js';

class Point extends Shape {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getBoundingBox() {
        return new Cuboid(this.x, this.y, this.z,
            this.x, this.y, this.z);
    }
}

export {Point}