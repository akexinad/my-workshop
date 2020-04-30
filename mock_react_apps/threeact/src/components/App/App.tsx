import React, { Fragment } from "react";
import { Canvas } from "react-three-fiber";
import { AxesHelper, PCFSoftShadowMap, BoxGeometry, MeshLambertMaterial } from "three";

import CameraController from "../CameraController/CameraController";
import Box from "../Box/Box";
import Rectangle from "../Rectangle/Rectangle";
import Sphere from "../Sphere/Sphere";
import FiberDirectionalLight from "../FiberDirectionalLight/FiberDirectionalLight";
import Floor from "../Floor/Floor";
import MapPlane from "../MapPlane/MapPlane";

import "./App.css";
import planeMesh from "../../vanillaThree/mapPlane";

const App = () => {
    return (
        <Fragment>
            <div className="App">
                <header className="App-header">
                    <h3>THREEACT</h3>
                </header>
            </div>

            <Canvas
                shadowMap={{
                    enabled: true,
                    type: PCFSoftShadowMap,
                }}
                style={{ height: "85vh", backgroundColor: "grey" }}
            >
                {/*
                Camera controller is where you can set up orbit controls by passing in the camera and the dom element.
                 */}
                <CameraController />
                {/* <ambientLight /> */}
                <FiberDirectionalLight />
                <primitive object={new AxesHelper(10)} />
                <mesh
                    castShadow
                    geometry={new BoxGeometry(5, 5, 5)}
                    material={new MeshLambertMaterial({color: 0xd40000})}
                    position={[10, 10, -15]}
                />
                {/* <Floor position={[0, 0, 0]} /> */}
                <MapPlane position={[0, 0, 0]} />
                <Rectangle position={[3, 1, 3]} />
                <Box position={[-1.2, 4, 0]} />
                <Box position={[1.2, 4, 0]} />
                <Sphere position={[5, 4, 6]} />
            </Canvas>
        </Fragment>
    );
};

export default App;