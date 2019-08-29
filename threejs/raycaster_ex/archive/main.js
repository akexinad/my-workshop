function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor('white');

    renderer.shadowMap.enabled = true;

    const output = document.querySelector('#output');
    output.appendChild(renderer.domElement);
    return renderer;
}

function createScene() {
    const scene = new THREE.Scene();
    return scene;
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(
       45,
       window.innerWidth / window.innerHeight,
       0.1,
       1000
    );

    camera.position.x = -30;
    camera.position.y = 50;
    camera.position.z = 30;
    return camera;
}

function createFloor() {
    // What do you want the floor to be made of.
    const floorMaterial = new THREE.MeshLambertMaterial({
        color: "#0000ff"
    });

    // The floor shape.
    const floorGeometry = new THREE.BoxGeometry(60, 0.1, 20); // WIDTH, HEIGHT, DEPTH

    // To create the mesh, you need to combine the floor's [shape] geometry with the material material with which it is made.
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    
    // Now the floor's position in the scene relative to the axes
    floor.position.x = 20;
    floor.recieveShadow = true;
    return floor;
}

function createRectangle({ width, height, depth, x, y, z }) {
    console.log(width, height);

    // again, shape and material
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshLambertMaterial({
        color: "#d40000"
    });

    // and wrap the mesh
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.recieveShadow = true;
    return mesh;
}

function createLight() {
    const pointLight = new THREE.PointLight('#FFFFFF', 1.2);
    pointLight.position.x = 4;
    pointLight.position.y = 30;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    return pointLight;
}

function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(100);
    return axesHelper;
}

function createLightHelper(light) {
    const helper = new THREE.PointLightHelper(light);
    return helper;
}

function addOrbitControls(camera, renderer) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    return controls;
}

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera(scene);
const axes = createAxesHelper();
const floor = createFloor();
const rectangle = createRectangle({
    width: 10,
    height: 4,
    depth: 4,
    x: 10,
    y: 4,
    z: 4
});

const light = createLight();
const lightHelper = createLightHelper(light);












class Polygon extends THREE.Shape {

    constructor(polygonPointData) {
        let points = polygonPointData.map( vertex => new THREE.Vector3(vertex.X, vertex.Y, vertex.Z));
        super(points);
    }
}

const shape = new Polygon(polygonData);
console.log(shape);

let ptlist = shape.extractPoints();
console.log(ptlist);



class Extrusion extends THREE.ExtrudeBufferGeometry {

    constructor(shapes, height) {


        let options = {
            depth: height,
            steps: 1,
            bevelEnabled: false
            //optional settings
        };

        super(shapes, options);
        // super();
        // this.shapes = shape;
        // this.height = height;
        // super(shapes, height);
        // this.shapes = shapes;
        // this.height = height;
        

        
        // super(shapes, Extrusion.defaultOptions(height));
    }
    

}

const extrusion = new Extrusion(shape, 10);

console.log(extrusion);

class Compartment extends THREE.Mesh {

    constructor(extrusion) {
        let defaultMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 });
        super(extrusion, defaultMaterial);
    }
    
}

class Bed1 extends Compartment {

    constructor(polygonData, height) {
        super(extrusion);
        this.material.color = new THREE.Color(0xff0000);
    }
}

class Site extends THREE.Mesh {

    constructor(shape) {
        let geometry = THREE.ShapeBufferGeometry(shape);
        let defaultMaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff });
        super(geometry, defaultMaterial);
    }
}

// const compartment = new Compartment(extrusion);
const compartment = new Bed1(polygonData, 10);

console.log(compartment);




// Add axes to the scene, so renderer can render it within the scene.
scene.add(axes, light, lightHelper);

scene.add(compartment);


// const site = new Site(shape);
// scene.add(site);

// let shapebg = THREE.ShapeBufferGeometry(shape);
// console.log(shapebg);


console.log(scene);

// let options = {
//     depth: 5,
//     steps: 1
//     //optional settings
// };
// let custShape = new THREE.ExtrudeBufferGeometry(shape, options);
// let defaultMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
// let custMesh = THREE.Mesh(custShape, defaultMaterial);
// scene.add(custMesh, defaultMaterial);

addOrbitControls(camera, renderer);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

console.log(polygonData);


// renderer.render(scene, camera);
animate();
