import React, { FC, useState, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { THREE } from "threebox-map";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { mapLayer3dBuidlings } from "../../utils/mapBoxUtils/mapboxLayers/mapLayer3dBuildings";
import { EUSTON_DATA_191210 } from "../../data/191210_eustonData";
import { RhinoToMap } from "../../utils/mapBoxUtils/threeboxUtils/threeToMapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapbox.css";
import { IThreeToMapbox } from "../../utils/mapBoxUtils/threeboxUtils/interfaces";

declare global {
    interface Window {
        map: mapboxgl.Map;
        THREE: THREE;
    }
}

window.THREE = THREE;

const Mapbox: FC = () => {
    const [map, setMap] = useState<mapboxgl.Map>(null);
    const [mapLayer, setMapLayer] = useState(false);
    const [volumesVisible, setVolumesVisible] = useState(false);
    const [footprintsVisible, setFootprintsVisible] = useState(false);
    const [highlightBuilding, setHighlightBuilding] = useState(false);
    const [rhino2Map, setRhino2Map] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = TOKENS.MAPBOX;

        if (!map) {
            initializeMap();
            return;
        }

        const initializeRhino2Map = () => {
            const rhino2Map: IThreeToMapbox = new RhinoToMap(
                map,
                EUSTON_DATA_191210
            );
            setRhino2Map(rhino2Map);
        };

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

    const _handleThreeboxFloorsLayer = () => {
        const volumes = "volumes";
        
        if (volumesVisible) {
            rhino2Map.removeThreeboxLayer(volumes);
            setVolumesVisible(false);
            return;
        }

        rhino2Map.addThreeboxLayer(volumes);
        setVolumesVisible(true);
    };

    const _handleThreeboxFootprintsLayer = () => {
        if (volumesVisible) {
            setVolumesVisible(false);
            return;
        }

        rhino2Map.addLayer("floors");
        setVolumesVisible(true);
    };

    const _handleFloorToBuildingToggle = () => {
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
            <button onClick={_handleThreeboxFloorsLayer}>
                {volumesVisible ? "REMOVE FLOORS" : "SHOW FLOORS"}
            </button>
            {volumesVisible ? (
                <button onClick={_handleFloorToBuildingToggle}>
                    {highlightBuilding ? "SELECT FLOOR" : "SELECT BUILDING"}
                </button>
            ) : null}
            <div style={styles} id="map" />
        </Fragment>
    );
};

const styles = {
    cursor: "pointer",
    width: "100vw",
    height: "100vh",
    margin: 0
};

export default Mapbox;
