import React, { FC, useRef, useEffect } from "react";
import { ReactThreeFiber, useFrame } from "react-three-fiber";
import { Mesh } from "three";
import FiberDirectionalLight from "../FiberDirectionalLight/FiberDirectionalLight";

interface SunProps extends ReactThreeFiber.Object3DNode<Mesh, typeof Mesh> {
    initialPosition: { x: number; y: number; z: number };
}

const Sun: FC<SunProps> = (props) => {
    const {
        initialPosition: { x, y, z },
    } = props;

    const sun = useRef(new Mesh());

    useEffect(() => {
        sun.current.position.set(0, 50, -700);
    }, [])

    useFrame(() => {
    });

    return (
        <>
            <mesh ref={sun} {...props}>
                <sphereGeometry attach="geometry" args={[15, 30, 30]} />
                <meshBasicMaterial attach="material" color="yellow" />
            </mesh>
            <FiberDirectionalLight initialPosition={{ x, y, z }} />
        </>
    );
};

export default Sun;
