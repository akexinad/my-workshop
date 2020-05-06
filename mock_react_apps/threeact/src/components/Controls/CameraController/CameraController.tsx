import React, { FC } from "react";
import { useEffect, useRef } from "react";
import { useThree, ReactThreeFiber } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PerspectiveCamera } from "three";

const CameraController: FC<ReactThreeFiber.Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>> = (props) => {

    const perspectiveCamera = useRef(
        new PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
        )
    );

    const {
        setDefaultCamera,
        gl: { domElement },
    } = useThree();

    useEffect(() => {
        setDefaultCamera(perspectiveCamera.current);

        perspectiveCamera.current.position.set(0, 100, 400);
        
        const controls = new OrbitControls(
            perspectiveCamera.current,
            domElement
        );

        return () => controls.dispose();
    }, [domElement, setDefaultCamera]);

    return <perspectiveCamera ref={perspectiveCamera} {...props} />;
};

export default CameraController;
