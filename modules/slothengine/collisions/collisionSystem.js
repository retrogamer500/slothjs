import { Octree } from '../collections/octree.js';

class CollisionSystem {
    state;
    octree;
    
    constructor(state) {
        this.state = state;
        this.octree = new Octree();
    }

    add(entity) {
        if(entity.shape) {
            entity.shape.owningEntity = entity;
            this.octree.add(entity.shape);
        }
    }

    remove(entity) {
        if(entity.shape) {
            this.octree.remove(entity.shape);
        }
    }

    collidesWith(shape, entityClass) {
        return getCollision(shape, entityClass) != undefined;
    }

    getCollision(shape, entityClass) {
        result = undefined;
        this.octree.performAction(shape, (node) => {
            for(let otherShape of node.contents) {
                if(otherShape != shape
                    && otherShape.collidesWith(shape)
                    && otherShape.owningEntity instanceof entityClass) {
                        result = otherShape.owningEntity;
                        return true;
                    }
            }
            return false;
        });

        return result;
    }

    getCollisions(shape, entityClass) {
        results = [];
        this.octree.performAction(shape, (node) => {
            for(let otherShape of node.contents) {
                if(otherShape != shape
                    && otherShape.collidesWith(shape)
                    && otherShape.owningEntity instanceof entityClass) {
                        results.push(otherShape.owningEntity);
                        return false;
                    }
            }
            return false;
        });

        return results;
    }
}

export {CollisionSystem};