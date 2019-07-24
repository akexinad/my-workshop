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
    const pointLight = new THREE.DirectionalLight("#FFFFFF", 1.8); // color, brightness
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    return pointLight;
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