// Function that create and return the THREE mesh
function createCube() {
    const geometry = new THREE.BoxGeometry(300, 300, 300);
    const material = new THREE.MeshLambertMaterial({
        color: "#BADA55"
    })
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.recieveShadow = true;
    return mesh;
};




function createPrism() {
    const geometry = new THREE.BoxGeometry(200, 800, 2000);
    const material = new THREE.MeshLambertMaterial({
        color: "#4d0000"
    })
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.recieveShadow = true;
    return mesh;
};




function createLight() {
    const light = new THREE.DirectionalLight("#FFFFFF", 1.8); // color, brightness
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
};

function createAmbientLight() {
    const light = new THREE.AmbientLight( 0x404040  );
    
    return light;
};


function createExtrusion(length, width, height) {
    const shape = new THREE.Shape();
    shape.moveTo( 0, 0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 20,
        depth: height,
        bevelEnabled: true,
        // bevelThickness: 1,
        // bevelSize: 1,
        // bevelOffset: 0,
        // bevelSegments: 1
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshLambertMaterial({
        color: "brown"
    });
    const mesh = new THREE.Mesh( geometry, material );

    return mesh;
};




function extrudePolygon(polygon, height) {
    const shape = new THREE.Shape();
    shape.moveTo(polygon[0].X, polygon[0].Y);
    polygon.forEach( vertice => shape.lineTo( vertice.X, vertice.Y ));
    
    const extrudeSettings = {
        steps: 20,
        depth: height,
        bevelEnabled: false,
        // bevelThickness: 1,
        // bevelSize: 1,
        // bevelOffset: 0,
        // bevelSegments: 1
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshLambertMaterial({
        color: "#D40000"
    });
    const mesh = new THREE.Mesh( geometry, material );

    return mesh;
}



function createTowerShape( points ) {

    const vector2Arr = [];

    // points.reverse();

    points.forEach( point => {
        vector2Arr.push( new THREE.Vector2( point.x, point.y ) );
    });

    const shape = new THREE.Shape( vector2Arr );

    return shape;
};


function createTowerGeometry( geometry ) {

    // const shape = createTowerShape( geometry );
    const shape = createTowerShape( geometry.points );

    const options = {
        depth: geometry.height,
        steps: 1,
        bevelEnabled: false
    }
    
    const geom = new THREE.ExtrudeBufferGeometry( shape, options );

    return geom;
};


function createTowerMesh( compartment ) {

    const geom = createTowerGeometry( compartment.geometry );

    const material = new THREE.MeshLambertMaterial({
        color: '#D40000',
        transparent: true,
        opacity: 0.8
    });

    const mesh = new THREE.Mesh( geom, material );
    // mesh.position.set(0, 0, compartment.geometry[ 0 ].z)
    mesh.position.set(0, 0, compartment.geometry.points[ 0 ].z)

    console.log(mesh);
    

    return mesh;
};



function buildTower(structure, threeboxFn, coords, options) {

    // structure.forEach( compartment => {
    structure.compartments.forEach( compartment => {

        const mesh = createTowerMesh( compartment );

        threeboxFn(mesh, coords, options);
    });
};

