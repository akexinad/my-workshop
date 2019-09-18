const projectTestDataScenario = projectTestData2[0].scenarios[0]
            const projectTestData2Scenario = projectTestData3[0].scenarios[0]
            const projectTestData3Scenario = projectTestData4[0].scenarios[0]

            


            projectTestData3Scenario.structures.forEach( structure => {
                
                const revCompartments = structure.compartments.reverse();
                
                revCompartments.forEach( compartment => {

                    let mesh = new OliveMesh( compartment );
                    
                    createTBObject3D(mesh, coords.siena, defaultOptions);
                });
            });
