import React, { useRef, FC } from "react";
import { useFrame, ReactThreeFiber } from "react-three-fiber";
import { DirectionalLight } from "three";

const FiberDirectionalLight: FC<ReactThreeFiber.Object3DNode<
    DirectionalLight,
    typeof DirectionalLight
>> = (props) => {
    const light = useRef(new DirectionalLight(0xffffff, 1));

    useFrame(() => {
        light.current.position.set(50, 500, 22);
        light.current.target.position.set(300, 400, 200);
        
        light.current.shadow.camera.near = 0.5;
        light.current.shadow.camera.far = 5000;
        light.current.shadow.camera.left = -500;
        light.current.shadow.camera.bottom = -500;
        light.current.shadow.camera.right = 500;
        light.current.shadow.camera.top = 500;

        light.current.castShadow = true;
    });

    return <directionalLight {...props} ref={light} />;
};

export default FiberDirectionalLight;
