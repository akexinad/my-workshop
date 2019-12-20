// @ts-ignore
import { Threebox, THREE } from "threebox-map";

import COORDINATES from "../../../data/mockCoordinates";
import { RhinoBuilder, Mesh } from "./rhinoBuilder";
import { IRootObject } from "./interfaces";

const EUSTON_COORDINATES = [COORDINATES.EUSTON.lng, COORDINATES.EUSTON.lat];

export class RhinoToMap {
    public tb: any;
    public map: mapboxgl.Map;
    public data: IRootObject;
    public masterPlan: RhinoBuilder;
    public layerId = "threebox_layer";

    constructor(map: mapboxgl.Map, data: IRootObject) {
        this.map = map;
        this.data = data;
        this.masterPlan = new RhinoBuilder(this.data);

        const canvas = this.map.getCanvas();
        const gl = canvas.getContext("webgl");

        this.tb = new Threebox(this.map, gl, { defaultLights: true });
    }

    public addLayer = () => {
        const currentLayer = this.map.getLayer(this.layerId);

        if (currentLayer) {
            this.map.removeLayer(this.layerId);
        }

        this.map.addLayer({
            id: this.layerId,
            type: "custom",
            onAdd: () => {
                // this.tb = new Threebox(map, mbxContext, {
                //     defaultLights: true
                // });

                const createThreeboxObject = (obj: THREE.Group) => {
                    obj = this.tb
                        .Object3D({
                            obj,
                            units: "meters"
                        })
                        .setCoords(EUSTON_COORDINATES)
                        .set({
                            rotation: {
                                x: 0,
                                y: 0,
                                z: 180
                            }
                        });

                    this.tb.add(obj);
                };

                // threebox.euston = new RhinoBuilder(EUSTON_DATA_191210);

                console.log(this.masterPlan.nodeTree);
                console.log(this.masterPlan.groupedNodesByType);

                const floors = this.masterPlan.buildVolumes("floor");
                // const site = euston.buildRegions("site")
                // const footprint = euston.buildRegions("building")

                createThreeboxObject(floors);
                // createThreeboxObject(site);
                // createThreeboxObject(footprint);
            },

            render: () => {
                this.tb.update();
            }
        });
    };

    public removeLayer() {
        this.map.getLayer(this.layerId)
    }

    public raycaster = (wantsBuilding: boolean) => {
        if (!this.map) return;

        this.map.on("click", (e: mapboxgl.MapMouseEvent) => {
            if (!this.tb) return;

            const intersect = this.tb.queryRenderedFeatures(e.point);

            if (intersect.length === 0) return;

            const selectedObject: Mesh = intersect[0].object;
            this.masterPlan.selectObject(selectedObject, wantsBuilding);
            this.map.repaint = true;
        });
    };
}

// const threebox: IThreebox = {

//     instance: null,
//     map: null,
//     euston: null,

//     init: (map: mapboxgl.Map) => {
//         threebox.map = map;
//     },

//     addLayer: (map: mapboxgl.Map) => {
//         const layerId = "threebox_layer";
//         const currentLayer = map.getLayer(layerId);

//         if (currentLayer) {
//             map.removeLayer(layerId);
//         }

//         map.addLayer({
//             id: layerId,
//             type: "custom",
//             onAdd: (map: mapboxgl.Map, mbxContext: WebGLRenderingContext) => {
//                 threebox.instance = new Threebox(map, mbxContext, {
//                     defaultLights: true
//                 });

//                 const createThreeboxObject = (obj: THREE.Mesh) => {
//                     obj = threebox.instance
//                         .Object3D({
//                             obj,
//                             units: "meters"
//                         })
//                         .setCoords(EUSTON_COORDINATES)
//                         .set({
//                             rotation: {
//                                 x: 0,
//                                 y: 0,
//                                 z: 180
//                             }
//                         });

//                     threebox.instance.add(obj);
//                 };

//                 threebox.euston = new RhinoBuilder(EUSTON_DATA_191210);

//                 console.log(threebox.euston.nodeTree);
//                 console.log(threebox.euston.sortedNodes);

//                 const floors = threebox.euston.buildVolumes("floor");
//                 // const site = euston.buildRegions("site")
//                 // const footprint = euston.buildRegions("building")

//                 createThreeboxObject(floors);
//                 // createThreeboxObject(site);
//                 // createThreeboxObject(footprint);
//             },

//             render: (gl, matrix) => {
//                 threebox.instance.update();
//             }
//         });
//     },

//     raycaster: (wantsBuilding: boolean) => {
//         if (!threebox.map) return;

//         threebox.map.on("click", (e: mapboxgl.MapMouseEvent) => {

//             console.log(e);

//             if (!threebox.instance) return;

//             const intersect = threebox.instance.queryRenderedFeatures(e.point);

//             if (intersect.length === 0) return;

//             const selectedObject: Mesh = intersect[0].object;
//             threebox.euston.selectObject(selectedObject, wantsBuilding);
//             threebox.map.repaint = true;
//         });
//     }
// };

// export default threebox;
