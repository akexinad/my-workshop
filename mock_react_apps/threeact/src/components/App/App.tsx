import React, { Fragment } from "react";
import { Canvas } from "react-three-fiber";
import { AxesHelper } from "three";

import CameraController from "../CameraController/CameraController";
import Box from "../Box/Box";
import Rectangle from "../Rectangle/Rectangle";
import Sphere from "../Sphere/Sphere";

import "./App.css";

const App = () => {

    return (
        <Fragment>
            <div className="App">
                <header className="App-header">
                    <h3>3ACT</h3>
                </header>
            </div>

            <Canvas style={{ height: "85vh", backgroundColor: "grey" }}>
                <CameraController />
                <ambientLight />
                <primitive object={new AxesHelper(10)} />
                <Rectangle position={[3, 1, 3]} />
                <Sphere position={[1, 1, 5]} />
                <Sphere />
                <Box position={[-1.2, 1, 0]} />
                <Box position={[1.2, 1, 0]} />

            </Canvas>
        </Fragment>
    );
};

export default App;
