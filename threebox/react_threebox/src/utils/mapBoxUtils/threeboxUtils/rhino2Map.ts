// @ts-ignore
import { Threebox, THREE } from "threebox-map";

import COORDINATES from "../../../data/mockCoordinates";
import { RhinoBuilder } from "./rhinoBuilder";
import { IRootObject, IRhinoBuilder, IMesh } from "./interfaces";

const EUSTON_COORDINATES = [COORDINATES.EUSTON.lng, COORDINATES.EUSTON.lat];

export class RhinoToMap {
    public tb: Threebox;
    public map: mapboxgl.Map;
    public data: IRootObject;
    public masterPlan: IRhinoBuilder;
    public layerId = "threebox_layer";
    public canvas: HTMLCanvasElement;

    constructor(map: mapboxgl.Map, data: IRootObject) {
        this.map = map;
        this.data = data;
        this.masterPlan = new RhinoBuilder(this.data);

        const canvas = this.map.getCanvas();
        this.canvas = canvas;
        
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

        this.map.on("mousemove", (e: mapboxgl.MapMouseEvent) => {  
            if (!this.tb) return;
            
            const intersect = this.tb.queryRenderedFeatures(e.point);
            
            if (intersect.length === 0) {
                this.canvas.style.cursor = "grab";
                return;
            };

            const selectedObject: IMesh = intersect[0].object;

            if (selectedObject) this.canvas.style.cursor = "pointer";

            this.map.on("click", (e: mapboxgl.MapMouseEvent) => {
                this.masterPlan.selectObject(selectedObject, wantsBuilding);
                this.map.repaint = true;
            });

        });
    };
}
