import * as THREE from 'three';
import { COMPARTMENT_1 } from './data/compartment1';
import { COMPARTMENT_2 } from './data/compartment2';
import { IPoint, IGeometry } from './data/ICompartment';

class Vector2 extends THREE.Vector2 {
    public srid: IPoint['srid'];

    constructor(point: IPoint) {
        super(point.x, point.y);
        this.srid = point.srid;
    }
}

export class Polygon extends THREE.Shape {
    public vector2: Vector2[];
    public vertices: IPoint[];

    constructor(geometry: IGeometry) {
        const vector2Array: Vector2[] = [];
        const verticesArray: IPoint[] = [];

        geometry.points.forEach((point: IPoint) => {
            vector2Array.push(new Vector2(point));
            verticesArray.push(point);
        });

        super(vector2Array);
        this.vector2 = vector2Array;
        this.vertices = verticesArray;
    }
}

class Vector3 extends THREE.Vector3 {
    public srid: IPoint['srid'];

    constructor(point: IPoint) {
        super(point.x, point.y, point.z);
        this.srid = point.srid;
    }
}
