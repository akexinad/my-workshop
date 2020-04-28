import React, { useRef, FC } from "react";
import { ReactThreeFiber, useFrame } from "react-three-fiber";
import { PerspectiveCamera } from "three";

const FiberPerspectiveCamera: FC<ReactThreeFiber.Object3DNode<
    PerspectiveCamera,
    typeof PerspectiveCamera
>> = () => {
    const camera = useRef(
        new PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        )
    );

    useFrame(() => camera.current.position.set(10000, 10000, 1000));

    return <perspectiveCamera ref={camera} />;
};

export default FiberPerspectiveCamera;