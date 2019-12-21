import * as THREE from "three";
// import { THREE } from "threebox-map";
import { IPoint, IGeometry, ICompartment } from "../interfaces/dataInterfaces";

const COLORS = {
    RED: 0x6a0000,
    GREEN: 0x2bb600,
    BLUE: 0x002d6a,
    YELLOW: 0xff9944
};

class RhinoVector2 extends THREE.Vector2 {
    public x: number;
    public y: number;
    public z: number;
    public srid: number;

    constructor(point: IPoint) {
        super(point.x, point.y);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

class RhinoVector3 extends THREE.Vector3 {
    public x: number;
    public y: number;
    public z: number;
    public srid: number;

    constructor(point: IPoint) {
        super(point.x, point.y, point.z);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

class RhinoGeometry extends THREE.ExtrudeBufferGeometry {
    public vector2Array: RhinoVector2[];
    public vector3Array: RhinoVector3[];

    constructor(geometry: IGeometry) {
        const vector2Array: RhinoVector2[] = [];
        const vector3Array: RhinoVector3[] = [];

        geometry.points.forEach(point => {
            vector2Array.push(new RhinoVector2(point));
            vector3Array.push(new RhinoVector3(point));
        });

        const extrusionSettings = {
            depth: geometry.height ? geometry.height : 0,
            steps: 1,
            bevelEnabled: false
        };

        const shape = new THREE.Shape(vector2Array);

        super(shape, extrusionSettings);

        this.vector2Array = vector2Array;
        this.vector3Array = vector3Array;
    }
}

class RhinoMaterial extends THREE.MeshLambertMaterial {
    constructor(color = COLORS.YELLOW, opacity = 1) {
        const options = {
            color,
            transparent: true,
            opacity
        };

        super(options);
    }
}

export class RhinoMesh extends THREE.Mesh {
    
    constructor(volume: ICompartment) {
        const geometry = new RhinoGeometry(volume.geometry);
        const material = new RhinoMaterial();
        
        super(geometry, material);
        
        // @ts-ignore
        this.position.set(0, 0, volume.geometry.points[0].z);
    }
}