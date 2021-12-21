class Mat4 {
    m00; m01; m02; m03;
    m10; m11; m12; m13;
    m20; m21; m22; m23;
    m30; m31; m32; m33;

    static #tempMat = new Mat4();

    constructor(mat) {
        if(mat == undefined) {
            this.set(mat);
        }
        else {
            this.identity();
        }
    }

    set(mat) {
        this.m00 = mat.m00; this.m01 = mat.m01; this.m02 = mat.m02; this.m03 = mat.m03;
        this.m10 = mat.m10; this.m11 = mat.m11; this.m12 = mat.m12; this.m13 = mat.m13;
        this.m20 = mat.m20; this.m21 = mat.m21; this.m22 = mat.m22; this.m23 = mat.m23;
        this.m30 = mat.m30; this.m31 = mat.m31; this.m32 = mat.m32; this.m33 = mat.m33;

        return this;
    }

    identity() {
        this.m00 = 1; this.m01 = 0; this.m02 = 0; this.m03 = 0;
        this.m10 = 0; this.m11 = 1; this.m12 = 0; this.m13 = 0;
        this.m20 = 0; this.m21 = 0; this.m22 = 1; this.m23 = 0;
        this.m30 = 0; this.m31 = 0; this.m32 = 0; this.m33 = 1;

        return this;
    }

    translation(x, y, z) {
        this.identity();
        this.m03 = x;
        this.m13 = y;
        this.m23 = z;

        return this;
    }

    translate(x, y, z) {
        Mat4.#tempMat.translation(x, y, z);
        this.mul(Mat4.#tempMat);

        return this;
    }

    scaling(sx, sy, sz) {
        this.identity();
        this.m00 = sx;
        this.m11 = sy;
        this.m22 = sz;

        return this;
    }

    scale(sx, sy, sz) {
        Mat4.#tempMat.scaling(sx, sy, sz);
        this.mul(Mat4.#tempMat);

        return this;
    }

    rotateX(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        Mat4.#tempMat.identity();
        Mat4.#tempMat.m11 = cos;
        Mat4.#tempMat.m21 = -sin;

        Mat4.#tempMat.m12 = sin;
        Mat4.#tempMat.m22 = cos;

        this.mul(Mat4.#tempMat);
        
        return this;
    }

    rotateY(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        Mat4.#tempMat.identity();
        Mat4.#tempMat.m00 = cos;
        Mat4.#tempMat.m20 = sin;

        Mat4.#tempMat.m02 = -sin;
        Mat4.#tempMat.m22 = cos;

        this.mul(Mat4.#tempMat);
        
        return this;
    }

    rotateZ(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        Mat4.#tempMat.identity();
        Mat4.#tempMat.m00 = cos;
        Mat4.#tempMat.m10 = -sin;

        Mat4.#tempMat.m01 = sin;
        Mat4.#tempMat.m11 = cos;

        this.mul(Mat4.#tempMat);
        
        return this;
    }

    mul(mat) {
        let t00 = (this.m00 * mat.m00) + (this.m01 * mat.m10) + (this.m02 * mat.m20) + (this.m03 * mat.m30);
        let t01 = (this.m00 * mat.m01) + (this.m01 * mat.m11) + (this.m02 * mat.m21) + (this.m03 * mat.m31);
        let t02 = (this.m00 * mat.m02) + (this.m01 * mat.m12) + (this.m02 * mat.m22) + (this.m03 * mat.m32);
        let t03 = (this.m00 * mat.m03) + (this.m01 * mat.m13) + (this.m02 * mat.m23) + (this.m03 * mat.m33);
        let t10 = (this.m10 * mat.m00) + (this.m11 * mat.m10) + (this.m12 * mat.m20) + (this.m13 * mat.m30);
        let t11 = (this.m10 * mat.m01) + (this.m11 * mat.m11) + (this.m12 * mat.m21) + (this.m13 * mat.m31);
        let t12 = (this.m10 * mat.m02) + (this.m11 * mat.m12) + (this.m12 * mat.m22) + (this.m13 * mat.m32);
        let t13 = (this.m10 * mat.m03) + (this.m11 * mat.m13) + (this.m12 * mat.m23) + (this.m13 * mat.m33);
        let t20 = (this.m20 * mat.m00) + (this.m21 * mat.m10) + (this.m22 * mat.m20) + (this.m23 * mat.m30);
        let t21 = (this.m20 * mat.m01) + (this.m21 * mat.m11) + (this.m22 * mat.m21) + (this.m23 * mat.m31);
        let t22 = (this.m20 * mat.m02) + (this.m21 * mat.m12) + (this.m22 * mat.m22) + (this.m23 * mat.m32);
        let t23 = (this.m20 * mat.m03) + (this.m21 * mat.m13) + (this.m22 * mat.m23) + (this.m23 * mat.m33);
        let t30 = (this.m30 * mat.m00) + (this.m31 * mat.m10) + (this.m32 * mat.m20) + (this.m33 * mat.m30);
        let t31 = (this.m30 * mat.m01) + (this.m31 * mat.m11) + (this.m32 * mat.m21) + (this.m33 * mat.m31);
        let t32 = (this.m30 * mat.m02) + (this.m31 * mat.m12) + (this.m32 * mat.m22) + (this.m33 * mat.m32);
        let t33 = (this.m30 * mat.m03) + (this.m31 * mat.m13) + (this.m32 * mat.m23) + (this.m33 * mat.m33);

        this.m00 = t00;
        this.m01 = t01;
        this.m02 = t02;
        this.m03 = t03;
        this.m10 = t10;
        this.m11 = t11;
        this.m12 = t12;
        this.m13 = t13;
        this.m20 = t20;
        this.m21 = t21;
        this.m22 = t22;
        this.m23 = t23;
        this.m30 = t30;
        this.m31 = t31;
        this.m32 = t32;
        this.m33 = t33;

        return this;
    }

    add(mat) {
        return this;
    }

    sub(mat) {
        return this;
    }
}

export {Mat4};