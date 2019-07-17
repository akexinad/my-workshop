class OliveShape extends THREE.Shape {

    constructor(ring: Ring) {
        const ringArr = ring.geometry.getAttribute('vertices').array;
        const groupedCoordinates = [];

        for (let i = 0, end = ringArr.length / 3; i < end; i++) {
            groupedCoordinates.push(ringArr.slice(i * 3, (i + 1) * 3));
        }

        const vector3Array: THREE.Vector3[] = [];
        
        groupedCoordinates.forEach( coord => {
            vector3Array.push( new THREE.Vector3(coord[0], coord[1], coord[2]) );
        });

        super(vector3Array);
    }       
}

// https://stackoverflow.com/questions/20281697/three-js-creating-a-custom-shape-geometry

// https://stackoverflow.com/questions/38659098/extrude-buffer-geometry-in-three-js