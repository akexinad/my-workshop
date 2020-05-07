const createRenderer = () => {
    const canvas = document.getElementById("c");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas
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
        3000
    );
    camera.position.set(-61, -204, 18);

    camera.lookAt(scene);

    camera.up = new THREE.Vector3(0, 0, 1);

    return camera;
};

const createAxesHelper = () => {
    const axesHelper = new THREE.AxesHelper(10);

    axesHelper.up = new THREE.Vector3(0, 0, 1);

    return axesHelper;
};

const createSky = () => {
    const sky = new Sky();
    sky.scale.setScalar(4500);
    sky.material.uniforms.up.value.set(0, 0, 1);
    // sky.DefaultUp = new THREE.Vector3(0, 0, 1);
    return sky;
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
    // mesh.rotation.x = -Math.PI / 2;
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
    // mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -5;

    return mesh;
};

const renderer = createRenderer();

const sky = createSky();

// Add Sun Helper
sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20000, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
sunSphere.position.y = -700000;
sunSphere.visible = false;

/// GUI

var effectController = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.0033, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: !true
};

var distance = 400000;

function guiChanged() {
    var uniforms = sky.material.uniforms;

    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
    uniforms["luminance"].value = effectController.luminance;

    var theta = Math.PI * -(effectController.inclination - 0.5);
    var phi = 2 * Math.PI * -(effectController.azimuth - 0.5);

    sunSphere.position.x = distance * Math.cos(phi);
    sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
    sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

    sunSphere.visible = effectController.sun;

    uniforms["sunPosition"].value.copy(sunSphere.position);

    // renderer.render(scene, camera);
}

var gui = new dat.GUI();

gui.add(effectController, "turbidity", 1.0, 20.0, 0.1).onChange(guiChanged);
gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
gui.add(effectController, "mieCoefficient", 0.0, 0.1, 0.001).onChange(
    guiChanged
);
gui.add(effectController, "mieDirectionalG", 0.0, 1, 0.001).onChange(
    guiChanged
);
gui.add(effectController, "luminance", 0.0, 2).onChange(guiChanged);
gui.add(effectController, "inclination", -0.2, 1.2, 0.0001).onChange(
    guiChanged
);
gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
gui.add(effectController, "sun").onChange(guiChanged);

guiChanged();

const light = createDirectionalLight();
const lightHelper = new THREE.DirectionalLightHelper(light, 5);
const cameraHelper = new THREE.CameraHelper(light.shadow.camera);

const sphere = createSphere();

const texturePlane = createTexturePlane(img3);
const textureBox = createTextureBox(img);

const scene = new THREE.Scene();
const camera = createCamera(scene);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

scene.add(
    createAxesHelper(),
    sky,
    light,
    // lightHelper,
    // cameraHelper,
    sphere,
    createPlane(),
    // texturePlane,
    textureBox,
    sunSphere
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
