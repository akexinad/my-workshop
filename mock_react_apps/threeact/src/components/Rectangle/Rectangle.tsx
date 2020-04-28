import React, { FC } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { Mesh } from "three";

const Rectangle: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (
    props
) => (
    <mesh {...props} castShadow={true} receiveShadow={true}>
        <boxGeometry attach="geometry" args={[1, 1, 3]} />
        <meshLambertMaterial attach="material" color="#FFC0CB" />
    </mesh>
);

export default Rectangle;
