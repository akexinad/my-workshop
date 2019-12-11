const createTBObject3D = (threeMesh) => {
    const obj = tb.Object3D({
        obj: threeMesh,
        units: 'meters'
    })
    .setCoords( COORDINATES.EUSTON )
    .set({ 
        rotation: {
            x: 0, y: 0, z: 180
        }
    });

    tb.add(obj);
}