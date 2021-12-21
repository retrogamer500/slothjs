import { Game } from './modules/slothengine/game.js';
import { TestState } from './modules/testState.js';

let game = new Game(new TestState());
game.run();