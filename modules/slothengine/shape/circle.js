import {Shape} from './shape.js';
import {Cuboid} from './cuboid.js';

class Circle extends Shape {
    radius = 1;

    constructor(x=0, y=0, radius=1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    getBoundingBox() {
        return new Cuboid(this.x - this.radius, this.y - this.radius, 0,
            this.radius * 2, this.radius * 2, 0);
    }
}

export {Circle}