class Ring extends THREE.LineLoop {

    constructor(points: Point[]) {
        const ring = new THREE.BufferGeometry();
        const verticesList: [] = [];

        // console.log("POINTS IN RING CLASS ===>", points);
        
        
        points.forEach(point => {
            verticesList.push(point.X, point.Y, point.Z);
        });

        if (verticesList[0] == verticesList[verticesList.length - 1])
        {
            verticesList.pop()
        }

        console.log(verticesList);
        
        const vertices = new Float32Array(verticesList);
        ring.addAttribute('vertices', new THREE.BufferAttribute(vertices, 3));

        super(ring);
    }   
}
