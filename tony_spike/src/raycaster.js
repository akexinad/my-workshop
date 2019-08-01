let selection;
let selectedStructure;
const selectedColour = 0xffff00;


function createRaycaster() {

    raycaster.setFromCamera( mouse, camera );

    selection = raycaster.intersectObjects( scene.children );
    
    if (selection.length > 0) {
        
        if ( selectedStructure !=- selection[ 0 ].object ) {

            if (selectedStructure) {
                selectedStructure.forEach( compartment => {
                    compartment.material.emissive.setHex( selectedStructure.originalColour );
                });
            }
            
            selectedStructure = scene.children.filter( compartments => {
                return compartments.name === selection[0].object.name;
            });
    
            selectedStructure.originalColour = selectedStructure[0].material.emissive.getHex();

            selectedStructure.forEach( compartment => {
                compartment.material.emissive.setHex( selectedColour );
            });
        }
        
    } // else {
        
        // if (selectedStructure) {
        //     selectedStructure.forEach(compartment => {
        //         compartment.material.emissive.setHex( selectedStructure.originalColour );
        //     });
        // }

        // selectedStructure = null;
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

    msg('Selected structure ====>', selectedStructure)

    
    let topCompartment;
    let newCompartment;
    
    if (!selectedStructure) {
        return msg( 'Pick a tower!' );
    }

    
    topCompartment = selectedStructure[ 0 ];

    const highlightedColor = topCompartment.material.emissive.getHex();
    
    newCompartment = new OliveClone(topCompartment);
    newCompartment.material.emissive.setHex( highlightedColor );
    
    msg('TOP COMPARTMENT =====>', topCompartment);
    msg('ADDED COMPARTMENT ====>', newCompartment);

    selectedStructure.unshift(newCompartment);
    msg('TOWER AFTER ADDITION ====>', selectedStructure);

    scene.add(newCompartment);

    msg('selectedStructure after adding it to the scene ====>', selectedStructure);
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