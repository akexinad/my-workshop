import * as THREE from 'three';

export class Utils {

    public static makePerspectiveMatrix(fovy: number, aspect: number, near: number, far: number): THREE.Matrix4 {

        const out = new THREE.Matrix4();
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);

        const newMatrix = [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, (2 * far * near) * nf, 0
        ];

        out.elements = [...newMatrix];
        return out;
    }
}
