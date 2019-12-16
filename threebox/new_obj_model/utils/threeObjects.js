function makeCube() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
        color: 0x6a0000,
        transparent: true,
        opacity: 1
    });

    var cube = new THREE.Mesh(geometry, material);
    return cube;
}