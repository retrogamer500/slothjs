import { State } from './slothengine/state.js';
import {Terrain} from './terrain.js';


class TestState extends State {
    terrain;
    waterLevel = .3;

    constructor() {
        super();
    }

    beginState(game) {
        super.beginState(game);

        this.waterLevel = .2 + .5 * Math.random();
        this.terrain = new Terrain();
    }

    render(game, graphics) {
        super.render(game, graphics);

        for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 128; j++) {
                let val = this.terrain.get(i, j);
                if(val > this.waterLevel) {
                    graphics.setColor(val * 255, 255, val * 255);
                }
                else {
                    graphics.setColor(0, 0, 255);
                }
                graphics.fillRect(i * 2, j * 2, 2, 2);
            }
        }
    }
}

export {TestState}