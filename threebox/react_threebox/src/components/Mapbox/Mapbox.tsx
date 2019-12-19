import React, { FC, useState, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { THREE } from "threebox-map";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { mapLayer3dBuidlings } from "../../utils/mapBoxUtils/mapboxLayers/mapLayer3dBuildings";
import { EUSTON_DATA_191210 } from "../../data/191210_eustonData";
import { RhinoToMap } from "../../utils/mapBoxUtils/threeboxUtils/rhino2Map";

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
    const [rhino2Map, setRhino2Map] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = TOKENS.MAPBOX;

        const initializeRhino2Map = () => {
            const rhino2Map = new RhinoToMap(map, EUSTON_DATA_191210);
            setRhino2Map(rhino2Map);
        };

        if (!map) {
            initializeMap();
            return;
        }

        if (!rhino2Map) {
            initializeRhino2Map();
            return;
        }

        rhino2Map.raycaster(highlightBuilding);
    }, [map, rhino2Map, highlightBuilding]);

    const initializeMap = () => {
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
            map.addLayer(mapLayer3dBuidlings);
            setMapLayer(true);
            return;
        }

        setMapLayer(false);
        map.removeLayer(mapLayer3dBuidlings.id);
    };

    const _handleThreeboxLayer = () => {
        rhino2Map.addLayer(map);
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
