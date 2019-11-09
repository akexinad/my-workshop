import THREE from 'three';

export class Vespucci {
    public world: THREE.Group;
    private map: mapboxgl.Map;
    private glContext: WebGLRenderingContext;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;


    constructor(
        public mapboxMapInstance: mapboxgl.Map,
        public webGLContext: WebGLRenderingContext,
    ) {
        this.map = mapboxMapInstance;
        this.glContext = webGLContext;

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.map.getCanvas(),
            context: this.glContext
        });

        this.renderer.shadowMapEnabled = true;
        this.renderer.autoClear = false;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            28,
            window.innerWidth / window.innerHeight,
            0.000000000001,
            Infinity
        );

        // The CameraSync object will keep the Mapbox and THREE.js camera movements in sync.
        // It requires a world group to scale as we zoom in. Rotation is handled in the camera's
        // projection matrix itself (as is field of view and near/far clipping)
        // It automatically registers to listen for move events on the map so we don't need to do that here
        this.world = new THREE.Group();
        this.scene.add(this.world);
    }

}
