class Entity {
    destroyed = false;
    depth = 0;

    #shape = undefined;
    #game = game;
    #state = state;
    #x = 0.0;
    #y = 0.0;
    #z = 0.0;

    constructor() {

    }

    onCreate(game, state) {
        this.#game = game;
        this.#state = state;
        this.#state.collisionSystem.add(this);
    }

    beforeStep(game, state) {

    }

    step(game, state) {

    }

    afterStep(game, state) {

    }

    render(game, state, graphics) {
        
    }

    onDestroy(game, state) {
        
    }

    destroy() {
        this.destroyed = true;
        this.#state && this.#state.collisionSystem.remove(this);
    }

    collidesWith(entity) {
        if(this.shape != undefined) {
            if(typeof entityClass == 'function') {
                return this.state.collidesWith(this.#shape, entityClass);
            }
            else {
                if(entity.shape != undefined) {
                    return this.shape.collidesWith(entity.shape);
                }
            }
        }
        return false;
    }

    getCollision(entityClass) {
        if(this.shape != undefined) {
            return this.state.getCollision(this.#shape, entityClass);
        }
        return undefined;
    }

    getCollisions(entityClass) {
        if(this.shape != undefined) {
            return this.state.getCollisions(this.#shape, entityClass);
        }
        return [];
    }

    //Getters and setters
    get pos() {
        return {x: this.#x, y: this.#y, z: this.#z};
    }

    set pos(val) {
        this.#state && this.#state.collisionSystem.remove(this);
        this.#x = val.x;
        this.#y = val.y;
        this.#z = val.z;
        if(this.shape != undefined) {this.shape.x = val.x; this.shape.y = val.y; this.shape.z = val.z;}
        this.#state && this.#state.collisionSystem.add(this);
    }

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#state && this.#state.collisionSystem.remove(this);
        this.#x = value;
        if(this.shape != undefined) {this.shape.x = value;}
        this.#state && this.#state.collisionSystem.add(this);
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#state && this.#state.collisionSystem.remove(this);
        this.#y = value;
        if(this.shape != undefined) {this.shape.y = value;}
        this.#state && this.#state.collisionSystem.add(this);
    }

    get z() {
        return this.#z;
    }

    set z(value) {
        this.#state && this.#state.collisionSystem.remove(this);
        this.#z = value;
        if(this.shape != undefined) {this.shape.z = value;}
        this.#state && this.#state.collisionSystem.add(this);
    }

    get shape() {
        return this.#shape;
    }

    set shape(value) {
        this.#state && this.#state.collisionSystem.remove(this);
        this.#shape = value;
        this.#state && this.#state.collisionSystem.add(this);
    }
}

export {Entity}