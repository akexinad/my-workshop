
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



/*

======================

OLIVE GEOMETRY CLASSES

======================

*/



console.log("DATA SOURCE: ", dataPolygon2[0]);
// console.log("CUBE DATA: ", dataCube);

// console.log(polygonData.map( point => point.Z));

const vertices = [];

const test = dataPolygon2.map( point => vertices.push(point.X, point.Y, point.Z));

// console.log(vertices);

const flt32Arr = new Float32Array(vertices);
// console.log(flt32Arr);


// console.log("TEST ===>: ", test);


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


const newPoint = new Point(222, 333, 444, 1234567890);

// console.log("NEW POINT ======>", newPoint);




// ==================
// CREATING THE RING
// ==================


class Ring extends THREE.LineLoop {

    constructor(points) {
        const ring = new THREE.BufferGeometry();
        const verticesList = [];

        points.forEach(point => {
            verticesList.push(point.X, point.Y, point.Z);
        });

        if (verticesList[0] === verticesList[verticesList.length - 1]) {
            verticesList.pop()
        }

        const vertices = new Float32Array(verticesList);
        ring.addAttribute('vertices', new THREE.BufferAttribute(vertices, 3));

        super(ring);
    }
}

const ring = new Ring(dataPolygon2);
// console.log(ring);






class Compartment extends THREE.Mesh {

    constructor(data, materialType, colour) {

        // const geometry = new Ring(data);
        const geometry = new THREE.BufferGeometry(data);
        const material = new THREE[materialType]({
            color: colour
        })

        super(geometry, material)
    }
}

const model = new Compartment(dataPolygon2, 'MeshLambertMaterial', '#D40000');

// console.log("RING MODEL ====> ", model);


// const geom = new THREE.BufferGeometry()
// geom.addAttribute('position', new THREE.BufferAttribute( flt32Arr, 3 ));

// const mat = new THREE.MeshLambertMaterial({
//     color: '#D40000'
// })

// const mesh = new THREE.Mesh( geom, mat );

// console.log(mesh);



class Polygon2 extends THREE.Shape {

    constructor(data) {
        
        const ring = new Ring(data);
        
        // const vertices = ring.geometry.getAttribute('vertices').array;
        const vertices = ring.geometry.getAttribute('vertices').getZ(0);
        // console.log(vertices);
        
        
        // const extrudeSettings = {
        //     steps: 2,
        //     depth: ring.geometry.getAttribute('vertices').getZ(0),
        //     bevelEnabled: false
        // }

        super();
        
        // this.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    }
}

const pol = new Polygon2(dataPolygon2);










// ==================
// CREATING THE SHAPE
// ==================


class Polygon extends THREE.Shape {

    constructor(data) {
        const vertices = data.map( vertex => {
            return new THREE.Vector3(vertex.X, vertex.Y, vertex.Z);
        });

        console.log(vertices);

        super(vertices);
    }
}




// =====================
// CREATING THE GEOMETRY
// =====================


class ExtrusionGeometry extends THREE.ExtrudeBufferGeometry {

    constructor(shape, height) {
        // const extrusion = new Polygon(data)
        // const height = data[0].z
        
        const options = {
            depth: height,
            steps: 1,
            bevelEnabled: false
        }
        
        super(shape, options);
    }
}




// =================
// CREATING THE MESH
// =================


class CompartmentMesh extends THREE.Mesh {

    constructor(geometry, materialType, colour) {
        const material = new THREE[materialType]({
            color: colour
        });

        super(geometry, material)

        console.log("THIS COMPARTMENT PROPERTIES:", this.geometry.parameters.options.depth);
    }
}

// const roomStructure = new CompartmentMesh(geometry, 'MeshLambertMaterial', '#D40000');

// console.log("THE ROOM ====> ", roomStructure);


// const polygonShape = new Polygon(dataPolygon2);
// console.log("POLYGON SHAPE ====>", polygonShape);

// const geometry = new ExtrusionGeometry(polygonShape, 10);
// console.log("GEOMETRY ====> ", geometry);

// const material = new THREE.MeshLambertMaterial({
//     color: '#D40000'
// })

// const compartment = new THREE.Mesh(geometry, material);














// var length = 12, width = 8;

// var shape = new THREE.Shape();
// shape.moveTo( 0,0 );
// shape.lineTo( 0, width );
// shape.lineTo( length, width );
// shape.lineTo( length, 0 );
// shape.lineTo( 0, 0 );

// var extrudeSettings = {
// 	steps: 2,
// 	depth: 16,
// 	bevelEnabled: false,
// 	bevelThickness: 1,
// 	bevelSize: 1,
// 	bevelOffset: 0,
// 	bevelSegments: 1
// };

// var extgeom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

// var buffgeom = new THREE.BufferGeometry();

// buffgeom.fromGeometry( extgeom );
// var mat = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// var mesh = new THREE.Mesh( buffgeom, mat ) ;



// var geometry = new THREE.BufferGeometry();
// // create a simple square shape. We duplicate the top left and bottom right
// // vertices because each vertex needs to appear once per triangle.
// var vertices2 = new Float32Array( [
// 	-10.0, -10.0,  10.0,
// 	 10.0, -10.0,  10.0,
// 	 10.0,  10.0,  10.0,

// 	 10.0,  10.0,  10.0,
// 	-10.0,  10.0,  10.0,
// 	-10.0, -10.0,  10.0
// ] );

// // itemSize = 3 because there are 3 values (components) per vertex
// geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices2, 3 ) );
// var material = new THREE.MeshBasicMaterial( { color: '#D40000' } );
// var mesh = new THREE.Mesh( geometry, material );






const renderer = createRenderer();
const scene = createScene();
const camera = createCamera(scene);
const axes = createAxesHelper();
const light = createLight();
const lightHelper = createLightHelper(light);

scene.add(axes, light, lightHelper);

//////////////////////////////////////

// scene.add(compartment);
// scene.add(mesh);

//////////////////////////////////////

addOrbitControls(camera, renderer);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

renderer.render(scene, camera)
// animate();





