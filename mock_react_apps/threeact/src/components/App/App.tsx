import React from "react";
import { Canvas } from "react-three-fiber";
import {
    AxesHelper,
    PCFSoftShadowMap,
    BoxGeometry,
    MeshLambertMaterial,
} from "three";

import CameraController from "../Controls/CameraController/CameraController";
import Box from "../Box/Box";
import Rectangle from "../Rectangle/Rectangle";
import Sphere from "../Sphere/Sphere";
import MapPlane from "../MapPlane/MapPlane";
// import Sun from "../Sun/Sun";
// import Floor from "../Floor/Floor";
// import SkyController from "../Controls/SkyController/SkyController";
import SunController from "../SunController/SunController";

import "./App.css";

/**
 * 
 // const latLng = [42.603755, 11.262469]
 const latLng = [-33.86503, 151.20221]
 const [ lat, lng ] = latLng;
 
 // console.log('new Date()', new Date())
 
 const date = new Date("12/30/2020, 12:00:00");
 
 console.log('date', date)
 
 
 const times = SunCalc.getTimes(new Date(), lat, lng);
 const positions = SunCalc.getPosition(date, lat, lng);
 
 // console.log('times', times);
 console.log('positions', positions);
 * 
 */

const App = () => {
    return (
        <>
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
                style={{
                    height: "85vh",
                }}
            >
                {/*
                Camera controller is where you can set up orbit controls by passing in the camera and the dom element.
                 */}
                <CameraController />
                {/* <SkyController /> */}
                <SunController />
                <ambientLight intensity={0.4} />
                {/* <Sun initialPosition={{ x: 0, y: 50, z: -700 }} /> */}
                <primitive object={new AxesHelper(10)} />
                <mesh
                    castShadow={true}
                    receiveShadow={true}
                    geometry={new BoxGeometry(50, 50, 50)}
                    material={new MeshLambertMaterial({ color: 0xd40000 })}
                    position={[10, 50, -15]}
                />
                {/* <Floor position={[0, 0, 0]} /> */}
                <MapPlane position={[0, 0, 0]} />
                <Rectangle position={[3, 1, 3]} />
                <Box position={[-1.2, 4, 0]} />
                <Box position={[1.2, 4, 0]} />
                <Sphere position={[5, 4, 6]} />
            </Canvas>
        </>
    );
};

export default App;
