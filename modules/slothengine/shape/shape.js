import {intersects} from '../collisions/handler.js';

class Shape {
    x = 0.0;
    y = 0.0;
    z = 0.0;

    //Refernce back to the entity that owns this shape. Set by the collision system.
    owningEntity = undefined;

    setPos(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getBoundingBox() {
        throw new Error('Method should be overwritten to return a cuboid!');
    }

    collidesWith(shape) {
        return intersects(this, shape);
    }
}

export {Shape}