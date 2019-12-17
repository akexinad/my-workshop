// @ts-ignore
import { Threebox, THREE } from "threebox-map";

import COORDINATES from "../../../data/mockCoordinates";

const EUSTON_COORDINATES = [ COORDINATES.EUSTON.lng, COORDINATES.EUSTON.lat ]

export const mapLayerThreebox = (
    map: mapboxgl.Map,
) => {

    let tb: any;

    map.addLayer({
        id: "threebox_layer",
        type: "custom",
        onAdd: (
            map: mapboxgl.Map,
            mbxContext: WebGLRenderingContext
        ) => {
            tb = new Threebox(map, mbxContext, {
                defaultLights: true
            });

            const createThreeboxObject = (obj: THREE.Mesh) => {
                obj = tb
                    .Object3D({
                        obj: cube,
                        units: "meters"
                    })
                    .setCoords(EUSTON_COORDINATES);

                tb.add(obj);
            };

            var geometry = new THREE.BoxGeometry(100, 100, 100);
            var material = new THREE.MeshBasicMaterial({
                color: 0x6a0000,
                transparent: true,
                opacity: 0.8
            });
            var cube = new THREE.Mesh(geometry, material);

            createThreeboxObject(cube);
        },

        render: (gl, matrix) => {
            tb.update();
        }
    });

};
