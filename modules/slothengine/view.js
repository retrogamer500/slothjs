import { Mat4 } from "./math/mat4";

class View {
    x = 0;
    y = 0;
    zoom = 1;
    angle = 0;

    #matrix = new Mat4;

    getMatrix() {
        //Todo: get from canvas dimensions
        let screenWidth = 320;
        let screenHeight = 320;

        //this.#matrix.identity().translate(screenWidth/2, screenHeight/2, 0)

        return this.#matrix;
    }
}

export {View};