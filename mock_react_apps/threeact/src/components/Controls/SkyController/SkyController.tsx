import React, { FC, useRef, useEffect, useState } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import {
    Mesh,
    DirectionalLight,
    DirectionalLightHelper,
    CameraHelper,
    BoxGeometry,
    MeshLambertMaterial,
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
    const cube = new Mesh(
        new BoxGeometry(30, 30, 30),
        new MeshLambertMaterial({ color: "purple" })
    )

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
            cube
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
            <primitive object={cube} position={[0, 50, -700]} />
            <primitive object={cameraHelper} />
            <primitive object={lightHelper} />
        </>
    );
};

export default SkyController;
