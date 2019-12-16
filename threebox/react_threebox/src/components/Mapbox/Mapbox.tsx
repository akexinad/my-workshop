import React, { FC, useState, useRef, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
// import { Threebox } from "threebox-map";
// import { Threebox } from "threebox";
// import * as Threebox from "threebox_ngx";
// import { Threebox, THREE } from "../../utils/rhinoParser/threebox";
import { Threebox, THREE } from "../../utils/threebox/main";
// import * as THREE from "three";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { layer3dBuidlings } from "../../utils/mapboxLayers/layer3dBuildings";

import "mapbox-gl/dist/mapbox-gl.css";

// import { EUSTON_DATA_191210 } from "../../data/191210_eustonData";

const styles = {
    width: "100vw",
    height: "100vh",
    margin: 0
};

const Mapbox: FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    const [map, setMap] = useState<mapboxgl.Map>(null);
    const [mapLayer, setMapLayer] = useState(false);
    // const [three, setThree] = useState(null);
    // const [threebox, setThreebox] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = TOKENS.MAPBOX;

        // const script = document.createElement("script");
        // script.src = "../../utils/rhinoParser/threebox.js";
        // script.onload = () => scriptLoaded();
        // document.body.appendChild(script);

        const initializeMap = (
            setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map>>,
            mapContainer: React.MutableRefObject<HTMLDivElement>
        ) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v10",
                center: COORDINATES.EUSTON,
                zoom: 15,
                pitch: 60,
                bearing: 0
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        };

        if (!map) {
            initializeMap(setMap, mapContainer);
        }

        return () => {
            // document.body.removeChild(script);
        };
    }, [map]);

    // const scriptLoaded = () => {
    //     console.log("script has loaded");
    // }

    const toggleMapboxLayer = () => {
        if (!mapLayer) {
            setMapLayer(true);
            map.addLayer(layer3dBuidlings);
            return;
        }

        setMapLayer(false);
        map.removeLayer(layer3dBuidlings.id);
    };

    const addThreeboxLayer = () => {
        map.addLayer({
            id: "threebox_layer",
            type: "custom",
            onAdd: (map, mbxContext) => {
                // console.log(Threebox);
                // console.log(THREE);
                
                // console.log(map);
                // console.log(mbxContext);

                const tb: Threebox = new Threebox(map, mbxContext, {
                    defaultLights: true
                });

                const geometry = new THREE.BoxGeometry(100, 100, 100);
                const material = new THREE.MeshLambertMaterial({
                    color: "red",
                    transparent: true,
                    opacity: 0.8
                });
                
                const mesh = new THREE.Mesh(geometry, material);

                // console.log(tb.Object3D);
                
                const obj = tb.Object3D({
                    obj: mesh,
                    units: "meters"
                });

                obj.setCoords([-0.13553551042706385, 51.529638748668127]);

                // console.log(obj);


                tb.add(obj);
            },

            render: () => {}
        });
    };

    return (
        <Fragment>
            <h2>Mapbox Component</h2>
            <button onClick={toggleMapboxLayer}>
                {mapLayer ? "REMOVE LAYER" : "ADD LAYER"}
            </button>
            <button onClick={addThreeboxLayer}>ADD MODEL</button>
            <div style={styles} ref={el => (mapContainer.current = el)}></div>
        </Fragment>
    );
};

export default Mapbox;
