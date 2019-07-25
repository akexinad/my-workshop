class OlivePoint extends THREE.Vector3 {

    constructor( x, y, z, srid ) {

        super(x, y, z);
        this.srid = srid;
    }
}

const point = new OlivePoint(3, 4, 5, 4236);
// console.log(point);



class OlivePolygon extends THREE.Shape {

    constructor( geometryPoints ) {

        // console.log(geometryPoints);
        

        const verticesArray = [];
        
        geometryPoints.forEach( point => {
            verticesArray.push( new OlivePoint(point.x, point.y, point.z, point.srid) );
        });

        // const lastIndex = verticesArray[ verticesArray.length - 1 ];
        // console.log('first vertex', verticesArray[0]);
        // console.log('last vertex', verticesArray[ Number(lastIndex)]);
        // console.log(verticesArray[0] === verticesArray[lastIndex]);
        
        super(verticesArray);
        this.olivePoints = verticesArray;
    }
}

const polygon = new OlivePolygon(polygon1);
// console.log(polygon);


class OliveBufferGeometry extends THREE.ExtrudeBufferGeometry {

    constructor( compartmentGeometry ) {

        const shape = new OlivePolygon( compartmentGeometry.points );
        // const shape = new OlivePolygon( compartmentGeometry );
        
        const extrusionSettings = {
            depth: compartmentGeometry.height,
            steps: 10,
            bevelEnabled: false
        };

        super( shape, extrusionSettings );
        this.olivePolygon = shape;
    }
}

const silvertownCompartmentGeometry = silvertownProjectData[0].scenarios[0].structures[0].compartments[0].geometry;

const extrusion = new OliveBufferGeometry(silvertownCompartmentGeometry);
// console.log(extrusion);



class OliveMesh extends THREE.Mesh {

    constructor(compartment) {

        const geometry = new OliveBufferGeometry( compartment.geometry );

        const zPosition = compartment.geometry.points[0].z;
        // const zPosition = compartment.geometry[0].z;

        const material = new THREE.MeshLambertMaterial({
            color: '#D40000'
        });

        super(geometry, material);
        this.position.set(0, 0, zPosition);
        this.name = compartment.structureId;
        this.compartmentId = compartment.id;
        console.log(this);
    }
}


const silvertownCompartment = silvertownProjectData[0].scenarios[0].structures[0].compartments[0];

const compartmentMesh = new OliveMesh( silvertownCompartment );
// console.log(compartmentMesh);



class OliveBuilder {

    constructor(scenario) {

        scenario.structures.forEach( structure => {

            structure.compartments.forEach(compartment => {

                const compartmentMesh = new OliveMesh(compartment);

                return compartmentMesh;
            });
        });
    }
}