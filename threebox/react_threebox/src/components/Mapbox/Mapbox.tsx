import React, { FC, useState, useRef, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { Threebox } from "threebox-map";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { layer3dBuidlings } from "../../utils/mapboxLayers/layer3dBuildings";

import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
    width: "100vw",
    height: "100vh",
    margin: 0
};

const Mapbox: FC = () => {
    const [map, setMap] = useState<mapboxgl.Map>(null);
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken = TOKENS.MAPBOX;

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
    }, [map]);

    const addMapboxLayer = () => {
        map.addLayer(layer3dBuidlings);
    };

    const removeMapboxLayer = () => {
        map.removeLayer(layer3dBuidlings.id);
    };

    return (
        <Fragment>
            <h2>Mapbox Component</h2>
            <button onClick={addMapboxLayer}>ADD LAYER</button>
            <button onClick={removeMapboxLayer}>REMOVE LAYER</button>
            <div style={styles} ref={el => (mapContainer.current = el)}></div>
        </Fragment>
    );
};

export default Mapbox;
