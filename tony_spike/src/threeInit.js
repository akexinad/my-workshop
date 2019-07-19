const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let selectedCompartment;

function msg(msg, variable) {
    console.log(msg, variable);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseClick(event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function createButton(text, fn) {
    const output = document.querySelector('#output');
    const btn = document.createElement('button');
    btn.innerText = text;
    output.appendChild(btn);

    btn.addEventListener('click', fn);
}

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('white');
    renderer.shadowMap.enabled = true;

    const output = document.querySelector('#output');
    output.appendChild(renderer.domElement);
    
    return renderer;
}

function createScene() {
    const scene = new THREE.Scene();
    
    return scene;
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.x = -50;
    camera.position.y = -130;
    camera.position.z = 80;

    camera.up = new THREE.Vector3( 0, 0, 1 );
    
    return camera;
}

function createLight() {
    const pointLight = new THREE.PointLight('#FFFFFF', 1.2);

    pointLight.position.x = 10;
    pointLight.position.y = 10;
    pointLight.position.z = 100;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    
    return pointLight;
}

function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(100);
    
    return axesHelper;
}

function createLightHelper(light) {
    const helper = new THREE.PointLightHelper(light);
    
    return helper;
}

function addOrbitControls(camera, renderer) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    return controls;
}

let currentSelection;

function createRaycaster() {

    raycaster.setFromCamera( mouse, camera );

    let selection = raycaster.intersectObjects( scene.children );

    
    if (selection.length > 0) {
        
        if ( currentSelection !=- selection[ 0 ].object ) {

            if (currentSelection) {
                currentSelection.forEach( compartment => {
                    compartment.material.emissive.setHex( currentSelection.colour );
                });
            }
            
            currentSelection = scene.children.filter( compartments => {
                return compartments.name === selection[0].object.name;
            });
    
            currentSelection.colour = currentSelection[0].material.emissive.getHex();

            currentSelection.forEach( compartment => {
                compartment.material.emissive.setHex( 0xffff00 );
            });
        }
        
    } else {
        
        if (currentSelection) {
            currentSelection.forEach(compartment => {
                compartment.material.emissive.setHex( currentSelection.colour );
            });
        }


    }
    
}

// function addCompartment() {
//     // msg('SCENE CHLDREN ====>', scene.children);
//     const selection = raycaster.intersectObjects( scene.children );
//     // msg('SELECTION ====>', selection);

//     if (selection.length > 0) {

//         msg('SELECTED TOWER ====>', newSelection);
        
//         newSelection.forEach( compartment => {
//             msg(compartment.object); //yellow
//             // compartment.material.emissive.setHex( 0xffff00 )
//         });
        
//         // const highestCompartment = selection[0].object;
        
//         // msg('highest compartment ====>', highestCompartment);
        
        
        
//     }

//     return msg('Select a tower motherfucker!!!');
// }

// function removeCompartment() {
//     const selection = raycaster.intersectObjects( scene.children );
//     msg('selection ====>', selection);

//     if (selection.length > 0) {
//         const newSelection = selection[0].object;
//         return msg('selected tower name ====>', newSelection.name);
//     }

//     return msg('Select a tower motherfucker!!!');
// }

function render() {
    createRaycaster();
    renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'click', onDocumentMouseClick );

// const addCompartmentBtn = createButton('Add Compartment', addCompartment);
// const removeCompartmentBtn = createButton('Remove Compartment', removeCompartment);

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera(scene);
// const axes = createAxesHelper();
const light = createLight();
const lightHelper = createLightHelper(light);

addOrbitControls(camera, renderer);

function animate() {
    // renderer.render(scene, camera);
    requestAnimationFrame(animate);
    render();
}