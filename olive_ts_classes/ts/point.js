"use strict";
class Point {
    constructor(x, y, z) {
        this._point = new THREE.BufferGeometry();
        var vertex = new Float32Array([x, y, z]);
        this._point.addAttribute('vertex', new THREE.BufferAttribute(vertex, 3));
        this.X = this._point.getAttribute('vertex').getX(0);
        this.Y = this._point.getAttribute('vertex').getY(0);
        this.Z = this._point.getAttribute('vertex').getZ(0);
    }
}
