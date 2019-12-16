import React, { Fragment, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { Threebox } from "threebox-map";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { layer3dBuidlings } from "../../utils/mapboxLayers/layer3dBuildings";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = TOKENS.MAPBOX;

const Mapbox: React.FC = () => {
  const mapRef = useRef(mapboxgl);
  const mapbox = mapRef.current;

  let map: mapboxgl.Map;

  useEffect(() => {
    map = new mapRef.current.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v10",
      center: COORDINATES.EUSTON,
      zoom: 15,
      pitch: 60,
      bearing: 0
    });

    return () => {
      map.remove();
    };
  }, []);

  const addMapboxLayer = () => {
    map.addLayer(layer3dBuidlings);
  };

  const removeMapboxLayer = () => {
    map.removeLayer(layer3dBuidlings.id);
  };

  const style = {
    width: "100vw",
    height: "100vh",
    margin: 0
  };

  return (
    <Fragment>
      <h2>Mapbox Component</h2>
      <button onClick={addMapboxLayer}>ADD LAYER</button>
      <button onClick={removeMapboxLayer}>REMOVE LAYER</button>
      <div style={style} id="map"></div>
    </Fragment>
  );
};

export default Mapbox;
