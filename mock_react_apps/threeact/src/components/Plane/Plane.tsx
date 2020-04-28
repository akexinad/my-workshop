import React, { FC, useRef } from "react";
import { ReactThreeFiber, useFrame } from "react-three-fiber";
import { Mesh } from "three";

const Plane: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = () => {
    const plane = useRef(new Mesh());

    useFrame(() => {
        plane.current.receiveShadow = true;
        plane.current.castShadow = true;
        plane.current.rotation.x = -Math.PI / 2;
        plane.current.position.y = -400;
    });

    return (
        <mesh>
            <planeGeometry attach="geometry" args={[1000, 1000, 1, 1]} />
            <meshPhongMaterial attach="material" color={0x00ee00} />
        </mesh>
    );
};

export default Plane;
