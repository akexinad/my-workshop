mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';

const coords = {
    origin: [11.319355, 43.328172],
    siena: [11.331470, 43.318435],
    leTolfe: [11.349175, 43.345444],
    monteriggioni: [11.249512, 43.348923, 1000000],
    tognazza: [11.286397, 43.346272],
    coloniaSantaRegina: [11.366084, 43.321416],
    marcialla: [11.142095, 43.575049],
    silvertown: [0.0322217087648, 51.5022068109],
    northPole: [12.869345, 83.892289, 1000000000]
}


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: coords.silvertown,
    zoom: 13,
    pitch: 60,
    bearing: 0
});

map.on('style.load', function() {
    map.addLayer({
        id: 'custom_layer',
        type: 'custom',
        onAdd(map, mbxContext){
            tb = new Threebox(
                map, 
                mbxContext,
                {
                    defaultLights: true,
                }
            );

            const defaultOptions = {
                rotation: {
                    x: 0, y: 0, z: 0
                }
            };

            function createTBObject3D( obj, coords, z ) {
                obj = tb.Object3D({
                    obj,
                    units: 'meters'
                })
                .setCoords(coords)
                .set({ rotation: { x: 0, y: 0, z } });

                tb.add(obj);
            };
            
            
            let light = createLight();
            // createTBObject3D(light, coords.silvertown, defaultOptions);
            
            let light2 = createAmbientLight();
            // createTBObject3D(light2, coords.monteriggioni, defaultOptions);

            let light3 = createLight();
            createTBObject3D(light3, coords.northPole, defaultOptions);

            let cube = createCube();
            // createTBObject3D(cube, coords.monteriggioni, defaultOptions);
            
            let rectangle = createPrism(200, 800, 200);
            // createTBObject3D(rectangle, coords.leTolfe, defaultOptions);

            // console.log(silvertownProjectData);
            

            
            // console.log(towerStack3);


            const silvertown = new OliveWorld( tb, silvertownProjectData );

            silvertown.renderScenario( 0, coords.silvertown, 180 );
        },
        
        render(){
            tb.update();
        }
    });
});