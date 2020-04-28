import React, { FC } from 'react'
import { ReactThreeFiber } from 'react-three-fiber'
import { Mesh } from 'three'

const Floor: FC<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>> = (props) => {
    
    return (
        <mesh {...props} receiveShadow={true} castShadow={true} >
            <boxGeometry attach="geometry" args={[20, 0.1, 20]} />
            <meshLambertMaterial attach="material" color={"green"} />
        </mesh>
    )
}

export default Floor;