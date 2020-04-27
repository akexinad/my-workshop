import React, { Fragment } from "react";
import { Canvas, useFrame } from "react-three-fiber";

import Box from "./Box/Box";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>THREEACT</h3>
        </header>
      </div>

      <Canvas style={{ height: "70vh" }}>
        <ambientLight />
        <pointLight position={[10, 10 ,10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </Fragment>
  );
};

export default App;
