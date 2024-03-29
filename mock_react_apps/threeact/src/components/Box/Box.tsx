import React, { useRef, useState, MutableRefObject, FC } from "react";
import { Mesh } from "three";
import { useFrame, ReactThreeFiber } from "react-three-fiber";

const Box: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (props) => {
    const mesh: MutableRefObject<THREE.Mesh> = useRef(new Mesh());

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}
            castShadow={true}
            receiveShadow={true}
        >
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
            <meshLambertMaterial
                attach="material"
                color={hovered ? "red" : "blue"}
            />
        </mesh>
    );
};

export default Box;
