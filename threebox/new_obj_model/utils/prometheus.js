// 'use strict';

const DATA = eustonProjectData;

class Vector3 extends THREE.Vector3 {
    constructor(point) {
        super(point.x, point.y, point.z);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

const pointData = DATA.floors[0].oliveGeometry.polygon.points[0];
const point = new Vector3(pointData);
// console.log(point);


class Geometry extends THREE.ExtrudeBufferGeometry {
    constructor(geometry) {
        const vector2Array = [];
        const vector3Array = [];
        
        geometry.polygon.points.forEach((point) => {
            vector2Array.push(new THREE.Vector2(point.x, point.y));
            vector3Array.push(new Vector3(point));
        });

        const shape = new THREE.Shape(vector2Array);

        const extrudeSettings = {
            depth: geometry.height,
            steps: 1,
            bevelEnabled: false
        }

        super(shape, extrudeSettings);

        this.vector3 = vector3Array;
    }
}

const shapeData = DATA.floors[0].oliveGeometry;
const polygon = new Geometry(shapeData);
// console.log(polygon);

class Volume extends THREE.Mesh {

    constructor(volume) {
        
        const geometry = new Geometry(volume.oliveGeometry);
        const material = new THREE.MeshLambertMaterial({
            color: 0xd40004,
            transparent: true,
            opacity: 1
        })

        super(geometry, material);

        this.nodeContent = {
            nodeId: volume.nodeId,
            parentNodeId: volume.parentNodeId,
            classification: volume.classification,
            useType: volume.attributes.useType,
            type: volume.type
        };

        this.position.set(0, 0, volume.oliveGeometry.polygon.points[0].z);
    }    
}

const volumeData = DATA.floors[0];
const volume = new Volume(volumeData);
// console.log(volume);

class PROMETHEUS {

    constructor(data) {
        this.data = data;
    }

    createGroup(name) {
        const group = new THREE.Group();
        
        group.name = name;

        return group;
    }
    
    buildVolumes() {

        const groupOfVolumes = this.createGroup("volumeNode");

        this.data.floors.forEach((floor) => {
            floor = new Volume(floor);
            groupOfVolumes.add(floor);
        });

        return groupOfVolumes;
    }
}