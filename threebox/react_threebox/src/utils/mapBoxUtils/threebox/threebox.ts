// @ts-ignore
import { Threebox, THREE } from "threebox-map";

import COORDINATES from "../../../data/mockCoordinates";
import { EUSTON_DATA_191210 } from "../../../data/191210_eustonData";
import { RhinoBuilder, Mesh } from "./rhinoBuilder";

const EUSTON_COORDINATES = [COORDINATES.EUSTON.lng, COORDINATES.EUSTON.lat];

let tb: any;
let euston: RhinoBuilder;

export const threebox = {
    mapLayer: (
        map: mapboxgl.Map,
    ) => {

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
                            obj,
                            units: "meters"
                        })
                        .setCoords(EUSTON_COORDINATES)
                        .set({
                            rotation: {
                                x: 0, y: 0, z: 180
                            }
                        });

                    tb.add(obj);
                };

                euston = new RhinoBuilder(EUSTON_DATA_191210);

                console.log(euston.nodeTree);
                console.log(euston.sortedNodes);

                const floors = euston.buildVolumes("floor");
                // const site = euston.buildRegions("site")
                const footprint = euston.buildRegions("building")

                createThreeboxObject(floors);
                // createThreeboxObject(site);
                createThreeboxObject(footprint);
                // createThreeboxObject(cube);
            },

            render: (gl, matrix) => {
                tb.update();
            }
        });
    },

    raycaster: (map: mapboxgl.Map) => {
        map.on("click", (e: mapboxgl.MapMouseEvent) => {
            if (!tb) {
                return;
            }

            const intersect = tb.queryRenderedFeatures(e.point);

            const selectedObject: Mesh = intersect[0].object;

            console.log(selectedObject);


            euston.selectObject(selectedObject, true);


            // if (selectBuilding) {
            //     euston.selectObject(selectedObject, selectBuilding);
            // } else {
            //     euston.selectObject(selectedObject, selectBuilding);
            // }

            map.repaint = true;

        });
    }

}
