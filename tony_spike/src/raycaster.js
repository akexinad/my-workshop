let selectedTower;
const selectedColour = 0xffff00;

function createRaycaster() {

    raycaster.setFromCamera( mouse, camera );

    let selection = raycaster.intersectObjects( scene.children );
    
    if (selection.length > 0) {
        
        if ( selectedTower !=- selection[ 0 ].object ) {

            if (selectedTower) {
                selectedTower.forEach( compartment => {
                    compartment.material.emissive.setHex( selectedTower.originalColour );
                });
            }
            
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


function addCompartment() {

    if (!selectedTower) {
        return msg( 'Choose a tower motherfucker!' );
    }

    const topCompartment = selectedTower[ 0 ];

    const towerName = topCompartment.name;
    // const topCompartmentColour = topCompartment.material.emissive.getHex();
    const topCompartmentHeight = topCompartment.geometry.parameters.options.depth;
    const topCompartmentZPosition = topCompartment.position.z;
    const newZPosition = topCompartmentZPosition + topCompartmentHeight;

    const newCompartment = new THREE.Mesh( topCompartment.geometry.clone(), topCompartment.material.clone() );

    newCompartment.name = towerName;
    newCompartment.position.set(0, 0, newZPosition)
    
    // newCompartment.material.emissive.setHex( topCompartmentColour );

    selectedTower.unshift(newCompartment);

    msg('TOP COMPARTMENT', topCompartment);
    msg('NEW COMPARTMENT', newCompartment);
    msg('TOWER ======>', selectedTower);
    
    

    
    scene.add(newCompartment);
    
    
}

const addCompartmentBtn = createButton('Add Compartment', addCompartment);


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