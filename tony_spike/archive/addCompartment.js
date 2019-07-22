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
    msg('SELECTION ====>', selection);
    msg('SELECTED TOWER ======>', selectedTower);
    
    

    
    scene.add(newCompartment);
    
    
}