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

            // const geo = new THREE.BoxGeometry(100, 100, 100);
            // const mat = new THREE.MeshLambertMaterial({
            //     color: 0xd40004
            // });
            // const mesh = new THREE.Mesh(geo, mat);

            // tbObject3D(mesh);

            const euston = new PROMETHEUS("danny", 29)

            euston.myName;

        },
        
        render(gl, matrix) {
            tb.update();
        }
    });
});
