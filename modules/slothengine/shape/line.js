import {Shape} from './shape.js';
import {Cuboid} from './cuboid.js';

class Line extends Shape {
    x1 = 0.0;
    y1 = 0.0;
    z1 = 0.0;

    x2 = 0.0;
    y2 = 0.0;
    z2 = 0.0;

    #boundingBox = new Cuboid();

    constructor(x1 = 0, y1 = 0, z1 = 0, x2 = 1, y2 = 1, z2 = 1) {
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;

        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
    }

    getBoundingBox() {
        let bb = this.#boundingBox;
        
        bb.x = Math.min(x1, x2);
        bb.y = Math.min(y1, y2);
        bb.z = Math.min(z1, z2);

        bb.width = Math.abs(x1 - x2);
        bb.height = Math.abs(y1 - y2);
        bb.depth = Math.abs(z1 - z2);

        return bb;
    }

    get x() {
        return this.x1;
    }
    set x(val) {
        let diff = this.x1 - val;
        this.x1 += diff;
        this.x2 += diff;
    }

    get y() {
        return this.y1;
    }
    set y(val) {
        let diff = this.y1 - val;
        this.y1 += diff;
        this.y2 += diff;
    }

    get z() {
        return this.z1;
    }
    set z(val) {
        let diff = this.z1 - val;
        this.z1 += diff;
        this.z2 += diff;
    }
}

export {Line};