import React, { FC } from "react";
import { useEffect, useRef } from "react";
import { useThree, ReactThreeFiber } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PerspectiveCamera, Vector3 } from "three";

const CameraController: FC<ReactThreeFiber.Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>> = (props) => {

    const perspectiveCamera = useRef(
        new PerspectiveCamera(
            30,
            window.innerWidth / window.innerHeight,
            0.1,
            3000
        )
    );

    const {
        setDefaultCamera,
        gl: { domElement },
    } = useThree();

    useEffect(() => {
        perspectiveCamera.current.up = new Vector3(0, 0, 1);
        setDefaultCamera(perspectiveCamera.current);

        // perspectiveCamera.current.position.set(0, -800, 120);
        perspectiveCamera.current.position.set(0, 0, 700);
        
        const controls = new OrbitControls(
            perspectiveCamera.current,
            domElement
        );

        return () => controls.dispose();
    }, [domElement, setDefaultCamera]);

    return <perspectiveCamera ref={perspectiveCamera} {...props} />;
};

export default CameraController;
