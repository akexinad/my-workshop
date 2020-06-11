import React, { FC } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { Mesh, DoubleSide, BackSide } from "three";

const EliSphere: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (
    props
) => {
    return (
        <mesh {...props}>
            <sphereGeometry attach="geometry" args={[2000, 30, 30]} />
            <meshBasicMaterial
                attach="material"
                color="#d40000"
                transparent={true}
                opacity={0.1}
                side={DoubleSide}
            />
        </mesh>
    );
};

export default EliSphere;
