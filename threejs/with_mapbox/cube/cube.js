console.log('hello world');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWtleGluYWQiLCJhIjoiY2p0aWJ1b3d1MG53dzQzcGY1eGsyZmhlYSJ9.5M9Nprzz59r7--kUgE_BWA';

var map = window.map = new mapboxgl.Map({
    container: 'map',
    antialias: true,
    zoom: 16.5,
    center: [-79.390307, 43.658956],
    bearing: 20,
    pitch: 60,
    style: 'mapbox://styles/mapbox/light-v9',
    hash: true
});

const THREE = window.THREE;

class ThreeJSCube {
    constructor() {
        this.id = 'mycustomlayer';
        this.type = 'custom';
        this.renderingMode = '3d';

        this.translate = [0.279471, 0.364935, 0.0000025];
        this.scale = 0.000003;

        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 0xeeeeff});
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);
    }

    onAdd(map, gl) {
        this.map = map;

        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl
        });

        this.renderer.autoClear = false;
    }

    render(gl, matrix) {
        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4().makeTranslation(this.translate[0], this.translate[1], this.translate[2])
            .scale(new THREE.Vector3(this.scale, -this.scale, this.scale));
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;

        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
}





map.on('load', () => {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#ccc',
            'fill-extrusion-height': ["get", "height"]
        }
    });

    map.addLayer(new ThreeJSCube());
});