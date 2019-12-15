mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';

const EUSTON_PROJECT = EUSTON_DATA_191210;
let tb;
const euston = new Development(EUSTON_PROJECT);
let selectBuilding = false;
// console.log(EUSTON_PROJECT);
// console.log(euston.nodeTree);
// console.log(euston.sortedNodes);

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: COORDINATES.EUSTON,
    zoom: 15,
    pitch: 60,
    bearing: 0
});

addLayer();
raycast(selectBuilding);
btnHandler();

function addLayer() {
    map.on('style.load', () => {
        map.addLayer({
            id: 'custom_layer',
            type: 'custom',
            onAdd(map, webGLContext) {
        
                tb = new Threebox(
                    map,
                    webGLContext,
                    {
                        defaultLights: true,
                    }
                );

                const volumes = euston.buildVolumes("floors");
                createTBObject3D(volumes);

                // const site2 = euston.buildRegions("sites 2");
                // createTBObject3D(site2);

                // const footprints = euston.buildRegions("building 50");
                // createTBObject3D(footprints);

                // const tree = euston.nodeTree;
                // const nodes = euston.sortedNodes;

                // console.log("tree:", tree);
                // console.log("nodes:", nodes);
            },
            
            render(gl, matrix) {
                tb.update();
            }
        });
    });
}

function raycast() {
    map.on("click", (e) => {
        const intersect = tb.queryRenderedFeatures(e.point);

        if (!intersect[0]) {
            euston.repaint();
            return;
        }

        const selectedObject = intersect[0].object;

        if (selectBuilding) {
            euston.selectObject(selectedObject, selectBuilding);
        } else {
            euston.selectObject(selectedObject, selectBuilding);
        }
        
        tb.repaint();
    });
}

function btnHandler() {
    const btn = document.getElementById("objectSelector");
    
    btn.addEventListener('click', () => {
        if (selectBuilding) {
            btn.innerHTML = "Select Buidling";
            selectBuilding = !selectBuilding;
        } else {
            btn.innerHTML = "Select Foor";
            selectBuilding = !selectBuilding
        }
    });
}