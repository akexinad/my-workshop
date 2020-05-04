import React, { useRef, FC, useState, useEffect } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { DirectionalLight, DirectionalLightHelper, CameraHelper, Mesh } from "three";

interface DirectionalLightProps extends ReactThreeFiber.Object3DNode<Mesh, typeof Mesh> {
    initialPosition: {x: number, y: number, z: number};
}

const FiberDirectionalLight: FC<DirectionalLightProps> = (props) => {

    const light = useRef(new DirectionalLight(0xffffff, 1));
    const [lightHelper, setlightHelper] = useState(
        new DirectionalLightHelper(light.current)
    );
    const [cameraHelper, setCameraHelper] = useState(
        new CameraHelper(light.current.shadow.camera)
    );

    useEffect(() => {
        const { initialPosition: { x, y, z } } = props;
        
        light.current.position.set(x, y, z);
        light.current.target.position.set(300, 400, 200);
        light.current.shadow.mapSize.width = 2048;
        light.current.shadow.mapSize.height = 2048;
    
        const { camera } = light.current.shadow;
    
        camera.near = 0.5;
        camera.far = 5000;
        camera.left = -50;
        camera.bottom = -50;
        camera.right = 50;
        camera.top = 50;
    
        light.current.castShadow = true;
    
        setlightHelper(new DirectionalLightHelper(light.current));
        setCameraHelper(new CameraHelper(light.current.shadow.camera));
    }, [props])

    return (
        <>
            <primitive object={cameraHelper} />
            <primitive object={lightHelper} />
            <directionalLight ref={light} />
        </>
    );
};

export default FiberDirectionalLight;
