import { Map } from "maplibre-gl";
import React, {
    CSSProperties,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import ReactMapGL, { Layer, MapEvent, Source } from "react-map-gl";
import "./mapLibreCompare.css";

export const MapViewer = () => {
    const KEY = process.env.REACT_APP_MAPTILE_KEY;

    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });

    const mapRef = useRef<Map>();

    useEffect(() => {
        console.log("hello world");
    }, []);

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const style: CSSProperties = {
        position: "absolute",
        top: 50,
        bottom: 0,
        left: 0,
    };

    const handleClick = (e: MapEvent) => {
        console.log(`e`, e);
    };

    const buttonClick = () => {
        const map = mapRef.current!;

        console.log(map.getStyle().sources);
    };

    return (
        <>
            <div>
                <ReactMapGL
                    ref={(ref) => (mapRef.current = ref?.getMap())}
                    width="100%"
                    height="100%"
                    style={style}
                    {...viewport}
                    onViewportChange={handleViewportChange}
                    mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${KEY}`}
                    onClick={(e) => handleClick(e)}
                    // mapStyle={'mapbox://styles/mapbox/light-v10'}
                >
                    <Source
                        id="wms-test-source"
                        type="raster"
                        urls={["https://ahocevar.com/geoserver/wms"]}
                        tiles={[
                            "https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015",
                        ]}
                        tileSize={256}
                    >
                        <Layer
                            id="wms-test-layer"
                            type="raster"
                            source="wms-test-source"
                            paint={{}}
                            // beforeId="aeroway-line"
                        />
                    </Source>
                </ReactMapGL>
            </div>
            <div>
                <button onClick={buttonClick}>
                    {mapRef.current ? "get sources" : "loading"}
                </button>
            </div>
        </>
    );
};
