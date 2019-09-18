function buildModel(buildingData) {
    const vertices = buildingData.geom.vertices;
    const faces = buildingData.geom.faces;
    const geometry = new THREE.Geometry();
    const material = new THREE.MeshLambertMaterial({
        color: "#D40000"
    });

    for (let i = 2; i < vertices.length; i += 3) {
        geometry.vertices.push(new THREE.Vector3(vertices[i - 2], vertices[i - 1], vertices[i]));
    }
    
    if (faces) {
        let k = 0;
        while (k < faces.length) {
            // QUAD FACE
            if (faces[k] == 1) {
                geometry.faces.push(new THREE.Face3(faces[k + 1], faces[k + 2], faces[k + 3]));
                geometry.faces.push(new THREE.Face3(faces[k + 1], faces[k + 3], faces[k + 4]));
                k += 5;
            } else if (faces[k] == 0) {
                geometry.faces.push(new THREE.Face3(faces[k + 1], faces[k + 2], faces[k + 3]));
                k += 4;
            } else {
                break;
            }
        }
    }
    
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-350, 170, -200);
    mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
};