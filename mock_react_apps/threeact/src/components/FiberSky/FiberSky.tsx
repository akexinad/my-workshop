import React, { FC, useEffect, useRef } from "react";
import { ReactThreeFiber } from "react-three-fiber";
import { Mesh } from "three";
import { Sky } from "../../../node_modules/three/examples/jsm/objects/Sky";

const FiberSky: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = () => {

    const sky = useRef(new Sky());
    
    useEffect(() => {
        sky.current.scale.setScalar( 450000 )
    }, [])
    
    return <primitive ref={sky} object={sky} />;
};

export default FiberSky;
