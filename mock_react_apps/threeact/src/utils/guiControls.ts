import { GUI } from "dat.gui";
import { Sky } from "three/examples/jsm/objects/Sky";
import { Mesh, Scene, Camera, WebGLRenderer, DirectionalLight } from "three";

const DISTANCE = 400000;

const addGUIControls = (
    sky: Sky,
    sunSphere: Mesh,
    light: DirectionalLight,
    renderer: WebGLRenderer,
    scene: Scene,
    camera: Camera
) => {
    const gui = new GUI();

    sky.scale.setScalar(450000);
    sky.castShadow = true;
    sky.receiveShadow = true;

    sunSphere.position.y = -700000;

    light.position.y = -700000;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    const lightCamera = light.shadow.camera;

    lightCamera.near = 1;
    lightCamera.far = 200000;
    lightCamera.left = -5000;
    lightCamera.bottom = -500;
    lightCamera.right = 500;
    lightCamera.top = 500;

    light.castShadow = true;

    const effectController = {
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.49, // elevation / inclination
        azimuth: 0.25, // Facing front,
    };

    const guiChanged = () => {
        const uniforms = sky.material.uniforms;

        uniforms["turbidity"].value = effectController.turbidity;
        uniforms["rayleigh"].value = effectController.rayleigh;
        uniforms["mieCoefficient"].value = effectController.mieCoefficient;
        uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
        uniforms["luminance"].value = effectController.luminance;

        const theta = Math.PI * (effectController.inclination - 0.5);
        const phi = 2 * Math.PI * (effectController.azimuth - 0.5);

        sunSphere.position.x = DISTANCE * Math.cos(phi);
        sunSphere.position.y = DISTANCE * Math.sin(phi) * Math.sin(theta);
        sunSphere.position.z = DISTANCE * Math.sin(phi) * Math.cos(theta);

        light.position.x = DISTANCE * Math.cos(phi);
        light.position.y = DISTANCE * Math.sin(phi) * Math.sin(theta);
        light.position.z = DISTANCE * Math.sin(phi) * Math.cos(theta);

        uniforms["sunPosition"].value.copy(sunSphere.position);

        renderer.render(scene, camera);
    };

    sunSphere.position.set(0, -700000, 0);
    light.position.set(0, -700000, 0);
    sunSphere.visible = false;

    gui.add(effectController, "turbidity", 1.0, 20.0, 0.1).onChange(guiChanged);
    gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
    gui.add(effectController, "mieCoefficient", 0.0, 0.1, 0.001).onChange(
        guiChanged
    );
    gui.add(effectController, "mieDirectionalG", 0.0, 1, 0.001).onChange(
        guiChanged
    );
    gui.add(effectController, "luminance", 0.0, 2).onChange(guiChanged);
    gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(guiChanged);
    gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);

    guiChanged();
};

export default addGUIControls;
