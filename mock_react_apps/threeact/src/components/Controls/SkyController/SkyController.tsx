import React, { FC, useRef, useEffect, useState } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import {
    Mesh,
    DirectionalLight,
    DirectionalLightHelper,
    CameraHelper,
} from "three";
import { Sky } from "../../../../node_modules/three/examples/jsm/objects/Sky";

import initSkyControls from "../../../utils/skyControls";

const SkyController: FC<ReactThreeFiber.Object3DNode<
    Mesh,
    typeof Mesh
>> = () => {
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

        initSkyControls(
            sky.current,
            light.current,
        );

        setlightHelper(new DirectionalLightHelper(light.current));
        setCameraHelper(new CameraHelper(light.current.shadow.camera));
    }, []);

    return (
        <>
            <primitive
                ref={sky}
                object={sky.current}
            />
            <directionalLight ref={light} position={sunSphere.current.position} />
            <primitive object={cameraHelper} />
            <primitive object={lightHelper} />
        </>
    );
};

export default SkyController;
