// @ts-ignore
import { Threebox, THREE } from "threebox-map";

export const mapLayerThreebox = (
    map: mapboxgl.Map,
) => {

    let tb: Threebox;

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
                    .setCoords([-0.13553551042706385, 51.529638748668127]);

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
