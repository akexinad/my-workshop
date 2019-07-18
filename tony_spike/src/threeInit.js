const mouse = new THREE.Vector2();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseClick(event) {
    console.log(event);

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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

    camera.position.x = -150;
    camera.position.y = -30;
    camera.position.z = 60;

    camera.up = new THREE.Vector3( 0, 0, 1 );
    
    return camera;
}

function createLight() {
    const pointLight = new THREE.PointLight('#FFFFFF', 1.2);

    pointLight.position.x = 100;
    pointLight.position.y = 100;
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

function createRaycaster() {
    const raycaster = new THREE.Raycaster();
    let INTERSECTED = null;

    console.log(raycaster);
    


    const compartmentGroup = scene.children;
    console.log('COMPARTMENT GROUP INSIDE RAYCASTER', compartmentGroup);
    
    
    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( compartmentGroup, true );

    console.log('Intersects ====>', intersects);

    if ( intersects.length > 0 ) {
        INTERSECTED = intersects[0];

        console.log('INTERSECTED ====>', INTERSECTED);
        

        INTERSECTED.object.material.emissive.setHex( 0x00ff00 );
        
        // INTERSECTED.forEach( intersect => {
        //     console.log('Intersecr inside the loop ====>', intersect.object.material.emissive.setHex( 0x00ff00 ));
            
        //     // intersect.material.emissive.setHex( 0x00ff00 );
        // });

        // console.log('INTERSECTED ====>', INTERSECTED);
        // console.log('INTERSECTED COLOUR ====>', INTERSECTED.material.emissive.setHex( 0x00ff00 ));
        
    }
    

    // if ( intersects.length > 0 ) {


    //     if ( INTERSECTED != intersects[ 0 ].object ) {

    //         if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    //         INTERSECTED = intersects[ 0 ].object;
    //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //         // INTERSECTED.material.emissive.setHex( 0xff0000 );
    //         INTERSECTED.material.emissive.setHex( 0x00ff00 );
    //     }

    // } else {

    //     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    //     INTERSECTED = null;

    // }

    renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'click', onDocumentMouseClick );

// const raycaster = createRaycaster();
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
    createRaycaster();
}