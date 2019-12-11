mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';

const EUSTON_PROJECT = EUSTON_DATA_191210;
// console.log(EUSTON_PROJECT);
let tb;
const euston = new Development(EUSTON_PROJECT);
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
raycast();

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

                // const volumes = euston.buildVolumes();

                // createTBObject3D(volumes);

                const site2 = euston.buildSite("sites 2");

                createTBObject3D(site2);
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

        euston.highlightObject(selectedObject);

        tb.repaint();
    })
}