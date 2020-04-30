import React, { useRef, FC } from "react";
import { useFrame, ReactThreeFiber } from "react-three-fiber";
import { DirectionalLight } from "three";

const FiberDirectionalLight: FC<ReactThreeFiber.Object3DNode<
    DirectionalLight,
    typeof DirectionalLight
>> = (props) => {
    const light = useRef(new DirectionalLight(0xffffff, 1));

    useFrame(() => {
        light.current.position.set(50, 100, 22);
        light.current.target.position.set(300, 400, 200);
        light.current.shadow.mapSize.width = 1024;
        light.current.shadow.mapSize.height = 1024;

        const { camera } = light.current.shadow;

        camera.near = 0.5;
        camera.far = 5000;
        camera.left = -50;
        camera.bottom = -50;
        camera.right = 50;
        camera.top = 50;

        light.current.castShadow = true;
    });

    return <directionalLight {...props} ref={light} />;
};

export default FiberDirectionalLight;
