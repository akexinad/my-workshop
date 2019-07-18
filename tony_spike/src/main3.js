// ===================
// POINT
// ===================


class Point {
    
    constructor(x, y, z, srid) {
        this._point = new THREE.BufferGeometry();
        const vertex = new Float32Array([x, y, z]);
        this._point.addAttribute('vertex', new THREE.BufferAttribute(vertex, 3));
        this.srid = srid;
        
        this.x = this._point.getAttribute('vertex').getX(0);
        this.y = this._point.getAttribute('vertex').getY(0);
        this.z = this._point.getAttribute('vertex').getZ(0);
    }   
}


// const olivePoint = new Point(222, 333, 444, 1234567890);
// console.log("OLIVE POINT ====>", olivePoint);




// ==================
// RING
// ==================


class Ring extends THREE.LineLoop {

    constructor(compartmentGeometry) {
        const ring = new THREE.BufferGeometry();
        const newPoints = [];

        // console.log('COMPARTMENT GEOMETRY INSIDE RING CLASS ====> ', compartmentGeometry);
        

        // Instantiate new Point classes from each coordinate of the polygon.
        compartmentGeometry.forEach(coordinate => {
            newPoints.push(new Point(coordinate.x, coordinate.y, coordinate.z, coordinate.srid));
        });

        // console.log('POINTS INSIDE THE RING CLASS ====>', newPoints);
        
        if (newPoints[0] === newPoints[newPoints.length - 1]) {
            newPoints.pop();
        }
        
        let verticesList = [];
        
        // Create an array of all the coordinates in order to instantiate
        // a new Float32Array which can then be used to instantiate a new Ring.
        newPoints.forEach( vertex => verticesList.push(vertex.x, vertex.y, vertex.z));
        
        const vertices = new Float32Array(verticesList);
        
        ring.addAttribute('vertices', new THREE.BufferAttribute(vertices, 3));

        super(ring);
    }
}


// const oliveRing = new Ring(silverTownData);
// console.log("OLIVE RING ====>", oliveRing);




// ==================
// EXTRUSION
// ==================




class OliveGeometry extends THREE.ExtrudeBufferGeometry {

    constructor(compartment) {

        // console.log('Data Inside OliveGeometry ====>', compartment);
        
        const ring = new Ring(compartment.geometry);
        const groupedCoordinates = [];
        const vector3Array = [];

        const ringArray = ring.geometry.getAttribute('vertices').array;

        for (let i = 0, end = ringArray.length / 3; i < end; i++) {
            groupedCoordinates.push(ringArray.slice(i * 3, (i + 1) * 3));
        }

        groupedCoordinates.forEach( coordinate => {
            vector3Array.push( new THREE.Vector3(coordinate[0], coordinate[1], coordinate[2]) );
        });

        const shape = new THREE.Shape(vector3Array);

        // console.log('HEIGHT ====>', compartment.height);   

        const extrusionSettings = {
            depth: compartment.height,
            // depth: ring.geometry.getAttribute('vertices').getZ(0),
            steps: 1,
            bevelEnabled: false
        };

        super(shape, extrusionSettings);
    }   
}


// const oliveGeometry = new OliveGeometry(silverTownData);
// console.log("OLIVE GEOMETRY ====>", oliveGeometry);




// ==================
// MESH
// ==================


class OliveMesh extends THREE.Mesh {

    constructor(compartment, colour) {

        const geometry = new OliveGeometry(compartment);
        // const zPosition = compartment.geometry[0].z;
        
        const material = new THREE.MeshLambertMaterial({
            color: colour
        });

        super(geometry, material);
        // this.position.set(0, 0, zPosition)
    }
}


// const silvertownCompartments = silvertown[0].scenarios[0].structures[0].compartments;
// silvertownCompartments.forEach(compartment => {
//     const oliveMesh = new OliveMesh(compartment, 'red');
//     console.log('OLIVE MESH ====>', oliveMesh);
//     scene.add(oliveMesh)
// })



// ==================
// BUILDER
// ==================


class OliveBuild {

    constructor(data, colour) {

        const meshColour = colour;
        
        // const structureGroup = new THREE.Group();
        // structureGroup.name = 'structures';
        // const compartmentGroup = new THREE.Group();
        // compartmentGroup.name = 'compartments';

        // structureGroup.add(compartmentGroup);

        data.forEach( compartment => {
            
            const zPosition = compartment.geometry[0].z;
            const compartmentMesh = new OliveMesh(compartment, meshColour);
            compartmentMesh.position.set(0, 0, zPosition);
            
            // compartmentGroup.add(compartmentMesh);
            // scene.add(compartmentGroup)
            scene.add(compartmentMesh)
        });

    }
}

const silvertownStructure = silvertown[0].scenarios[0].structures[0];
// new OliveBuild(silvertownStructure, 'red');








///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



// const oliveMesh = new OliveMesh(silverTownData, '#D40000');
// console.log("OLIVE MESH ====>", oliveMesh);


console.log('SILVERTOWN ====>', silvertown);
console.log("SILVERTOWN STRUCTURES ====>", silvertown[0].scenarios[0].structures[0]);
console.log('SILVERTOWN FIRST COMPARTMENTS ====>', silvertown[0].scenarios[0].structures[0].compartments);
console.log('SAMPLE COMPARTMENT DATA ====>', compartmentStack);


new OliveBuild(towerStack, 'red');
new OliveBuild(towerStack2, 'blue');


console.log('THE SCENE ==========>', scene);


scene.add(light, lightHelper);

// renderer.render(scene, camera)
animate();