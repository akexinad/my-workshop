// @ts-ignore
import { Threebox, THREE } from "threebox-map";

import COORDINATES from "../../../data/mockCoordinates";
import { RhinoBuilder } from "./rhinoToThree";
import { IRootObject, IRhinoToThree, IMesh } from "./interfaces";

const EUSTON_COORDINATES = [COORDINATES.EUSTON.lng, COORDINATES.EUSTON.lat];

export class RhinoToMap {
    public tb: Threebox;
    public map: mapboxgl.Map;
    public data: IRootObject;
    public masterPlan: IRhinoToThree;
    public layerId = "threebox_layer";
    public canvas: HTMLCanvasElement;

    constructor(map: mapboxgl.Map, data: IRootObject) {
        this.map = map;
        this.data = data;
        this.masterPlan = new RhinoBuilder(this.data);

        const canvas = this.map.getCanvas();
        this.canvas = canvas;

        const gl = canvas.getContext("webgl");

        this.tb = new Threebox(map, gl, { defaultLights: true });
    }

    public addThreeboxLayer = (layerId: string) => {
        const currentLayer = this.map.getLayer(layerId);

        if (currentLayer) {
            this.map.removeLayer(layerId);
        }

        this.map.addLayer({
            id: layerId,
            type: "custom",
            onAdd: () => {
                const createThreeboxObject = (rhinoToTHREEObject: THREE.Group) => {
                    const threeboxObject: THREE.Group = this.tb
                        .Object3D({
                            obj: rhinoToTHREEObject,
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

                    threeboxObject.name = layerId;
                        
                    this.tb.add(threeboxObject);
                };

                let obj: THREE.Group;

                switch (layerId) {
                    case "volume":
                        obj = this.masterPlan.buildVolumes("floors");
                        break;
                    case "region":
                        obj = this.masterPlan.buildRegions("buildings");
                        break;
                    default:
                        break;
                }

                createThreeboxObject(obj);

                // threebox.euston = new RhinoBuilder(EUSTON_DATA_191210);

                console.log(this.masterPlan.nodeTree);
                console.log(this.masterPlan.groupedNodesByType);

                // const site = euston.buildRegions("site")
                // const footprint = euston.buildRegions("building")

                // createThreeboxObject(site);
                // createThreeboxObject(footprint);
            },

            render: () => {
                this.tb.update();
            }
        });
    };

    public removeThreeboxLayer(layerId: string) {
        this.map.removeLayer(layerId);

        const objectToRemove: THREE.Group = this.tb.world.getObjectByName(layerId);
        const objectToRemoveIndex: number = this.tb.world.children.indexOf(objectToRemove);
        
        console.log(objectToRemove);
        console.log(objectToRemoveIndex);

        // this.tb.world.children.splice(objectToRemoveIndex, 1);

        this.masterPlan.disposeGeometryAndMaterial(objectToRemove);

        this.tb.world.remove(objectToRemove);

        console.log(this.tb.world);

        // This doesn't remove anything, need to manually remove geometry via the rhinobuilder with a destroy threeObject method.
    }

    public raycaster = (wantsBuilding: boolean) => {
        if (!this.map) return;

        this.map.on("mousemove", (e: mapboxgl.MapMouseEvent) => {
            if (!this.tb) return;

            const intersect = this.tb.queryRenderedFeatures(e.point);

            if (intersect.length === 0) {
                this.canvas.style.cursor = "grab";
                return;
            }

            const selectedObject: IMesh = intersect[0].object;

            if (selectedObject) this.canvas.style.cursor = "pointer";

            this.map.on("click", (e: mapboxgl.MapMouseEvent) => {
                this.masterPlan.selectObject(selectedObject, wantsBuilding);
                this.tb.repaint();
            });
        });
    };
}
