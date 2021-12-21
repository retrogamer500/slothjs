import {Input} from './input.js';
import {initDefaultHandlers} from './collisions/handler.js';

class Game {
    input;
    graphics;

    state;
    nextState;
    canvas;
    canvasId = 'game';

    constructor(state) {
        this.state = state;
        
    }

    run() {
        this.canvas = document.getElementById(this.canvasId);
        if (this.canvas.getContext) {
            this.graphics = this.canvas.getContext('2d');
            this.extendGraphics();
            initDefaultHandlers();
            this.init();
            this.state.beginState();
            setInterval(() =>(this.step()), 1000.0/30);
        }
    }

    extendGraphics() {
        this.graphics.setColor = function(r = 255, g = 255, b = 255, a = 255) {
            this.fillStyle = 'rgb(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ',' + Math.floor(a) + ')';
        }
    }

    init() {
        this.input = new Input();
    }

    step() {
        this.input.processInput();
        this.state.stepState(this);
        this.state.renderState(this, this.graphics);    
        
        if(this.nextState) {
            this.state = this.nextState;
            this.nextState = undefined;

            this.state.beginState(this);
            this.state.postBeginState(this);
        }
    }

    setState(state) {
        this.nextState = state;
    }
}

export {Game};