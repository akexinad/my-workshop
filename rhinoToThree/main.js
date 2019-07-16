// BEGINNING WITH THE BASIC THREE JS NECESSITIES.
// RENDERER SCENE AND CAMERA

// 1. RENDERER
function createRenderer() {
    // This is where the user will see the 3d world.
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Background color
    renderer.setClearColor('#31a931');

    // Set shadows on rendered objects.
    renderer.shadowMap.enabled = true;

    // appending the renderer to the correct dom element.
    const output = document.querySelector("#output");
    output.appendChild(renderer.domElement);
    return renderer;
}

// 2. THE SCENE
function createScene() {
    const scene = new THREE.Scene();
    return scene;
}

// 3. THE CAMERA
function createCamera(scene) {
    const camera = new THREE.PerspectiveCamera(
        45, // Field of View
        window.innerWidth / window.innerHeight, // ratio
        0.1, // near value (Macro)
        1000 // far value (Horizon)
    );

    camera.position.x = -350;
    camera.position.y = 250;
    camera.position.z = 40;
    camera.lookAt(scene.position);
    return camera;
}

// 4. DISPLAY AN AXES
function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(100);
    return axesHelper;
}

// 5. BUILD A FLOOR
function createFloor() {
    // What do you want the floor to be made of.
    const floorMaterial = new THREE.MeshLambertMaterial({
        color: "white"
    });

    // The floor shape.
    const floorGeometry = new THREE.BoxGeometry(200, 0.1, 200); // WIDTH, HEIGHT, DEPTH

    // To create the mesh, you need to combine the floor's [shape] geometry with the material material with which it is made.
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    
    // Now the floor's position in the scene relative to the axes
    floor.position.x = 20;
    floor.recieveShadow = true;
    return floor;
}

function createLight() {
    const pointLight = new THREE.PointLight("#FFFFFF", 2); // color, brightness
    pointLight.position.x = -200;
    pointLight.position.y = 250;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    return pointLight;
}

// The light helper displays a meshed diamond to HELP YOU see the light source
function createLightHelper(light) {
    const helper = new THREE.PointLightHelper(light);
    return helper;
}

// Here you store the complete model inside a variable which then you can add as a parameter to scene.add().
// const building = buildBIMeshWithProperties(buildingData); 

const schema = buildModel(buildingData);

function addOrbitControls(camera, renderer) {
    new THREE.OrbitControls(camera, renderer.domElement);
}

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera(scene);
const axes = createAxesHelper();
const floor = createFloor();
const light = createLight();
const lightHelper = createLightHelper(light);

scene.add(axes, floor, schema, light, light, lightHelper);

addOrbitControls(camera, renderer);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
// renderer.render(scene, camera);