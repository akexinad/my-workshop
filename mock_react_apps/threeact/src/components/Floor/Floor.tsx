import React, { FC, useRef, useEffect } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { Mesh } from "three";

const Floor: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (props) => {
    const floor = useRef(new Mesh());

    useEffect(() => {
        floor.current.rotation.x = -Math.PI / 2;
    }, []);

    return (
        <mesh {...props} ref={floor} receiveShadow={true}>
            <planeGeometry attach="geometry" args={[500, 500, 1, 1]} />
            <meshPhongMaterial attach="material" color="green" />
        </mesh>
    );
};

export default Floor;
