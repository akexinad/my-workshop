/*

- The JSON data of the buildings is generated in a CAD program called Rhino.
- This data is then stored in AWS, which is then fetched by the client.
- In order to render the data understandable to THREE.js, some functions made by Tony and Maulik were created in order to mutate the Rhino-JSON data into THREE.js geometry.
- Below are the two functions that do all the work in mutating the Rhino-generated JSON data.

- It is important to note that some of the variable names have been altered in order to accomodate the way the data is being displayed for the sake of this example.

*/

console.log(buildingData);

// This function mutates the Rhino-JSON data and returns THREE.js geometry.
function buildGeometry(buildingData) {
    
    // This conditional statement can be ignored for the sake of the understanding the functionality.

    // if(geometryData.geoJson !== undefined){
    //     geomData = geometryData.geoJson;
    //     vertices = JSON.parse(geometryData.geoJson).Vertices;
    //     faces = JSON.parse(geometryData.geoJson).faces;

    //     this.projectValues.projIRR += Number(JSON.parse(geometryData.caJson).ProjectIRR);
    //     this.projectValues.projhar += Number(JSON.parse(geometryData.caJson).Affordable_Housing_Ratio);
    //     this.projectValues.projmoc += Number(JSON.parse(geometryData.caJson).ProjectMoc);
    // }
    // else{
        //     geomData = geometryData.geom;
        //     vertices = geomData.vertices;
    //     faces = geomData.faces;
    // }

    
    const vertices = buildingData.geom.vertices;
    const faces = buildingData.geom.faces;
    const geometry = new THREE.Geometry();
    
    // the geometry vertices and faces from the original data are looped through and mutated to accomodate the face and vertex properties in THREE.geometry.
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

    console.log(geometry);
    
    return geometry;
}

// This function calls the above function, stores the returned geometry in a variable called geometry, and finally returns the mesh which then can be added to the THREE.js scene.
function buildBIMeshWithProperties(buildingData) {
    const geometry = buildGeometry(buildingData);
    const material = new THREE.MeshLambertMaterial({
        color: "#D40000"
    });
    const mesh = new THREE.Mesh(geometry, material);

    // The position and rotation was hard coded so it qould appear at the center of the camera. It does not beling to the source code.
    mesh.position.set(-350, 170, -200);
    mesh.rotation.x = Math.PI / 2;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    console.log(mesh);
    
    return mesh;
}

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