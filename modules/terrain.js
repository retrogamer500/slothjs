class Terrain {
    constructor() {
        this.data = [Math.random(), Math.random(), Math.random(), Math.random()];
        this.width = 2;
        this.height = 2;

        while (this.width < 128) {
            this.expand();
            this.fill();
        }
    }

    get(x, y) {
        return this.data[(y * this.width) + (x % this.width)];
    }

    set(x, y, value) {
        this.data[(y * this.width) + (x % this.width)] = value;
    }

    expand() {
        let newData = [];
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                newData.push(this.get(i, j));

                if (i < this.width - 1) {
                    newData.push(undefined);
                }
            }

            if (j < this.height - 1) {
                for (let k = 0; k < this.width * 2 - 1; k++) {
                    newData.push(undefined);
                }
            }
        }

        this.data = newData;
        this.width = this.width * 2 - 1;
        this.height = this.height * 2 - 1;
    }

    fill() {
        //Fill in horizontal
        for (let j = 0; j < this.height; j += 2) {
            for (let i = 1; i < this.width; i += 2) {
                this.set(i, j, this.getNewElevation(this.get(i - 1, j), this.get(i + 1, j)));
            }
        }
        //Fill in vertical
        for (let i = 0; i < this.width; i += 2) {
            for (let j = 1; j < this.height; j += 2) {
                this.set(i, j, this.getNewElevation(this.get(i, j - 1), this.get(i, j + 1)));
            }
        }
        //Fill inbetween
        for (let j = 1; j < this.height; j += 2) {
            for (let i = 1; i < this.width; i += 2) {
                this.set(i, j, this.getNewElevation(this.get(i - 1, j), this.get(i + 1, j), this.get(i, j - 1), this.get(i, j + 1)));
            }
        }
    }

    getNewElevation() {
        let max = 0;
        let min = 1;

        let variation = this.width < 16 ? 1 : .01;

        for (let i = 0; i < arguments.length; i++) {
            let val = arguments[i];
            max = Math.min(Math.max(max, val + variation), 1);
            min = Math.max(Math.min(min, val - variation), 0);
        }

        let difference = max - min;
        return min + Math.random() * difference;
    }

    print() {
        let str = '[\n';
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                if (i != 0) {
                    str += ', ';
                }
                str += this.get(i, j);
            }
            str += '\n';
        }
        str += ']';
        console.log(str);
    }
}

export { Terrain }