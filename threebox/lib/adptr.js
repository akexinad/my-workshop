class OlivePoint extends THREE.Vector3 {

    constructor( x, y, z, srid ) {

        super( x, y, z );

        this.srid = srid;

    }

}

const silvertownPoint = silvertownProjectData[0].scenarios[0].structures[0].compartments[6].geometry.points[3];
const point = new OlivePoint(silvertownPoint.x, silvertownPoint.y, silvertownPoint.z, silvertownPoint.srid);
console.log(point);



class OlivePolygon extends THREE.Shape {

    constructor( geometryPoints ) {

        const olivePoints = [];
        const vector2Array = [];

        geometryPoints.forEach( point => {
            olivePoints.push( new OlivePoint( point.x, point.y, point.z, point.srid ) );
        });
        
        geometryPoints.forEach( point => {
            vector2Array.push( new THREE.Vector2( point.x, point.y ) );
        });
        
        super( vector2Array );

        this.olivePoints = olivePoints;

    }

}

const polygon = new OlivePolygon(polygon1);
console.log(polygon);


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



class OliveCompartment extends THREE.Mesh {

    constructor( compartment ) {

        const geometry = new OliveBufferGeometry( compartment.geometry );

        const zPosition = compartment.geometry.points[ 0 ].z;

        const material = new THREE.MeshStandardMaterial({
            color: '#D40000',
            transparent: true,
            opacity: 1
        });

        super( geometry, material );

        this.position.set( 0, 0, zPosition );
        this.compartmentId = compartment.id;

    }

}


const silvertownCompartment = silvertownProjectData[0].scenarios[0].structures[0].compartments[0];

const compartmentMesh = new OliveCompartment( silvertownCompartment );
console.log(compartmentMesh);



class OliveWorld {

    constructor( tb, projectData ) {

        this.tb = tb;
        this.projectData = projectData;
        this.createTBObject3D = createTBObject3D;
        
        function createTBObject3D( obj, coordinates, z ) {
            
            obj = this.tb.Object3D({
                obj,
                units: 'meters'
            })
            .setCoords( coordinates )
            .set({ 
                rotation: {
                    x: 0, y: 0, z
                }
            });
            
            tb.add(obj);
            
        }

    }

    renderScenario( index, coordinates, zRotation ) {

        
        if ( this.projectData[ 0 ].scenarios[ index ] === undefined ) {
            throw new Error( `There is no scenario with index ${ index }` );
        }

        const scenario = this.projectData[ 0 ].scenarios[ index ];

        scenario.structures.forEach( structure => {

            structure.compartments.forEach( compartment => {

                compartment = new OliveCompartment( compartment );

                this.createTBObject3D( compartment, coordinates, zRotation );
                
            });
            
        });

    }
    
}