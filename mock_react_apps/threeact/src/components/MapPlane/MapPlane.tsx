import React, { FC, useRef } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { Mesh, TextureLoader } from "three";

// const img = "https://threejsfundamentals.org/threejs/resources/images/wall.jpg";
// const img2 = "./images/map_plane.png";
const img3 = "./images/siena.png";
const textureLoader = new TextureLoader();

const MapPlane: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (
    props
) => {
    const mesh = useRef(new Mesh());

    return (
        <>
            <mesh ref={mesh} receiveShadow={true} {...props}>
                <planeGeometry attach="geometry" args={[500, 500, 1, 1]} />
                <meshLambertMaterial
                    attach="material"
                    map={textureLoader.load(img3)}
                />
            </mesh>
        </>
    );
};

export default MapPlane;
