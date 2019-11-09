import * as THREE from 'three';
import mapbox from 'mapbox-gl';
import { Geo3 } from './geo3';
import { GEO_CONSTANTS } from './constants';
import { ICameraState } from './interfaces';
import { Utils } from './utils';

export class CameraSync {
    public map: mapboxgl.Map;
    public camera: THREE.PerspectiveCamera;
    public world: THREE.Group;
    public cameraState: ICameraState;

    constructor(
        public mapboxMap: mapboxgl.Map,
        public perspectiveCamera: THREE.PerspectiveCamera,
        public threeGroupWorld: THREE.Group
    ) {
        this.map = mapboxMap;
        this.camera = perspectiveCamera;

        this.camera.matrixAutoUpdate = false;

        // Postion and configure the world group so we can scale it appropriately when the camera zooms
        this.world = threeGroupWorld;
        this.world.position.x = this.world.position.y = GEO_CONSTANTS.WORLD_SIZE / 2;
        this.world.matrixAutoUpdate = false;

        this.cameraState = {
            fov: 0.6435011087932844,
            translateCenter: new THREE.Matrix4(),
            worldSizeRatio: 512 / GEO_CONSTANTS.WORLD_SIZE
        };

        /*
        Listen for move events from the map and update the Three.js camera.
        Some attributes only change when viewport resizes, so update those accordingly
        */

        const _ = this;

        this.map
            .on('move', () => {
                _.updateCamera();
            })
            .on('resize', () => {
                _.setupCamera();
            });

        this.setupCamera();
    }

    private setupCamera(): void {

        // @ts-ignore
        const t = this.map.transform;
        console.log(t);

        const halfFov = this.cameraState.fov / 2;
        const cameraToCenterDistance = 0.5 / Math.tan(halfFov) * t.height;
        const groundAngle = Math.PI / 2 + t._pitch;

        this.cameraState.cameraToCenterDistance = cameraToCenterDistance;
        this.cameraState.cameraTranslateZ = new THREE.Matrix4().makeTranslation(0, 0, cameraToCenterDistance);
        this.cameraState.topHalfSurfaceDistance = Math.sin(halfFov) * cameraToCenterDistance / Math.sin(Math.PI - groundAngle - halfFov);

        this.updateCamera();
    }

    private updateCamera(): void {

        if (!this.camera) {
            console.error('Camera does not exist');
            return;
        }

        // @ts-ignore
        const t = this.map.transform;

        if (this.cameraState.topHalfSurfaceDistance === undefined || this.cameraState.cameraToCenterDistance === undefined) {
            console.error('Camera has not been set up correctly, check cameraState for undefined values. Camera possibly has not been setup properly.');
            return;
        }

        // Calculate z distance of the farthest fragment that should be rendered.
        const furthestDistance = Math.cos(Math.PI / 2 - t._pitch) * this.cameraState.topHalfSurfaceDistance + this.cameraState.cameraToCenterDistance;

        // Add a bit extra to avoid precision problems when a fragment's distance is exactly `furthestDistance`
        const farZ = furthestDistance * 1.01;

        this.camera.projectionMatrix = Utils.makePerspectiveMatrix(this.cameraState.fov, t.width / t.height, 1, farZ);

        const cameraWorldMatrix = new THREE.Matrix4();
        // const cameraTranslateZ = new THREE.Matrix4().makeTranslation(0, 0, this.cameraState.cameraToCenterDistance);
        const rotatePitch = new THREE.Matrix4().makeRotationX(t._pitch);
        const rotateBearing = new THREE.Matrix4().makeRotationZ(t.angle);

        // Unlike the Mapbox GL JS camera, separate camera translation and rotation out into its world matrix
        // If this is applied directly to the projection matrix, it will work OK but break raycasting

        if (this.cameraState.cameraTranslateZ === undefined) {
            console.error('Camera has not been set up correctly, check cameraState for undefined values. Camera possibly has not been setup properly.');
            return;
        }

        cameraWorldMatrix
            .premultiply(this.cameraState.cameraTranslateZ)
            .premultiply(rotatePitch)
            .premultiply(rotateBearing);

        this.camera.matrixWorld.copy(cameraWorldMatrix);

        const zoomPow = t.scale * this.cameraState.worldSizeRatio;

        // Handle scaling and translation of objects in the map in the world's matrix transform, not the camera
        const scale = new THREE.Matrix4();
        const translateCenter = new THREE.Matrix4();
        const translateMap = new THREE.Matrix4();
        const rotateMap = new THREE.Matrix4();

        scale
            .makeScale(zoomPow, zoomPow, zoomPow);

        // @ts-ignore
        const x = -this.map.transform.x || -this.map.transform.point.x;
        // @ts-ignore
        const y = this.map.transform.y || this.map.transform.point.y;

        translateMap
            .makeTranslation(x, y, 0);

        rotateMap
            .makeRotationZ(Math.PI);

        this.world.matrix = new THREE.Matrix4();
        this.world.matrix
            .premultiply(rotateMap)
            .premultiply(this.cameraState.translateCenter)
            .premultiply(scale)
            .premultiply(translateMap);

    }
}
