import {Shape} from './shape.js';

class Cuboid extends Shape {
    width = 0;
    height = 0;
    depth = 0;

    constructor(x = 0, y = 0, z = 0, width = 1, height = 1, depth = 1) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;

        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    getBoundingBox() {
        return this;
    }

    fullyContains(other) {
        other = other.getBoundingBox();

        if(this.x > other.x) {
            return false;
        }
        if(this.y > other.y) {
            return false;
        }
        if(this.z > other.z) {
            return false;
        }

        if(this.x + this.width < other.x + other.width) {
            return false;
        }
        if(this.y + this.height < other.y + other.height) {
            return false;
        }
        if(this.z + this.depth < other.z + other.depth) {
            return false;
        }

        return true;
    }
}

export {Cuboid}