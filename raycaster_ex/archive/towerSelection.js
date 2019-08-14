function createRaycaster() {

    raycaster.setFromCamera( mouse, camera );
    
    // Because raycaster is terrible at picking items,
    // we need to filter all the children that belong to the tower
    //that has been selected by the raycaster and store them
    // in a variable.
    let newSelection = null;

    // We need to compare the new selection with the current selection.
    // let currentSelection = null;

    // Storing the shitty selection by raycaster.
    let selection = raycaster.intersectObjects( scene.children );

    if ( selection.length > 0 ) {

        let currentSelection = scene.children.filter( compartments => {
            return compartments.name === selection[0].object.name;
        });
        
        if ( currentSelection[0].object !== selection[0].object ) {
            
            if (currentSelection) {
                
                // First, reset the current selection's colour.
                currentSelection.forEach( compartment => {
                    compartment.material.emissive.setHex( currentSelection.currentHex );
                });
                
            }
            
            // Filter out all compartments that belong to this selected tower.
            newSelection = scene.children.filter( compartments => {
                return compartments.name === selection[0].object.name;
            });
            
            // Store is colour so we can retrieve it.
            newSelection.currentHex = newSelection[0].material.emissive.getHex();
            
            // Change selected tower's colour to yellow.
            newSelection.forEach( compartment => {
                compartment.material.emissive.setHex( 0xffff00 );
            });

            // selected tower now becomes the current selection,
            // ready for comparison.
            currentSelection = newSelection;

        }

    } else {
        
        // if (currentSelection) {
        //     currentSelection.forEach( compartment => {
        //         compartment.material.emissive.setHex( currentSelection.currentHex );
        //     });
        // }

        currentSelection = null;
    }



    
}