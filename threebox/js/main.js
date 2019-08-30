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


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: coords.silvertown,
    zoom: 15,
    pitch: 0,
    bearing: 180
});

function addMarker() {

    // create a HTML element for marker
    var el = document.createElement('div');
    el.className = 'marker';

    // instantiate the marker and add it to the map 
    new mapboxgl.Marker(el)
        .setLngLat(coords.silvertown)
        .addTo(map);
}

function display2d() {
    map.easeTo({
        pitch: 0
    }, {
        duration: 1200
    });

    // map.removeLayer()
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
        onAdd(map, mbxContext) {
            tb = new Threebox(
                map,
                mbxContext,
                {
                    defaultLights: true,
                }
            );

            displaySilvertown();
            // displayEuston();
            displayEuston2D();
        },
        
        render() {
            tb.update();
        }
    });
}



function displaySilvertown() {
    const silvertown = new OliveWorld(tb, silvertownProjectData);
    silvertown.buildCompartments(0, coords.silvertown, 180);
}

function displayEuston() {
    const euston = new OliveWorld(tb, eustonProjectData);
    euston.buildCompartments(0, coords.euston, 180);
}

function displayEuston2D() {
    const euston = new OliveWorld(tb, eustonProjectData);
    euston.buildFootprints(0, coords.euston, 180);
}


document.getElementById('marker')
    .addEventListener('click', addMarker);

document.getElementById('2d')
    .addEventListener('click', display2d);

document.getElementById('3d')
    .addEventListener('click', display3d);