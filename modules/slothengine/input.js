class Input {
    static UP = 0;
    static PRESSED = 1;
    static DOWN = 2;
    static RELEASED = 3;

    static BUFFER_SIZE = 2048;

    currentBuffer = new Array(Input.BUFFER_SIZE).fill(0);
    nextBuffer = new Array(Input.BUFFER_SIZE).fill(0);

    constructor() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode >= 0 && e.keyCode < Input.BUFFER_SIZE) {
                this.nextBuffer[e.keyCode] = Input.PRESSED;
            }
        }, false);
        window.addEventListener('keyup', (e) => {
            if (e.keyCode >= 0 && e.keyCode < Input.BUFFER_SIZE) {
                this.nextBuffer[e.keyCode] = Input.RELEASED;
            }
        }, false);
    }

    processInput() {
        for(let i = 0; i < Input.MAX_KEYCODE; i++) {
            if(this.nextBuffer[i] == Input.PRESSED) {
                if(this.currentBuffer[i] != Input.DOWN) {
                    this.currentBuffer[i] = Input.PRESSED;
                }
            }
            else if(this.nextBuffer[i] == Input.RELEASED) {
                this.currentBuffer[i] = Input.RELEASED;
            }
            else {
                if(this.currentBuffer[i] == Input.PRESSED) {
                    this.currentBuffer[i] = Input.DOWN;
                }
                if(this.currentBuffer[i] == Input.RELEASED) {
                    this.currentBuffer[i] = Input.UP;
                }
            }
            this.nextBuffer[i] = Input.UP;
        }
    }

    keyPressed(key) {
        if(typeof key == 'string') {key = key.charCodeAt(0)};
        return this.currentBuffer[key] == Input.DOWN;
    }

    keyDown(key) {
        if(typeof key == 'string') {key = key.charCodeAt(0)};
        return this.currentBuffer[key] == Input.DOWN || this.currentBuffer[key] == Input.PRESSED;
    }

    keyUp(key) {
        if(typeof key == 'string') {key = key.charCodeAt(0)};
        return this.currentBuffer[key] == this.UP;
    }
}

export {Input}