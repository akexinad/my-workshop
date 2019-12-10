mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';

const EUSTON_PROJECT_DATA = EUSTON_DATA;
let tb;
const eustonDevelopment = new Development(EUSTON_PROJECT_DATA);

console.log(EUSTON_PROJECT_DATA);


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
            eustonDevelopment.repaint();
            return;
        }

        const selectedObject = intersect[0].object;

        eustonDevelopment.highlightObject(selectedObject);

        tb.repaint();
    })
}