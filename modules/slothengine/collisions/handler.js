import {Rect} from '../shape/rect.js';
import {Circle} from '../shape/circle.js';
import {Line} from '../shape/line.js';
import {Cuboid} from '../shape/cuboid.js';
import {Point} from '../shape/point.js';

let handler = {};
const delta = 0.0001;

function addHandler(shape1, shape2, collisionFunction) {
    if(handler[shape1] == undefined) {
        handler[shape1] = {};
    }

    if(handler[shape2] == undefined) {
        handler[shape2] = {};
    }

    handler[shape1][shape2] = collisionFunction;
    handler[shape2][shape1] = (s1, s2) => collisionFunction(s2, s1);
}

function intersects(shape1, shape2) {
    if(handler[shape1.constructor] != undefined) {
        let collisionFunction = handler[shape1.constructor][shape2.constructor]; 
        if(collisionFunction != undefined) {
            return collisionFunction(shape1, shape2);
        }
    }
    return false;
}

function initDefaultHandlers() {
    addHandler(Circle, Circle, (c1, c2) => {
        return ((c1.x - c2.x) * (c1.x - c2.x))
            + ((c1.y - c2.y) * (c1.y - c2.y))
            < ((c1.radius + c2.radius) * (c1.radius + c2.radius));
    });
    
    addHandler(Circle, Rect, (circle, rect) => {
        let cDisX = Math.abs(circle.x - (rect.x + (rect.width/2)));
        let cDisY = Math.abs(circle.y - (rect.y + (rect.height/2)));
    
        let halfWidth = .5 * rect.width;
        let halfHeight = .5 * rect.height;
    
        if(cDisX > (halfWidth + circle.radius)) {
            return false;
        }
        if(cDisY > (halfHeight + circle.radius)) {
            return false;
        }
    
        if(cDisX <= halfWidth + circle.radius && cDisY <= halfHeight) {
            return true;
        }
    
        if(cDisY <= halfHeight + circle.radius && cDisX <= halfWidth) {
            return true;
        }
    
        let cornerDistance = (cDisX - halfWidth) * (cDisX - halfWidth) +
                (cDisY - halfHeight) * (cDisY - halfHeight);
    
        return cornerDistance <= circle.radius * circle.radius;
    });

    addHandler(Cuboid, Cuboid, (s1, s2) => {
        if(s1.x + s1.width < s2.x) {
            return false;
        }
        if(s2.x + s2.width < s1.x) {
            return false;
        }
        if(s1.y + s1.height < s2.y) {
            return false;
        }
        if(s2.y + s2.height < s1.y) {
            return false;
        }
        if(s1.z + s1.depth < s2.z) {
            return false;
        }
        if(s2.z + s2.depth < s1.z) {
            return false;
        }
    
        return true;
    });
    
    addHandler(Cuboid, Line, (cuboid, line) => {
        let deltaX = line.x2 - line.x1;
        let deltaY = line.y2 - line.y1;
        let deltaZ = line.z2 - z1;
        let scaleX = 1 / deltaX;
        let scaleY = 1 / deltaY;
        let scaleZ = 1 / deltaZ;
        let signX = Math.sign(scaleX);
        let signY = Math.sign(scaleY);
        let signZ = Math.sign(scaleZ);
        let halfX = .5 * cuboid.width;
        let halfY = .5 * cuboid.height;
        let halfZ = .5 * cuboid.depth;
        let posX = cuboid.x + halfX;
        let posY = cuboid.y + halfY;
        let posZ = cuboid.z + halfZ;
    
        let nearTimeX = (posX - signX * halfX - line.x1) * scaleX;
        let nearTimeY = (posY - signY * halfY - line.y1) * scaleY;
        let nearTimeZ = (posZ - signZ * halfZ - line.z1) * scaleZ;
        let farTimeX = (posX + signX * halfX - line.x1) * scaleX;
        let farTimeY = (posY + signY * halfY - line.y1) * scaleY;
        let farTimeZ = (posZ + signZ * halfZ - line.z1) * scaleZ;
    
        if (nearTimeX > farTimeY || nearTimeY > farTimeX || nearTimeZ > farTimeZ) {
            return false;
        }
    
        let nearTime = Math.max(nearTimeX, nearTimeY, nearTimeZ);
        let farTime = Math.min(farTimeX, farTimeY, farTimeZ);
    
        if (nearTime >= 1 || farTime <= 0) {
            return false;
        }
    
        return true;
    });

    addHandler(Line, Line, (line1, line2) => {
        let s1x = line1.x2 - x1;
        let s1y = line1.y2 - line1.y1;
    
        let s2x = line2.x2 - line2.x1;
        let s2y = line2.y2 - line2.y1;
    
        let d = (-s2x * s1y + s1x * s2y);
    
        if(d != 0) {
            let dInv = 1.0 / d;
            let s = (-s1y * (line1.x1 - line2.x1) + s1x * (line1.y1 - line2.y1)) * dInv;
            let t = (s2x * (line1.y1 - line2.y1) - s2y * (line1.x1 - line2.x1)) * dInv;
    
            if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
                return true;
            }
        }
        else {
            //Lines are collinear. We can approximate the lines as rectangles and attempt intersection test
            let x1 = s1x > 0 ? line1.x1 : line1.x2;
            let y1 = s1y > 0 ? line1.y1 : line1.y2;
            let width1 = Math.abs(s1x);
            let height1 = Math.abs(s1y);
            let x2 = s2x > 0 ? line2.x1 : line2.x2;
            let y2 = s1y > 0 ? line1.y1 : line1.y2;
            let width2 = Math.abs(s2x);
            let height2 = Math.abs(s2y);
    
            if(x2 + width2 < x1 || x2 > x1 + width1
                    || y2 + height2 < y1 || y2 > y1 + height1) {
                return false;
            }
            return true;
        }
    
        return false;
    });
    
    addHandler(Line, Circle, (line, circle) => {
        let a = line.x2-line.x1;
        let b = line.y2-line.y1;
        let c = circle.x - line.x1;
        let d = circle.y - line.y1;
        let r = circle.radius;
    
        if ((d*a-c*b)*(d*a-c*b) <= r*r*(a*a+b*b))
        {
            if (c*c + d*d <= r*r)
                return true;
            else if ((a-c)*(a-c)+(b-d)*(b-d) <= r*r)
                return true;
            else if(c*a+d*b>=0 && c*a+d*b <= a*a+b*b)
                return true;
        }
        return false;
    });
    
    addHandler(Line, Cuboid, (line, cuboid) => {
        let deltaX = line.x2 - line.x1;
        let deltaY = line.y2 - line.y1;
        let deltaZ = line.z2 - line.z1;
        let scaleX = 1.0 / deltaX;
        let scaleY = 1.0 / deltaY;
        let scaleZ = 1.0 / deltaZ;
        let signX = Math.sign(scaleX);
        let signY = Math.sign(scaleY);
        let signZ = Math.sign(scaleZ);
        let halfX = .5 * cuboid.width;
        let halfY = .5 * cuboid.height;
        let halfZ = .5 * cuboid.depth;
        let posX = cuboid.x + halfX;
        let posY = cuboid.y + halfY;
        let posZ = cuboid.z + halfZ;
    
        let nearTimeX = (posX - signX * halfX - line.x1) * scaleX;
        let nearTimeY = (posY - signY * halfY - line.y1) * scaleY;
        let nearTimeZ = (posZ - signZ * halfZ - line.z1) * scaleZ;
        let farTimeX = (posX + signX * halfX - line.x1) * scaleX;
        let farTimeY = (posY + signY * halfY - line.y1) * scaleY;
        let farTimeZ = (posZ + signZ * halfZ - line.z1) * scaleZ;
    
        if (nearTimeX > farTimeY || nearTimeY > farTimeX || nearTimeZ > farTimeZ) {
            return false;
        }
    
        let nearTime = Math.max(nearTimeX, nearTimeY, nearTimeZ);
        let farTime = Math.min(farTimeX, farTimeY, farTimeZ);
    
        if (nearTime >= 1 || farTime <= 0) {
            return false;
        }
    
        return true;
    });
    
    addHandler(Line, Rect, (line, rect) => {
        let deltaX = line.x2 - line.x1;
        let deltaY = line.y2 - line.y1;
        let scaleX = 1.0 / deltaX;
        let scaleY = 1.0 / deltaY;
        let signX = Math.sign(scaleX);
        let signY = Math.sign(scaleY);
        let halfX = .5 * rect.width;
        let halfY = .5 * rect.height;
        let posX = rect.x + halfX;
        let posY = rect.y + halfY;
    
        let nearTimeX = (posX - signX * halfX - line.x1) * scaleX;
        let nearTimeY = (posY - signY * halfY - line.y1) * scaleY;
        let farTimeX = (posX + signX * halfX - line.x1) * scaleX;
        let farTimeY = (posY + signY * halfY - line.y1) * scaleY;
    
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return false;
        }
    
        let nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        let farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
    
        if (nearTime >= 1 || farTime <= 0) {
            return false;
        }
    
        return true;
    });

    addHandler(Point, Point, (s1, s2) => {
        return Math.abs(s1.x - s2.x) < delta && Math.abs(s1.y - s2.y) < delta && Math.abs(s1.z - s2.z) < delta;
    });
    
    addHandler(Point, Circle, (point, circle) => {
        return ((point.x - circle.x) * (point.x - circle.x))
            + ((point.y - circle.y) * (point.y - circle.y))
            < (circle.radius * circle.radius);
    });
    
    addHandler(Point, Rect, (point, rect) => {
        if(point.x < rect.x) {
            return false;
        }
        if(point.x > rect.x + rect.width) {
            return false;
        }
        if(point.y < rect.y) {
            return false;
        }
        if(point.y > rect.y + rect.height) {
            return false;
        }
        return true;
    });

    addHandler(Rect, Rect, (r1, r2) => {
        if(r2.x + r2.width < r1.x) {
            return false;
        }
        if(r2.x > r1.x + r1.width) {
            return false;
        }
    
        if(r2.y + r2.height < r1.y) {
            return false;
        }
        if(r2.y > r1.y + r1.height) {
            return false;
        }
    
        return true;
    });
}

export {addHandler, intersects, initDefaultHandlers}