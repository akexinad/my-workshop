function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor('white');

    renderer.shadowMap.enabled = true;

    const output = document.querySelector('#output');
    output.appendChild(renderer.domElement);
    return renderer;
}

function createScene() {
    const scene = new THREE.Scene();
    return scene;
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(
       45,
       window.innerWidth / window.innerHeight,
       0.1,
       1000
    );

    camera.position.x = -30;
    camera.position.y = 50;
    camera.position.z = 30;
    return camera;
}

function createLight() {
    const pointLight = new THREE.PointLight('#FFFFFF', 1.2);
    pointLight.position.x = 4;
    pointLight.position.y = 30;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    return pointLight;
}

function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(100);
    return axesHelper;
}

function createLightHelper(light) {
    const helper = new THREE.PointLightHelper(light);
    return helper;
}

function addOrbitControls(camera, renderer) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    return controls;
}




// ===================
// POINT
// ===================


class Point {
    
    constructor(x, y, z, srid) {
        this._point = new THREE.BufferGeometry();
        const vertex = new Float32Array([x, y, z]);
        this._point.addAttribute('vertex', new THREE.BufferAttribute(vertex, 3));
        this.srid = srid;
        
        this.X = this._point.getAttribute('vertex').getX(0);
        this.Y = this._point.getAttribute('vertex').getY(0);
        this.Z = this._point.getAttribute('vertex').getZ(0);
    }   
}


// const olivePoint = new Point(222, 333, 444, 1234567890);
// console.log("OLIVE POINT ====>", olivePoint);




// ==================
// RING
// ==================


class Ring extends THREE.LineLoop {

    constructor(points) {
        const ring = new THREE.BufferGeometry();
        const newPoints = [];

        // Instantiate new Point classes from each coordinate of the polygon.
        points.forEach(point => {
            newPoints.push(new Point(point.x, point.y, point.z));
        });
        
        if (newPoints[0] === newPoints[newPoints.length - 1]) {
            newPoints.pop();
        }
        
        let verticesList = [];
        
        // Create an array of all the coordinates in order to instantiate
        // a new Float32Array which can then be used to instantiate a new Ring.
        newPoints.forEach( vertex => verticesList.push(vertex.X, vertex.Y, vertex.Z));
        
        const vertices = new Float32Array(verticesList);
        
        ring.addAttribute('vertices', new THREE.BufferAttribute(vertices, 3));

        super(ring);
    }
}


// const oliveRing = new Ring(silverTownData);
// console.log("OLIVE RING ====>", oliveRing);




// ==================
// EXTRUSION
// ==================




class OliveGeometry extends THREE.ExtrudeBufferGeometry {

    constructor(data) {

        const ring = new Ring(data);
        const groupedCoordinates = [];
        const vector3Array = [];

        const ringArray = ring.geometry.getAttribute('vertices').array;

        for (let i = 0, end = ringArray.length / 3; i < end; i++) {
            groupedCoordinates.push(ringArray.slice(i * 3, (i + 1) * 3));
        }

        groupedCoordinates.forEach( coord => {
            vector3Array.push( new THREE.Vector3(coord[0], coord[1], coord[2]) );
        });

        const shape = new THREE.Shape(vector3Array);

        const extrusionSettings = {
            depth: ring.geometry.getAttribute('vertices').getZ(0),
            steps: 1,
            bevelEnabled: false
        };

        super(shape, extrusionSettings);
    }
    
}


// const oliveGeometry = new OliveGeometry(silverTownData);
// console.log("OLIVE GEOMETRY ====>", oliveGeometry);




// ==================
// MESH
// ==================


class OliveMesh extends THREE.Mesh {

    constructor(data, colour) {

        const geometry = new OliveGeometry(data);

        const material = new THREE.MeshLambertMaterial({
            color: colour
        });

        super(geometry, material);
    }
}



// const oliveMesh = new OliveMesh(silverTownData, '#D40000');
// console.log("OLIVE MESH ====>", oliveMesh);


console.log('SILVERTOWN ====>', silvertown);
console.log("======= LOOP ====>");

// console.log(silvertown[0].scenarios[0].structures[0].compartments);
// console.log("Silvertown geometry ====>", silvertown[0].scenarios[0].structures[0].compartments[0].geometry);






const renderer = createRenderer();
const scene = createScene();
const camera = createCamera(scene);
const axes = createAxesHelper();
const light = createLight();
const lightHelper = createLightHelper(light);

scene.add(axes, light, lightHelper);


silvertown.forEach( project => {
    project.scenarios[0].structures[0].compartments.forEach( compartment => {
        console.log(compartment.geometry);

        const mesh = new OliveMesh(compartment.geometry, '#D40000');
        
        scene.add(mesh);     
    })
    
});

//////////////////////////////////////

// scene.add(compartment);
// scene.add(oliveMesh);

//////////////////////////////////////

addOrbitControls(camera, renderer);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// renderer.render(scene, camera)
animate();