const sphere = tb.sphere({
    radius: 300,
    units: 'meters',
    sides: 50,
    color: 'blue',
    material: 'MeshLambertMaterial'
})
.setCoords(coords.tognazza)

tb.add(sphere);