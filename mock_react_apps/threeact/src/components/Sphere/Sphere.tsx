import React, { FC } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { Mesh } from "three";

const Sphere: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (props) => (
    <mesh {...props} receiveShadow={true} castShadow={true}>
        <sphereGeometry attach="geometry" args={[200, 12, 12]} />
        <meshLambertMaterial attach="material" color="#d40000" />
    </mesh>
);

export default Sphere;
