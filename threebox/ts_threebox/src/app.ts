import mapboxgl from "mapbox-gl";

import { TOKENS } from "./utils/tokens";
import { COORDINATES } from "./utils/coordinates";
import { COMPARTMENT_1 } from "./data/compartment1";

import { RhinoMesh } from "./utils/rhinoToThree";
import { Threebox } from "./tsThreebox/threebox";
import * as THREE from "three";
// import { THREE, Threebox } from "threebox-map";



mapboxgl.accessToken = TOKENS.MAPBOX_ACCESS_TOKEN;

// declare global {
//     interface Window {
//         THREE: THREE;
//     }
// }


window.THREE = THREE;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: new mapboxgl.LngLat(COORDINATES.EUSTON[0], COORDINATES.EUSTON[1]),
    zoom: 15,
    pitch: 0,
    bearing: 180
});

// let tb: Threebox;
let foo;

map.on("style.load", () => {
    map.addLayer({
        id: "threebox_layer",
        type: "custom",
        onAdd: (map: mapboxgl.Map, mbxContext: WebGLRenderingContext) => {
            
            const compartment = new RhinoMesh(COMPARTMENT_1);
            console.log(compartment);
            
            
            // tb = new Threebox(map, mbxContext, {
            //     defaultLights: true
            // });
            // const grp = new THREE.Group();
            // grp.add(compartment);

            // const tbObject = tb
            //     .Object3D({
            //         obj: compartment,
            //         units: "meters"
            //     })
            //     .setCoords(COORDINATES.EUSTON);

            // console.log(tbObject);

            // tb.add(tbObject);

            foo = new Threebox(map, mbxContext, { defaultLights: true, passiveRendering: true });

            const obj = foo.createObject(compartment, {
                coordinates: {
                    lng: COORDINATES.EUSTON[0],
                    lat: COORDINATES.EUSTON[1],
                    alt: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            });

            foo.add(obj);
            
            // tb.add(tbObject)
            
        },

        render() {
            // tb.update();
            foo.update();
        }
    });
});
