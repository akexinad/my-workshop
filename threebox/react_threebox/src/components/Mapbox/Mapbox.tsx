import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// @ts-ignore
import { Threebox } from 'threebox-map';


const Mapbox: React.FC = () => {
    
    useEffect(() => {
        // <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.0/mapbox-gl.css' rel='stylesheet' />
        const mapboxCss = document.createElement("link");
        mapboxCss.href = "https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.0/mapbox-gl.css";
        mapboxCss.rel = "stylesheet";
        document.head.appendChild(mapboxCss);

        console.log(mapboxCss);
        
        
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';
        // Add this css script when the component loads
    
        const map = new mapboxgl.Map({
        container: "map",
        style: 'mapbox://styles/mapbox/streets-v9'
        });
        
        // return () => {
        //     cleanup
        // };
    }, []);
    
    return <div id="map">
    </div>
}

export default Mapbox;