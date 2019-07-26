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

        const verticesArray = [];
        
        geometryPoints.forEach( point => {
            verticesArray.push( new THREE.Vector2( point.x, point.y ) );
        });

        super(verticesArray);
        this.olivePoints = verticesArray;
    }
}

const polygon = new OlivePolygon(polygon1);
// console.log(polygon);


class OliveBufferGeometry extends THREE.ExtrudeBufferGeometry {

    constructor( compartmentGeometry ) {

        const shape = new OlivePolygon( compartmentGeometry.points );
        
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

        const material = new THREE.MeshStandardMaterial({
            color: 'green',
            transparent: true,
            opacity: 1,
            side: THREE.FrontSide
        });

        super(geometry, material);
        this.position.set(0, 0, zPosition);
        this.compartmentId = compartment.id;
    }
}


const silvertownCompartment = silvertownProjectData[0].scenarios[0].structures[0].compartments[0];

const compartmentMesh = new OliveMesh( silvertownCompartment );
// console.log(compartmentMesh);



class OliveWorld {

    constructor(scenario, threeboxFunction, coordinates) {

        const options = {
            rotation: {
                x: 0, y: 0, z: -180
            }
        }
        
        scenario.structures.forEach( structure => {

            structure.compartments.forEach(compartment => {

                const compartmentMesh = new OliveMesh(compartment);

                threeboxFunction(compartmentMesh, coordinates, options);
            });
        });
    }
}