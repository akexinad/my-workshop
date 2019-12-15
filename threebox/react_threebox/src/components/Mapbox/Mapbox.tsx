import React, { Fragment, useEffect } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { Threebox } from "threebox-map";

import COORDINATES from "../../data/mockCoordinates";
import TOKENS from "../../utils/tokens";
import { layer3dBuidlings } from "../../utils/mapboxLayers";

import "mapbox-gl/dist/mapbox-gl.css";

const Mapbox: React.FC = () => {
  let map: mapboxgl.Map;

  useEffect(() => {
    mapboxgl.accessToken = TOKENS.MAPBOX;
    map = new mapboxgl.Map({
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

  const addLayer = () => {
    map.addLayer(layer3dBuidlings);
  };

  const removeLayer = () => {
      map.removeLayer(layer3dBuidlings.id);
  }

  const style = {
    width: "100vw",
    height: "100vh",
    margin: 0
  };

  return (
    <Fragment>
      <h2>Mapbox Component</h2>
      <button onClick={addLayer}>ADD LAYER</button>
      <button onClick={removeLayer}>REMOVE LAYER</button>
      <div style={style} id="map"></div>
    </Fragment>
  );
};

export default Mapbox;
