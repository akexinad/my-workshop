import React, { useRef, useState, MutableRefObject } from "react";
import { Mesh } from "three";
import { useFrame } from "react-three-fiber";

type BoxProps = any;

const Box = (props: BoxProps) => {
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
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "red" : "blue"}
      />
    </mesh>
  );
};

export default Box;
