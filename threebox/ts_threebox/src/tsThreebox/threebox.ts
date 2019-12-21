import * as THREE from "three";
import { CameraSync } from "./camera/cameraSync";
import { IThreeboxOptions, ICreateObjectOptions } from "./interfaces";
import { TBObject } from "./object";

export class Threebox {
    private map: mapboxgl.Map;
    private webGlContext: WebGLRenderingContext;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private world: THREE.Group;
    private cameraSync: CameraSync;
    private raycaster: THREE.Raycaster;
    private options: IThreeboxOptions;

    constructor(
        map: mapboxgl.Map,
        webGlContext: WebGLRenderingContext,
        options: IThreeboxOptions = {
            defaultLights: true,
            passiveRendering: true
        }
    ) {
        this.map = map;
        this.webGlContext = webGlContext;

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.map.getCanvas(),
            context: this.webGlContext
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.autoClear = false;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            28,
            window.innerWidth / window.innerHeight,
            0.000000000001,
            Infinity
        );

        this.world = new THREE.Group();
        this.scene.add(this.world);

        /**

        The CameraSync object will keep the Mapbox and THREE.js camera movements in sync.
        It requires a world group to scale as we zoom in. Rotation is handled in the camera's
        projection matrix itself (as is field of view and near/far clipping)
        It automatically registers to listen for move events on the map so we don't need to do that here

        */

        this.cameraSync = new CameraSync(this.map, this.camera, this.world);

        this.raycaster = new THREE.Raycaster();

        this.options = options;

        if (this.options.defaultLights) {
            this.scene.add(new THREE.AmbientLight(0xffffff));
            const sunlight = new THREE.DirectionalLight(0xffffff, 0.25);
            sunlight.position.set(0, 80000000, 100000000);
            sunlight.matrixWorldNeedsUpdate = true;
            this.world.add(sunlight);
        }
    }

    public createObject = (
        object: THREE.Mesh,
        options: ICreateObjectOptions = {
            coordinates: {
                lng: 0,
                lat: 0,
                alt: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    ) => {
        const tbObject = new TBObject(object, options);
        return tbObject;
    };

    public update = () => {
        if (this.map.repaint) this.map.repaint = false;

        var timestamp = Date.now();

        // Update any animations
        // this.objects.animationManager.update(timestamp);

        this.renderer.state.reset();

        // Render the scene and repaint the map
        this.renderer.render(this.scene, this.camera);

        if (this.options.passiveRendering === false) this.map.triggerRepaint();
    };

    public add = (object: THREE.Group ) => {
        this.world.add(object);
    };

    public remove = (object: THREE.Group) => {
        this.world.remove(object);
    };
}
