const createRenderer = () => {
    const canvas = document.getElementById("c");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: canvas
    });
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    return renderer;
};

const createCamera = (scene) => {
    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );
    camera.position.set(50, 50, 50);

    camera.lookAt(scene);

    return camera;
};

const createDirectionalLight = () => {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 100, 0);
    // light.target.position.set(300, 400, 200);

    // Sharpness of the shadow
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    /**
     * Where the shadow is actually visible.
     * With the light helper you will see a yellow cuve. This box determines
     * where exactly the shadow will be visible. This is so you can taylor
     * exactly where you want to show shadow and improve performance.
     */
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
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
        color: "#FFC0CB"
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.recieveShadow = true;
    return mesh;
};

const createSphere = () => {
    const geometry = new THREE.SphereGeometry(4, 50, 50);
    const material = new THREE.MeshLambertMaterial({ color: "red" });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
};

const createPlane = () => {
    const geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: "green"
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -5;

    return mesh;
};

const textureLoader = (img) => {
    const loader = new THREE.TextureLoader();

    return loader.load(img);
};

const img = "https://threejsfundamentals.org/threejs/resources/images/wall.jpg";
const img2 = "./img/map_plane.png";
const img3 = "./img/siena.png";

const createTextureBox = (img) => {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    /*
     * MeshBasicMaterial can cast shadows but it cannot recieve shadows
     */
    const material = new THREE.MeshLambertMaterial({
        map: textureLoader(img)
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.recieveShadow = true;
    mesh.position.set(-10, 10, -10);

    return mesh;
};

const createTexturePlane = (img) => {
    const geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        map: textureLoader(img)
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.receiveShadow = true;
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
    y: 9,
    z: 1
});
// const plane = createPlane();
const texturePlane = createTexturePlane(img3);
const textureBox = createTextureBox(img);

const scene = new THREE.Scene();
const camera = createCamera(scene);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

scene.add(
    light,
    lightHelper,
    cameraHelper,
    sphere,
    rectangle,
    // plane,
    texturePlane,
    textureBox
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
