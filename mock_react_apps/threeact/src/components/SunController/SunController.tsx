import React, { FC, useEffect, useState, useRef } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import {
    Mesh,
    DirectionalLight,
    CameraHelper,
    Vector3,
    Object3D,
} from "three";
import { addGUIControls } from "../../utils/guiControls";

const SunController: FC<ReactThreeFiber.Object3DNode<
    Mesh,
    typeof Mesh
>> = () => {
    const DISTANCE = 700;
    const initialPosition = new Vector3(0, 50, -DISTANCE);
    const { x, y, z } = initialPosition;

    const sun = useRef(new Mesh());

    const light = useRef(new DirectionalLight(0xffffff, 1));

    const [cameraHelper, setCameraHelper] = useState(
        new CameraHelper(light.current.shadow.camera)
    );

    const effectController = {
        inclination: 0.49,
        azimuth: 0.25,
    };

    const handleChange = () => {
        const theta = Math.PI * (effectController.inclination - 0.5);
        const phi = 2 * Math.PI * (effectController.azimuth - 0.5);

        const inclineAzimuth = (mesh: Object3D) => {
            mesh.position.x = DISTANCE * Math.cos(phi);
            mesh.position.y = DISTANCE * Math.sin(phi) * Math.sin(theta);
            mesh.position.z = DISTANCE * Math.sin(phi) * Math.cos(theta);
        };

        inclineAzimuth(sun.current);
        inclineAzimuth(light.current);
    };

    useEffect(() => {
        sun.current.position.set(x, y, z);
        light.current.position.set(x, y, z);

        const lightCamera = light.current.shadow.camera;

        lightCamera.near = 1;
        lightCamera.far = 2000;
        lightCamera.left = -500;
        lightCamera.bottom = -500;
        lightCamera.right = 500;
        lightCamera.top = 500;

        light.current.castShadow = true;

        light.current.shadow.mapSize.width = 2048;
        light.current.shadow.mapSize.height = 2048;

        addGUIControls(effectController, handleChange);

        setCameraHelper(new CameraHelper(light.current.shadow.camera));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <directionalLight ref={light} />
            <mesh ref={sun} >
                <sphereBufferGeometry attach="geometry" args={[50, 30, 30]} />
                <meshBasicMaterial attach="material" color="yellow" />
            </mesh>
            <primitive object={cameraHelper} />
        </>
    );
};

export default SunController;
