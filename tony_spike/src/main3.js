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

    constructor(compartmentGeometryPoints) {
        const ring = new THREE.BufferGeometry();
        const newPoints = [];

        // console.log('COMPARTMENT GEOMETRY INSIDE RING CLASS ====> ', compartmentGeometry);
        

        // Instantiate new Point classes from each coordinate of the polygon.
        compartmentGeometryPoints.forEach(point => {
            newPoints.push(new Point(point.x, point.y, point.z, point.srid));
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




// ==================
// EXTRUSION
// ==================


class OliveGeometry extends THREE.ExtrudeBufferGeometry {

    constructor(compartmentGeometry) {

        // console.log('Data Inside OliveGeometry ====>', compartment);
        
        const ring = new Ring(compartmentGeometry.points);
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
            depth: compartmentGeometry.height,
            // depth: ring.geometry.getAttribute('vertices').getZ(0),
            steps: 1,
            bevelEnabled: false
        };

        super(shape, extrusionSettings);
    }   
}




// ==================
// MESH
// ==================


class OliveMesh extends THREE.Mesh {

    constructor(compartment) {

        const geometry = new OliveGeometry(compartment.geometry);
        const zPosition = compartment.geometry.points[0].z;
        
        // const material = new THREE.MeshLambertMaterial();
        const material = new THREE.MeshLambertMaterial({
            color: '#d40000'
        });

        super(geometry, material);
        this.position.set(0, 0, zPosition);
        this.castShadow = true;
        this.recieveShadow = true;
        // this.geometry.height = compartment.height;
    }
}




// ==================
// BUILDER
// ==================


class OliveBuild {

    constructor(scenario) {

        scenario.structures.forEach( structure => {

            // msg('STRUCTURE INSIDE OLIVE BUILD =====>', structure);

            structure.compartments.forEach(compartment => {

                const zPosition = compartment.geometry.points[0].z;
                const compartmentMesh = new OliveMesh(compartment);
                compartmentMesh.name = compartment.structureId;
                // compartmentMesh.material.emissive.setHex( 0xff0000 );
                compartmentMesh.position.set(0, 0, zPosition);

                msg('MESH INSIDE OLIVE BUILD ====>', compartmentMesh);
                
                scene.add(compartmentMesh); 
            });
        });
    }
}




// ==================
// CLONE
// ==================


class OliveClone extends THREE.Mesh {

    constructor(compartmentMesh) {

        // msg('COMPARTMENT INSIDE OLIVE CLONE 2 =====>', compartmentMesh);

        const name = compartmentMesh.name;
        const shape = compartmentMesh.geometry.parameters.shapes;
        const options = compartmentMesh.geometry.parameters.options;
        const color = compartmentMesh.material.emissive.getHex();
        const height = compartmentMesh.geometry.parameters.options.depth;
        const zPosition = compartmentMesh.position.z;
        const newZPosition = zPosition + height;

        const geometry = new THREE.ExtrudeBufferGeometry(shape, options);
        const material = new THREE.MeshLambertMaterial({
            color
        });

        super(geometry, material);
        this.name = name;
        this.position.set(0, 0, newZPosition);
    }
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////




// const tower1 = new OliveBuild(towerStack, 'tower1', 0xff0000); 
// const tower2 = new OliveBuild(towerStack2, 'tower2', 0x0000ff);
// const tower3 = new OliveBuild(towerStack3, 'tower3', 0x00ff00);


const silvertownProject = silvertownProjectData[0];
msg('SILVER TOWN PROJECT ====>', silvertownProject);

const silvertownScenario = silvertownProject.scenarios[0];
msg('SCENARIO', silvertownScenario);

msg('SCNERARIO STRUCTURES ====>', silvertownScenario.structures);

// silvertownScenario.structures.forEach( structure => {
//     structure.compartments.forEach( compartment => {
//         msg(compartment);
//     })
// });

// Scenario = Project.scenario

new OliveBuild(silvertownScenario);






// console.log('THE SCENE ==========>', scene);


scene.add(light, lightHelper);