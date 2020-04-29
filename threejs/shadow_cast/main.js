const createRenderer = () => {
    const canvas = document.getElementById("c");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: canvas,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return renderer;
};

const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );
    camera.position.set(0, 50, 100);

    return camera;
};

const createDirectionalLight = () => {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 100, 22);
    // light.target.position.set(300, 400, 200);

    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 5000;
    light.shadow.camera.left = -50;
    light.shadow.camera.bottom = -50;
    light.shadow.camera.right = 50;
    light.shadow.camera.top = 50;

    light.castShadow = true;

    return light;
};

const createRectangle = ({ width, height, depth, x, y, z }) => {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshLambertMaterial({
        color: "#FFC0CB",
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.recieveShadow = true;
    return mesh;
};

const createSphere = () => {
    const geometry = new THREE.SphereGeometry(4, 20, 30);
    const material = new THREE.MeshLambertMaterial({ color: "red" });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
};

const createPlane = () => {
    const geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: "green",
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -5;

    return mesh;
};

const renderer = createRenderer();

const light = createDirectionalLight();
const lightHelper = new THREE.DirectionalLightHelper(light, 5);
const cameraHelper = new THREE.CameraHelper(light.shadow.camera);

const sphere = createSphere();
const rectangle = createRectangle({
    width: 10,
    height: 4,
    depth: 4,
    x: 10,
    y: 4,
    z: 4,
});
const plane = createPlane();

const camera = createCamera();
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();

scene.add(light, lightHelper, cameraHelper, sphere, rectangle, plane);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
