import { CollisionSystem } from './collisions/collisionSystem.js';
import { View } from './view.js';

class State {

    entities = [];
    currentEntity = 0;
    collisionSystem = new CollisionSystem();
    view = new View();

    constructor() {

    }

    beginState(game) {
        
    }

    postBeginState(game) {
        for(this.currentEntity = 0; this.currentEntity < this.entities.length; this.currentEntity++) {
            this.entities[this.currentEntity].onCreate(game);
        }
    }

    stepState(game) {
        this.step(game);
        this.entities.sort((a, b) => a - b);

        for(this.currentEntity = 0; this.currentEntity < this.entities.length; this.currentEntity++) {
            this.entities[this.currentEntity].beforeStep(game);
        }

        for(this.currentEntity = 0; this.currentEntity < this.entities.length; this.currentEntity++) {
            this.entities[this.currentEntity].step(game);
        }

        for(this.currentEntity = 0; this.currentEntity < this.entities.length; this.currentEntity++) {
            this.entities[this.currentEntity].afterStep(game);
        }

        this.entities.filter(e => e.destroyed).forEach(e => e.onDestroy(this));
        this.entities = this.entities.filter(e => !e.destroyed)
    }

    step(game) {

    }

    renderState(game, graphics) {

        //Todo
        //graphics.setTransform(1, 0, 0, 1, 0, 0);
        //graphics.translate(this.view.x, this.view.y);
        //graphics.scale(this.view.zoom, this.view.zoom);
        //graphics.rotate(this.view.angle);

        for(this.currentEntity = 0; this.currentEntity < this.entities.length; this.currentEntity++) {
            this.entities[this.currentEntity].render(game, graphics);
        }
        this.render(game, graphics);
    }

    render(game, graphics) {

    }

    add(entity) {
        //Insert entity in proper place
        let index = 0;
        while(index < this.entities.length) {
            if(entities[index].depth >= entity.depth) {
                break;
            }
            index++;
        }

        this.entities.splice(index, 0, entity);

        //Need this logic because we can be modifying the array while looping through it in the game loop
        if(index < this.currentEntity) {
            this.currentEntity++;
        }
    }
}

export {State};