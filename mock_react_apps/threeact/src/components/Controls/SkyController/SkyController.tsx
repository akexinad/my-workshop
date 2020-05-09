import React, { FC, useRef, useEffect, useState } from "react";
import { ReactThreeFiber, useFrame } from "react-three-fiber";
import { Mesh, DirectionalLight, CameraHelper, Vector3, Object3D } from "three";
import { Sky } from "../../../../node_modules/three/examples/jsm/objects/Sky";

import { addGUIControls } from "../../../utils/guiControls";

const SkyController: FC<ReactThreeFiber.Object3DNode<
    Mesh,
    typeof Mesh
>> = () => {
    const DISTANCE = 700;
    const initialPosition = new Vector3(0, 50, -DISTANCE);
    const { x, y, z } = initialPosition;

    const sky = useRef<Sky>(new Sky());
    const sunSphere = useRef<Mesh>(new Mesh());
    const light = useRef<DirectionalLight>(new DirectionalLight(0xffffff, 1));

    const [cameraHelper, setCameraHelper] = useState(
        new CameraHelper(light.current.shadow.camera)
    );

    var effectController = {
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.0033, // elevation / inclination
        azimuth: 0.25, // Facing front,
        sun: !true,
    };

    const handleChange = () => {
        const uniforms = sky.current.material.uniforms;

        uniforms["turbidity"].value = effectController.turbidity;
        uniforms["rayleigh"].value = effectController.rayleigh;
        uniforms["mieCoefficient"].value = effectController.mieCoefficient;
        uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
        uniforms["luminance"].value = effectController.luminance;

        const theta = Math.PI * -(effectController.inclination - 0.5);
        const phi = 2 * Math.PI * -(effectController.azimuth - 0.5);

        const inclineAzimuth = (object: Object3D) => {
            object.position.x = DISTANCE * Math.cos(phi);
            object.position.y = DISTANCE * Math.sin(phi) * Math.sin(theta);
            object.position.z = DISTANCE * Math.sin(phi) * Math.cos(theta);
        };

        inclineAzimuth(sunSphere.current);
        inclineAzimuth(light.current);

        sunSphere.current.visible = effectController.sun;

        uniforms["sunPosition"].value.copy(sunSphere.current.position);
    };

    useFrame(() => {
        sky.current.scale.setScalar(2500);
        sky.current.castShadow = true;
        sky.current.material.uniforms.up.value = new Vector3(0, 0, 1);
    });

    useEffect(() => {
        sunSphere.current.position.set(x, y, z);
        light.current.position.set(x, y, z);

        const { camera } = light.current.shadow;

        camera.near = 1;
        camera.far = 2000;
        camera.left = -500;
        camera.bottom = -500;
        camera.right = 500;
        camera.top = 500;

        light.current.castShadow = true;

        light.current.shadow.mapSize.width = 2048;
        light.current.shadow.mapSize.height = 2048;

        addGUIControls(effectController, handleChange);

        setCameraHelper(new CameraHelper(light.current.shadow.camera));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <primitive ref={sky} object={sky.current} />
            <mesh ref={sunSphere}>
                <sphereBufferGeometry attach="geometry" args={[50, 30, 30]} />
                <meshBasicMaterial attach="material" color="yellow" />
            </mesh>
            <directionalLight
                ref={light}
                position={sunSphere.current.position}
            />
            <primitive object={cameraHelper} />
        </>
    );
};

export default SkyController;
