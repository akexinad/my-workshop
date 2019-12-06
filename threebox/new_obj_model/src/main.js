mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';

const EUSTON_PROJECT_DATA = eustonProjectData;
let tb;

console.log(EUSTON_PROJECT_DATA);


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: COORDINATES.EUSTON,
    zoom: 15,
    pitch: 60,
    bearing: 180
});


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

            const eustonDevelopment = new PROMETHEUS(EUSTON_PROJECT_DATA);

            const volumes = eustonDevelopment.buildVolumes();
            
            tbObject3D(volumes);
            
        },
        
        render(gl, matrix) {
            tb.update();
        }
    });
});
