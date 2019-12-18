import React, { FC, useState, useRef, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { THREE } from "threebox-map";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { mapLayer3dBuidlings } from "../../utils/mapBoxUtils/mapboxLayers/mapLayer3dBuildings";
import { threebox } from "../../utils/mapBoxUtils/threebox/threebox";
import "mapbox-gl/dist/mapbox-gl.css";

declare global {
    interface Window {
        map: mapboxgl.Map;
        THREE: THREE;
    }
}

const styles = {
    width: "100vw",
    height: "100vh",
    margin: 0
};

window.THREE = THREE;

const Mapbox: FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    const [map, setMap] = useState<mapboxgl.Map>(null);
    const [mapLayer, setMapLayer] = useState(false);

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
                window.map = map;
                
                threebox.raycaster(map)
            });
        };

        if (!map) {
            initializeMap(setMap, mapContainer);
        }
    }, [map]);

    const toggleMapboxLayer = () => {
        if (!mapLayer) {
            setMapLayer(true);
            map.addLayer(mapLayer3dBuidlings);
            return;
        }

        setMapLayer(false);
        map.removeLayer(mapLayer3dBuidlings.id);
    };

    const addThreeboxLayer = () => {
        threebox.mapLayer(map);
    };

    return (
        <Fragment>
            <h2>Mapbox Component</h2>
            <button onClick={toggleMapboxLayer}>
                {mapLayer ? "REMOVE LAYER" : "ADD LAYER"}
            </button>
            <button onClick={addThreeboxLayer}>ADD MODEL</button>
            <div style={styles} ref={el => (mapContainer.current = el)} />
        </Fragment>
    );
};

export default Mapbox;
