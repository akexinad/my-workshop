import * as THREE from "three";
import { ICreateObjectOptions } from "../interfaces";

export const utils = {
    makePerspectiveMatrix: (
        fovy: number,
        aspect: number,
        near: number,
        far: number
    ) => {
        let out = new THREE.Matrix4();
        let f = 1.0 / Math.tan(fovy / 2),
            nf = 1 / (near - far);

        let newMatrix = [
            f / aspect,
            0,
            0,
            0,
            0,
            f,
            0,
            0,
            0,
            0,
            (far + near) * nf,
            -1,
            0,
            0,
            2 * far * near * nf,
            0
        ];

        out.elements = newMatrix;
        return out;
    },

    radified: (rotationOptions: ICreateObjectOptions["rotation"]) => {
        const { x, y, z } = rotationOptions;

        return {
            x: (Math.PI * 2 * x) / 360,
            y: (Math.PI * 2 * y) / 360,
            z: (Math.PI * 2 * z) / 360
        };
    }
};
