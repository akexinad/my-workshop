"use strict";
function createRenderer() {
    // Where will the user see the 3d world
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Set the beackground color
    renderer.setClearColor("white"); // Eigengrau
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio); // For Retina screens
    const output = document.querySelector("#output");
    output.appendChild(renderer.domElement);
    // console.log(renderer);
    return renderer;
}
function createScene() {
    const scene = new THREE.Scene();
    return scene;
}
function createCamera(scene) {
    const camera = new THREE.PerspectiveCamera(45, // Field of View
    window.innerWidth / window.innerHeight, // ratio
    0.1, // near value (Macro)
    1000 // far value (Horizon)
    );
    // camera.position.x = -30; // left to right // Left 30
    // camera.position.y = 40; // top to bottom // Up 40
    // camera.position.z = 30; // Front to Back // Back 30
    camera.position.x = -30; // left to right // Left 30
    camera.position.y = 30; // top to bottom // Up 40
    camera.position.z = 40; // Front to Back // Back 30
    camera.lookAt(scene.position);
    return camera;
}
function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(100);
    return axesHelper;
}
function createLight() {
    const pointLight = new THREE.PointLight("#FFFFFF", 1.3);
    pointLight.position.x = 4;
    pointLight.position.y = 18;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    return pointLight;
}
function createLight() {
    const pointLight = new THREE.PointLight("#FFFFFF", 1.3);
    pointLight.position.x = 4;
    pointLight.position.y = 18;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    return pointLight;
}
function createLightHelper(light) {
    const helper = new THREE.PointLightHelper(light);
    return helper;
}
function addOrbitControls(camera, renderer) {
    // console.log(camera, renderer);
    new THREE.OrbitControls(camera, renderer.domElement);
}
function buffGeom() {
    const geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array([
        -10.0, -10.0, 10.0,
        10.0, -10.0, 10.0,
        10.0, 10.0, 10.0,
        10.0, 10.0, 10.0,
        -10.0, 10.0, 10.0,
        -10.0, -10.0, 10.0
    ]);
    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
const bufferGeom = buffGeom();
const renderer = createRenderer();
const scene = createScene();
const camera = createCamera(scene);
const axes = createAxesHelper();
const light = createLight();
const lightHelper = createLightHelper(light);
scene.add(axes, light, lightHelper, bufferGeom);
addOrbitControls(camera, renderer);
// renderer.render(scene, camera);
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
renderer.render(scene, camera);
// animate();
