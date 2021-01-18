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
    northPole: [12.869345, 83.892289, 1000000000],
    euston: [-0.13553551042706385, 51.529638748668127]
}


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: coords.euston,
    zoom: 15,
    pitch: 0,
    bearing: 180
});

function raycast(map, tb) {
    map.on('click', e => {
        const intersect = tb.queryRenderedFeatures(e.point);

        console.log(intersect);
        
        
    });
}


function display2d() {
    map.easeTo({
        pitch: 0
    }, {
        duration: 1200
    });
};

function display3d() {
    map.easeTo({
        pitch: 60,
    }, {
        duration: 1200
    });
};

map.on('style.load', function() {
    displayModels();
});

function displayModels() {
    
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
            
            raycast(map, tb);

            const cmpt1 = new OliveCompartment(compartment1);
            const cmpt2 = new OliveCompartment(compartment2);

            console.log(cmpt1);
            console.log(cmpt2);
            
            const obj1 = tb.Object3D({
                obj: cmpt1,
                units: 'meters'
            })
            .setCoords( coords.euston )
            .set({ 
                rotation: {
                    x: 0, y: 0, z: 180
                }
            });

            // const obj2 = tb.Object3D({
            //     obj: cmpt2,
            //     units: 'meters'
            // })
            // .setCoords( coords.euston )
            // .set({ 
            //     rotation: {
            //         x: 0, y: 0, z: 180
            //     }
            // });
            
            tb.add(obj1);
            // tb.add(obj2);

            // displayProject(tb, eustonProjectData, coords.euston, true);
            // displayProject(tb, silvertownProjectData, coords.silvertown, false);

            
        },
        
        render(gl, matrix) {
            tb.update();
        }
    });
}

























function displayProject(threebox, projectData, coords, in3D = true) {
    const project = new OliveWorld(threebox, projectData);
    
    if (in3D === false) {
        project.buildFootprints(0, coords, 180);
        return project;
    }
    
    project.buildCompartments(0, coords, 180);
    return project;
}

document.getElementById('2d')
    .addEventListener('click', display2d);

document.getElementById('3d')
    .addEventListener('click', display3d);