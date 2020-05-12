import React, { FC, useRef, useEffect, useState } from "react";
import { ReactThreeFiber, useFrame } from "react-three-fiber";
import {
    Mesh,
    DirectionalLight,
    CameraHelper,
    Vector3,
    Object3D
} from "three";
import SunCalc, { GetSunPositionResult } from "suncalc";

import Sky from "./Sky";

// const latLng = [42.603755, 11.262469] // magliano
const latLng = [-33.86503, 151.20221]; // barangaroo
// const latLng = [-32.074498, 115.896434] // Perth
// const latLng = [-31.557092, 131.710509] // Nullarbor plains
// const latLng = [-32.546074, 137.884521] // Port Augusta
// const latLng = [71.170605, 25.780904] // north cape
// const latLng = [0, 151.780904] // equator

const [lat, lng] = latLng;

const positionMidday = SunCalc.getPosition(
    new Date("01/12/2020, 12:00:00"),
    lat,
    lng
);
const positionMidnight = SunCalc.getPosition(
    new Date("01/01/2020, 00:00:00"),
    lat,
    lng
);
const position2Midday = SunCalc.getPosition(
    new Date("06/01/2020, 12:00:00"),
    lat,
    lng
);
const position2Midnight = SunCalc.getPosition(
    new Date("06/01/2020, 00:00:00"),
    lat,
    lng
);

console.log("positionMidday", positionMidday);
console.log("positionMidnight", positionMidnight);
console.log("position2Midday", position2Midday);
console.log("position2Midnight", position2Midnight);

const getTrueNorth = (distance: number, lat: number, lng: number): Vector3 => {
    // const [lat, lng] = coords;

    const northVector = new Vector3(0, 0, 0);

    const date = new Date();
    date.setHours(12, 0, 0, 0);

    const northPosition = SunCalc.getPosition(date, lat, lng);

    northVector.set(
        //X
        -distance * Math.cos(Math.PI / 2 + northPosition.azimuth),
        //Y
        distance *
            Math.cos(northPosition.altitude) *
            Math.sin(Math.PI / 2 + northPosition.azimuth),
        //Z
        0
    );

    // const { x, y } = northVector;

    // const euler = new Euler(x, y);

    // console.log("euler", euler);

    console.log('northVector', northVector)

    return northVector;
};

const SkyController: FC<ReactThreeFiber.Object3DNode<
    Mesh,
    typeof Mesh
>> = () => {
    const DISTANCE = 700;
    const initialPosition = new Vector3(0, 50, -DISTANCE);
    const { x, y, z } = initialPosition;

    const sky = useRef<Sky>(new Sky());
    const sunSphere = useRef<Mesh>(new Mesh());
    const light = useRef<DirectionalLight>(new DirectionalLight(0xffffff, 1));

    const [cameraHelper, setCameraHelper] = useState(
        new CameraHelper(light.current.shadow.camera)
    );

    const handleChange = () => {
        const position = SunCalc.getPosition(
            // new Date(),
            new Date("12/01/2020, 19:00:00"),
            // new Date("05/12/2020, 15:00:00"),
            lat,
            lng
        );

        const inclineAzimuth = (
            object: Object3D,
            sunPosition: GetSunPositionResult
        ) => {

            const alpha = Math.cos(sunPosition.altitude) * Math.cos(Math.PI / 2 + sunPosition.azimuth);

            const beta = Math.cos(sunPosition.altitude) * Math.sin(Math.PI / 2 + sunPosition.azimuth);

            const gamma = Math.sin(sunPosition.altitude)

            object.position.set(
                // X
                DISTANCE * alpha,
                // Y
                -DISTANCE * beta,
                // Z
                DISTANCE * gamma
            );
        };

        inclineAzimuth(sunSphere.current, position);
        inclineAzimuth(light.current, position);

        // sunSphere.current.visible = effectController.sun;
        sunSphere.current.visible = false;

        sky.current.material.uniforms.sunPosition.value.copy(
            light.current.position
        );
    };

    useEffect(() => {
        sky.current.scale.setScalar(2500);
        // sky.current.material.uniforms.up.value.set(0, 0, 1);
        sky.current.rotation.z = Math.PI / 2;

        sunSphere.current.position.set(x, y, z);
        light.current.position.set(x, y, z);

        const { camera } = light.current.shadow;

        camera.near = 1;
        camera.far = 2000;
        camera.left = -500;
        camera.bottom = -500;
        camera.right = 500;
        camera.top = 500;

        light.current.castShadow = true;

        light.current.shadow.mapSize.width = 2048;
        light.current.shadow.mapSize.height = 2048;
        light.current.shadow.bias = 0.0001;

        handleChange();

        setCameraHelper(new CameraHelper(light.current.shadow.camera));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <primitive ref={sky} object={sky.current} />
            <mesh ref={sunSphere}>
                <sphereBufferGeometry attach="geometry" args={[50, 30, 30]} />
                <meshBasicMaterial attach="material" color="yellow" />
            </mesh>
            <directionalLight
                ref={light}
                position={sunSphere.current.position}
            />
            <primitive object={cameraHelper} />
        </>
    );
};

export default SkyController;
