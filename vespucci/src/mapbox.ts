import mapboxgl from 'mapbox-gl';

import { Geo3 } from './vespucci/geo3';

const EUSTON = new mapboxgl.LngLat(-0.13553551042706385, 51.529638748668127);

mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';
export const map: mapboxgl.Map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: EUSTON,
    zoom: 10,
    pitch: 60,
    bearing: 0
});

export function displayMap(): void {
    map.on('style.load', () => {
        map.addLayer({
            id: 'custom_layer',
            type: 'custom',
            onAdd: (map: mapboxgl.Map, webGLContext) => {

                // console.log(map);
                // console.log(webGLContext);

                const object = new Geo3(map, webGLContext);

                console.log(object);

            },

            render: () => {
                map.repaint = true;
            }
        });
    });
}
