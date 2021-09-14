//@ts-ignore
import * as MapLibreCompare from "@maplibre/maplibre-gl-compare";
import React, {
    CSSProperties,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import ReactMapGL, { MapRef } from "react-map-gl";
import "./mapLibreCompare.css";

export const MapCompare = () => {
    const KEY = process.env.REACT_APP_MAPTILE_KEY;

    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    let beforeRef = useRef<MapRef>();
    let afterRef = useRef<MapRef>();

    const style: CSSProperties = {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
    };

    useEffect(() => {
        const comparison = new MapLibreCompare(
            beforeRef,
            afterRef,
            "#comparison-container"
        );

        

        return () => {
            comparison.remove();
        };
    }, []);

    return (
        <div id="comparison-container" style={{ ...style, width: "100%" }}>
            <ReactMapGL
                ref={(ref) => (beforeRef = ref?.getMap())}
                width="100%"
                height="100%"
                style={style}
                {...viewport}
                onViewportChange={handleViewportChange}
                mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${KEY}`}
            />
            <ReactMapGL
                ref={(ref) => (afterRef = ref?.getMap())}
                width="100%"
                height="100%"
                style={style}
                {...viewport}
                onViewportChange={handleViewportChange}
                mapStyle={`https://api.maptiler.com/maps/hybrid/style.json?key=${KEY}`}
            />
        </div>
    );
};
