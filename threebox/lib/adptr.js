class OlivePoint extends THREE.Vector3 {

    constructor( x, y, z, srid ) {

        super(x, y, z);
        this.srid = srid;
    }
}

const point = new OlivePoint(3, 4, 5, 4236);
console.log(point);



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
            color: 'grey',
            transparent: true,
            opacity: 100,
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

    constructor( tb, projectData ) {

        this.tb = tb;
        this.projectData = projectData;
        
        function createTBObject3D( obj, coordinates, z ) {
            
            obj = this.tb.Object3D({
                obj,
                units: 'meters'
            })
            .setCoords(coordinates)
            .set({ 
                rotation: {
                    x: 0, y: 0, z
                }
            });
            
            tb.add(obj);
            
        }

        this.createTBObject3D = createTBObject3D;

    }

    renderScenario( index, coordinates, zRotation ) {

        const scenario = this.projectData[ 0 ].scenarios[ index ];

        scenario.structures.forEach( structure => {

            structure.compartments.forEach( compartment => {

                compartment = new OliveMesh(compartment);

                this.createTBObject3D( compartment, coordinates, zRotation );
                
            });
            
        });

    }
    
}