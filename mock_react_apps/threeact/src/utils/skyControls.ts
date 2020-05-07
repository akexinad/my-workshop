import { GUI } from "dat.gui";
import { Sky } from "three/examples/jsm/objects/Sky";
import { DirectionalLight, Object3D, Vector3, Mesh } from "three";

const DISTANCE = 1000;

const initSkyControls = (
    sky: Sky,
    light: DirectionalLight,
    cube: Mesh
) => {
    const gui = new GUI();

    sky.scale.setScalar(2500);
    sky.castShadow = true;
    sky.material.uniforms.up.value = new Vector3( 0, 1, 0 );

    light.position.y = -1000;

    const { camera } = light.shadow;

    camera.near = 1;
    camera.far = 2000;
    camera.left = -500;
    camera.bottom = -500;
    camera.right = 500;
    camera.top = 500;

    light.castShadow = true;

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

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

        const inclineAzimuth = (mesh: Object3D) => {
            mesh.position.x = DISTANCE * Math.cos(phi);
            mesh.position.y = DISTANCE * Math.sin(phi) * Math.sin(theta);
            mesh.position.z = DISTANCE * Math.sin(phi) * Math.cos(theta);
        }

        inclineAzimuth(light);
        inclineAzimuth(cube);

        uniforms["sunPosition"].value.copy(light.position);
    };

    light.position.set(0, -7000, 0);

    gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(guiChanged);
    gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);

    guiChanged();
};

export default initSkyControls;
