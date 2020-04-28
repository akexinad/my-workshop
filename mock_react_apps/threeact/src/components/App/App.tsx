import React, { Fragment } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { AxesHelper } from "three";

import CameraController from "../CameraController/CameraController";
import Box from "../Box/Box";
import Rectangle from "../Rectangle/Rectangle";
import Sphere from "../Sphere/Sphere";

import "./App.css";
import Floor from "../Floor/Floor";
import FiberDirectionalLight from "../FiberDirectionalLight/FiberDirectionalLight";
import FiberPerspectiveCamera from "../FiberPerspectiveCamera/FiberPerspectiveCamera";
import Plane from "../Plane/Plane";

const App = () => {

  const { scene } = useThree();

  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <h3>3ACT</h3>
        </header>
      </div>

      <Canvas
        style={{ height: "85vh", backgroundColor: "grey" }}
        
      >
        <FiberPerspectiveCamera position={[0, 0, 1000]} />
        {/* <CameraController /> */}
        <FiberDirectionalLight position={[50, 500, 22]} />
        <Sphere />
        <Plane />
        
        {/* <CameraController />
        <FiberDirectionalLight />
        <Floor position={[0, 0, 0]} />
        
        <ambientLight />
        <pointLight position={[40, 40, 40]} />
        <directionalLight
          castShadow={true}
          position={[20, 50, 30]}
        />
        <primitive object={new AxesHelper(10)} />
        <Box position={[-1.2, 1, 0]} />
        <Box position={[1.2, 1, 0]} />
        
        <Rectangle position={[3, 1, 3]} />
        <Sphere position={[1, 1, 5]} /> */}
      </Canvas>
    </Fragment>
  );
};

export default App;
