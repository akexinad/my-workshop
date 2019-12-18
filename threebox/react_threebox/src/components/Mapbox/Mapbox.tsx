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
    const [map, setMap] = useState<mapboxgl.Map>(null);
    const [mapLayer, setMapLayer] = useState(false);
    const [highlightBuilding, setHighlightBuilding] = useState(false);

    useEffect(() => {
        mapboxgl.accessToken = TOKENS.MAPBOX;

        if (!map) {
            initializeMap(setMap);
            return;
        }

        console.log(highlightBuilding);

        threebox.raycaster(map, highlightBuilding);
    }, [map, highlightBuilding]);

    const initializeMap = (
        setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map>>
    ) => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/dark-v10",
            center: COORDINATES.EUSTON,
            zoom: 15,
            pitch: 60,
            bearing: 0
        });

        map.on("style.load", () => {
            setMap(map);
            map.resize();
            window.map = map;
        });
    };

    const _handleMapboxLayerToggle = () => {
        if (!mapLayer) {
            setMapLayer(true);
            map.addLayer(mapLayer3dBuidlings);
            return;
        }

        setMapLayer(false);
        map.removeLayer(mapLayer3dBuidlings.id);
    };

    const _handleThreeboxLayer = () => {
        threebox.mapLayer(map);
    };

    const _handleHighlightBuildingToggle = () => {
        highlightBuilding
            ? setHighlightBuilding(false)
            : setHighlightBuilding(true);
    };

    return (
        <Fragment>
            <h2>Mapbox Component</h2>
            <button onClick={_handleMapboxLayerToggle}>
                {mapLayer
                    ? "Hide Exsting Developments"
                    : "Show Existing Developments"}
            </button>
            <button onClick={_handleHighlightBuildingToggle}>
                {highlightBuilding ? "SELECT FLOOR" : "SELECT BUILDING"}
            </button>
            <button onClick={_handleThreeboxLayer}>ADD MODEL</button>
            <div style={styles} id="map" />
        </Fragment>
    );
};

export default Mapbox;
