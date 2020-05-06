import React, { FC, useRef, useEffect, useState } from "react";
import { ReactThreeFiber, useThree } from "react-three-fiber";
import {
    Mesh,
    DirectionalLight,
    DirectionalLightHelper,
    CameraHelper,
} from "three";
import { Sky } from "../../../../node_modules/three/examples/jsm/objects/Sky";

import addGUIControls from "../../../utils/guiControls";

const SkyController: FC<ReactThreeFiber.Object3DNode<
    Mesh,
    typeof Mesh
>> = () => {
    const { gl, scene, camera } = useThree();
    const sky = useRef<Sky>(new Sky());
    const sunSphere = useRef<Mesh>(new Mesh());
    const light = useRef<DirectionalLight>(new DirectionalLight(0xffffff, 1));

    const [lightHelper, setlightHelper] = useState(
        new DirectionalLightHelper(light.current)
    );
    const [cameraHelper, setCameraHelper] = useState(
        new CameraHelper(light.current.shadow.camera)
    );

    useEffect(() => {
        addGUIControls(
            sky.current,
            sunSphere.current,
            light.current,
            gl,
            scene,
            camera
        );

        setlightHelper(new DirectionalLightHelper(light.current));
        setCameraHelper(new CameraHelper(light.current.shadow.camera));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <primitive
                ref={sky}
                object={sky.current}
            />
            <mesh ref={sunSphere}>
                <sphereBufferGeometry attach="geometry" args={[20000, 16, 8]} />
                <meshBasicMaterial attach="material" color={0xffffff} />
            </mesh>
            <directionalLight ref={light} />
            <primitive object={cameraHelper} />
            <primitive object={lightHelper} />
        </>
    );
};

export default SkyController;
