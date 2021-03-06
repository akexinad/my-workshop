// import SunCalc from "suncalc";

// RENDERER ///////////////////

const scene = new THREE.Scene();

const createRenderer = () => {
    const canvas = document.getElementById("c");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    return renderer;
};

// CAMERA /////////////////////

const createCamera = (scene) => {
    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );
    camera.position.set(0, 0, 200);

    camera.lookAt(scene);

    camera.up = new THREE.Vector3(0, 0, 1);

    return camera;
};

// AXES HELPER ///////////////////

const createAxesHelper = () => {
    const axesHelper = new THREE.AxesHelper(10);

    axesHelper.rotateX(Math.PI / -2);

    return axesHelper;
};

// SKY /////////////////////////////

const createSky = () => {
    const sky = new SphereSky();
    sky.scale.setScalar(2500);
    sky.castShadow = true;

    return sky;
};

// DIRECTIONAL LIGHT ////////////////////////

const createDirectionalLight = () => {
    const light = new THREE.DirectionalLight(0xffffff, 1);

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = -50;
    light.shadow.camera.bottom = -50;
    light.shadow.camera.right = 50;
    light.shadow.camera.top = 50;

    light.castShadow = true;

    light.position.set(100, 100, 100);

    return light;
};

const createPlane = () => {
    const img = "./img/siena.png";
    const loader = new THREE.TextureLoader();

    const geometry = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
    const material = new THREE.MeshLambertMaterial({
        map: loader.load(img)
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
};

const createTextureBox = () => {
    const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
    /*
     * MeshBasicMaterial can cast shadows but it cannot recieve shadows
     */
    const material = new THREE.MeshLambertMaterial({
        color: "red"
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.recieveShadow = true;
    mesh.position.set(10, 10, 10);

    mesh.rotateZ(Math.PI / 5);

    return mesh;
};

const renderer = createRenderer();

const calculateSunPosition = () => {
    const distance = 400;
    const latLng = [-33.86503, 151.20221];
    const [lat, lng] = latLng;

    const inclineAzimuth = (object) => {
        const time = new Date("12/01/2020");

        console.log("time", time);

        const position = SunCalc.getPosition(
            moment(time).add(10, "h"),
            lat,
            lng
        );

        const alpha =
            Math.cos(position.altitude) *
            Math.cos(Math.PI / 2 + position.azimuth);

        const theta =
            Math.cos(position.altitude) *
            Math.sin(Math.PI / 2 + position.azimuth);

        const gamma = Math.sin(position.altitude);

        object.position.set(
            // X
            distance * alpha,
            // Y
            -distance * theta,
            // Z
            distance * gamma
        );
    };

    inclineAzimuth(light);

    sky.material.uniforms.sunPosition.value.copy(light.position);
};

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
const sky = createSky();
const light = createDirectionalLight();
const plane = createPlane();
const axesHelper = createAxesHelper();
const textureBox = createTextureBox();
const camera = createCamera(scene);
const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
new THREE.OrbitControls(camera, renderer.domElement);

let sunPivot = new THREE.Object3D();
sunPivot.add(light);

const rotateSun = () => {
    sunPivot.rotateZ(0.005);
    light.getWorldPosition(sky.material.uniforms.sunPosition.value);
};

scene.add(
    // the light has been added to the sun pivot
    sunPivot,
    axesHelper,
    cameraHelper,
    sky,
    plane,
    textureBox,
    ambientLight
);

calculateSunPosition();

function animate() {
    requestAnimationFrame(animate);
    // rotateSun();
    renderer.render(scene, camera);
}

animate();
