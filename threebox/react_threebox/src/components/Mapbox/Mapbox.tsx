import React, { FC, useState, useRef, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
// import * as THREE from "three";
// @ts-ignore
import { Threebox, THREE } from "threebox-map";
// import { Threebox, THREE } from "threebox";
// import * as Threebox from "threebox_ngx";
// import { Threebox, THREE } from "../../utils/rhinoParser/threebox";
// import { Threebox, THREE } from "../../utils/threebox/main";

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
    const [threebox, setThreebox] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = TOKENS.MAPBOX;

        // @ts-ignore
        window.THREE = THREE;

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
                //@ts-ignore
                window.map = map;

            });
        };

        if (!map) {
            initializeMap(setMap, mapContainer);
        }
    }, [map]);

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
        let tb: Threebox;

        map.addLayer({
            id: "threebox_layer",
            type: "custom",
            onAdd: (map, mbxContext) => {

                tb = new Threebox(map, mbxContext, {
                    defaultLights: true
                });

                const createThreeboxObject = (obj: THREE.Mesh) => {
                    obj = tb
                        .Object3D({
                            obj: cube,
                            units: "meters"
                        })
                        .setCoords([-0.13553551042706385, 51.529638748668127]);

                    tb.add(obj);
                };

                var geometry = new THREE.BoxGeometry(100, 100, 100);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x6a0000,
                    transparent: true,
                    opacity: 0.8
                });
                var cube = new THREE.Mesh(geometry, material);

                createThreeboxObject(cube);
            },

            render: (gl, matrix) => {
                tb.update();
            }
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
