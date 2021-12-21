import { Cuboid } from '../shape/cuboid.js';
import { Line } from '../shape/line.js';

class Octree {

    maxDepth;
    maxContents;
    initialSize;

    root;

    constructor(maxDepth = 12, maxContents = 8, initialSize = 1024) {
        this.maxDepth = maxDepth;
        this.maxContents = maxContents;
        this.initialSize = initialSize;

        this.root = new Node(this, 0, 0, 0, initialSize, 0);
    }

    add(shape) {
        while(!this.root.shape.fullyContains(shape)) {
            //Grow the octree outwards
            let positiveX = (shape.x - this.root.x) > 0;
            let positiveY = (shape.y - this.root.y) > 0;
            let positiveZ = (shape.z - this.root.z) > 0;

            let newPosX = this.root.x + (positiveX ? 1: -1) * this.root.size;
            let newPosY = this.root.y + (positiveY ? 1: -1) * this.root.size;
            let newPosZ = this.root.z + (positiveZ ? 1: -1) * this.root.size;

            let newNode = new Node(this, newPosX, newPosY, newPosZ, this.root.size * 2, this.root.depth - 1);
            newNode.subdivide();
            let index = (positiveX ? 4 : 0) + (positiveY ? 2 : 0) + (positiveZ ? 1 : 0);
            newNode.childNodes[index] = this.root;
            this.root = newNode;
        }

        this.root.add(shape);
    }

    remove(shape) {
        this.root.remove(shape);
    }

    performAction(shape, action, node = this.root) {
        if(shape.constructor != Line) {
            shape = shape.getBoundingBox();
        }
        if(node.shape.collidesWith(shape)) {
            if(node.hasChildNodes()) {
                for(let child of node.childNodes) {
                    let exitEarly = performAction(shape, action, child);
                    if(exitEarly) {
                        return true;
                    }
                }
            }
            else {
                return action(node);
            }
        }
    }
}

class Node {
    octree;
    x;
    y;
    z;
    size;
    depth;
    shape;

    childNodes = [];
    contents = [];

    constructor(octree, x, y, z, size, depth) {
        this.octree = octree;
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.depth = depth;

        this.shape = new Cuboid(x - size, y - size, z - size, size * 2, size * 2, size * 2);
    }

    hasChildNodes() {
        return this.childNodes.length > 0;
    }

    subdivide() {
        this.childNodes.push(new Node(this.octree, this.x + this.size/2, this.y + this.size/2, this.z + this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x + this.size/2, this.y + this.size/2, this.z - this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x + this.size/2, this.y - this.size/2, this.z + this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x + this.size/2, this.y - this.size/2, this.z - this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x - this.size/2, this.y + this.size/2, this.z + this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x - this.size/2, this.y + this.size/2, this.z - this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x - this.size/2, this.y - this.size/2, this.z + this.size/2, this.size/2, this.depth + 1));
        this.childNodes.push(new Node(this.octree, this.x - this.size/2, this.y - this.size/2, this.z - this.size/2, this.size/2, this.depth + 1));

        for(let shape of this.contents) {
            this.pushShapeToChildren(shape);
        }

        this.contents = [];
    }

    add(shape) {
        if(!this.hasChildNodes()) {
            if(this.contents.length + 1 > this.octree.maxContents && this.depth < this.octree.maxdepth) {
                this.subdivide();
                this.pushShapeToChildren(shape);
            }
            else {
                this.contents.push(shape);
            }
        }
        else {
            this.pushShapeToChildren(shape);
        }
    }

    remove(shape) {
        if(!this.hasChildNodes()) {
            this.contents == this.contents.filter(e => e !== shape);
        }
        else {
            childrenAllEmpty = true;
            for(let childNode of this.childNodes) {
                if(childNode.shape.collidesWith(shape)) {
                    childNode.remove(shape);
                }

                if(childNode.contents.length > 0 || childNode.hasChildNodes()) {
                    childrenAllEmpty = false;
                }
            }
            if(childrenAllEmpty) {
                this.childNodes = [];
            }
        }
    }

    pushShapeToChildren(shape) {
        for(let childNode of this.childNodes) {
            if(childNode.shape.collidesWith(shape)) {
                childNode.add(shape);
            }
        }
    }
}

export {Octree}