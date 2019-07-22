let selection;
let selectedTower;
const selectedColour = 0xffff00;

function createRaycaster() {

    raycaster.setFromCamera( mouse, camera );

    selection = raycaster.intersectObjects( scene.children );
    
    if (selection.length > 0) {
        
        if ( selectedTower !=- selection[ 0 ].object ) {

            if (selectedTower) {
                selectedTower.forEach( compartment => {
                    compartment.material.emissive.setHex( selectedTower.originalColour );
                });
            }

            // msg('Selected Tower in create raycaster', selectedTower)
            
            selectedTower = scene.children.filter( compartments => {
                return compartments.name === selection[0].object.name;
            });
    
            selectedTower.originalColour = selectedTower[0].material.emissive.getHex();

            selectedTower.forEach( compartment => {
                compartment.material.emissive.setHex( selectedColour );
            });
        }
        
    } // else {
        
        // if (selectedTower) {
        //     selectedTower.forEach(compartment => {
        //         compartment.material.emissive.setHex( selectedTower.originalColour );
        //     });
        // }

        // selectedTower = null;
    // }
    
}

function createButton(text, callback) {

    const output = document.querySelector( '#output' );
    const btn = document.createElement( 'button' );

    btn.innerText = text;
    output.appendChild( btn );

    btn.addEventListener( 'click', callback );
}

const addCompartmentBtn = createButton( 'Add Compartment', addCompartment );

function addCompartment() {

    let topCompartment;
    let newCompartment;
    
    // if (!selectedTower || !selectedTower instanceof OliveMesh || !selectedTower instanceof OliveClone) {
    //     return msg( 'Choose a selectedTower motherfucker!' );
    // }
    
    msg('SELECTED TOWER =====>', selectedTower);

    topCompartment = selectedTower[ 0 ];

    const highlightedColor = topCompartment.material.emissive.getHex();
    
    newCompartment = new OliveClone(topCompartment);
    newCompartment.material.emissive.setHex( highlightedColor );
    
    msg('TOP COMPARTMENT =====>', topCompartment);
    msg('ADDED COMPARTMENT ====>', newCompartment);

    selectedTower.unshift(newCompartment);
    msg('TOWER AFTER ADDITION ====>', selectedTower);

    scene.add(newCompartment);

    msg('selectedTower after adding it to the scene ====>', selectedTower);
}


function render() {
    createRaycaster();
    renderer.render( scene, camera );
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

// renderer.render(scene, camera)
animate();