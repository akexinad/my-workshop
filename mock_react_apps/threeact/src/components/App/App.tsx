import React, { Fragment } from "react";
import { Canvas } from "react-three-fiber";
import { AxesHelper } from "three";

import CameraController from "../CameraController/CameraController";
import Box from "../Box/Box";
import Rectangle from "../Rectangle/Rectangle";
import Sphere from "../Sphere/Sphere";
import FiberDirectionalLight from "../FiberDirectionalLight/FiberDirectionalLight";
import Floor from "../Floor/Floor";

import "./App.css";

const App = () => {
    return (
        <Fragment>
            <div className="App">
                <header className="App-header">
                    <h3>3ACT</h3>
                </header>
            </div>

            <Canvas
                shadowMap={true}
                style={{ height: "85vh", backgroundColor: "grey" }}
            >
                {/*
                Camera controller is where you can set up orbit controls by passing in the camera and the dom element.
                 */}
                <CameraController />
                {/* <ambientLight /> */}
                <FiberDirectionalLight />
                <primitive object={new AxesHelper(10)} />
                <Floor position={[0, 0, 0]} />
                <Rectangle position={[3, 1, 3]} />
                <Box position={[-1.2, 4, 0]} />
                <Box position={[1.2, 4, 0]} />
                <Sphere position={[5, 4, 6]} />
            </Canvas>
        </Fragment>
    );
};

export default App;
