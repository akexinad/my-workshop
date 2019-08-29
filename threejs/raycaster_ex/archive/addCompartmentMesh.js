silvertown.forEach( project => {
    project.scenarios[0].structures[0].compartments.forEach( compartment => {

        const mesh = new OliveMesh(compartment, '#D40000');
        
        scene.add(mesh);     
    })
});

project1Compartments.forEach( compartment => {
    const mesh = new OliveMesh(compartment, '#D40000');

    scene.add(mesh);
})



function addCompartmentMesh(structureData, colour) {
    
    const structureGroup = new THREE.Group();
    structureGroup.name = 'structures';

    const compartmentGroup = new THREE.Group();
    compartmentGroup.name = 'compartments';

    structureGroup.add(compartmentGroup);

    structureData.compartments.forEach( compartment => {
        console.log('COMPARTMENT INSIDE THE LOOP ====>', compartment);

        const compartments = new OliveMesh(compartment, colour);

        compartmentGroup.add(compartments);
    });
    
    scene.add(structureGroup);
}


addCompartmentMesh(silvertownStructure, 'red');