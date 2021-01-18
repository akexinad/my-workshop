import * as THREE from "three";
import { CONSTANTS } from "../utils/constants";
import { utils } from "../utils/utils";
import { ICameraState } from "../interfaces";


interface IMapTransform extends mapboxgl.Map {
    transform: {
        tileSize: number;
    };
}

export class CameraSync {
    map: mapboxgl.Map;
    camera: THREE.PerspectiveCamera;
    active: boolean;
    world: THREE.Group;
    state: ICameraState;
    cameraSync: CameraSync;

    constructor(
        map: mapboxgl.Map,
        camera: THREE.PerspectiveCamera,
        world: THREE.Group
    ) {
        this.map = map;
        this.camera = camera;
        this.active = true;

        // This lets us be in charge of the camera.
        this.camera.matrixAutoUpdate = false;

        // Postion and configure the world group so we can scale it appropriately when the camera zooms
        this.world = world || new THREE.Group();
        this.world.position.x = this.world.position.y =
            CONSTANTS.WORLD_SIZE / 2;
        this.world.matrixAutoUpdate = false;

        this.state = {
            fov: 0.6435011087932844,
            translateCenter: new THREE.Matrix4(),
            worldSizeRatio: 512 / CONSTANTS.WORLD_SIZE,
            cameraToCenterDistance: 0,
            cameraTranslateZ: new THREE.Matrix4(),
            topHalfSurfaceDistance: 0
        };

        this.state.translateCenter.makeTranslation(
            CONSTANTS.WORLD_SIZE / 2,
            -CONSTANTS.WORLD_SIZE / 2,
            0
        );

        this.cameraSync = this;

        this.map
            .on("move", () => this.cameraSync.updateCamera())
            .on("resize", () => this.cameraSync.setUpCamera());

        this.setUpCamera();
    }

    private setUpCamera = () => {
        // NOTE: The transform method does exists on the map instance.
        // @ts-ignore
        let t = this.map.transform;
        console.log(t);

        const halfFov = this.state.fov / 2;
        let cameraToCenterDistance = (0.5 / Math.tan(halfFov)) * t.height;
        const groundAngle = Math.PI / 2 + t._pitch;

        this.state.cameraToCenterDistance = cameraToCenterDistance;
        this.state.cameraTranslateZ = new THREE.Matrix4().makeTranslation(
            0,
            0,
            cameraToCenterDistance
        );
        this.state.topHalfSurfaceDistance =
            (Math.sin(halfFov) * cameraToCenterDistance) /
            Math.sin(Math.PI - groundAngle - halfFov);

        this.updateCamera();
    }

    private updateCamera = () => {
        if (!this.camera) {
            console.error("no camera");
            return;
        }

        // @ts-ignore
        let t = this.map.transform;

        // Calculate z distance of the farthest fragment that should be rendered.
        const furthestDistance =
            Math.cos(Math.PI / 2 - t._pitch) *
                this.state.topHalfSurfaceDistance +
            this.state.cameraToCenterDistance;

        // Add a bit extra to avoid precision problems when a fragment's distance is exactly `furthestDistance`
        const farZ = furthestDistance * 1.01;

        this.camera.projectionMatrix = utils.makePerspectiveMatrix(
            this.state.fov,
            t.width / t.height,
            1,
            farZ
        );

        let cameraWorldMatrix = new THREE.Matrix4();
        let rotatePitch = new THREE.Matrix4().makeRotationX(t._pitch);
        let rotateBearing = new THREE.Matrix4().makeRotationZ(t.angle);

        // Unlike the Mapbox GL JS camera, separate camera translation and rotation out into its world matrix
        // If this is applied directly to the projection matrix, it will work OK but break raycasting

        cameraWorldMatrix
            .premultiply(this.state.cameraTranslateZ)
            .premultiply(rotatePitch)
            .premultiply(rotateBearing);

        this.camera.matrixWorld.copy(cameraWorldMatrix);

        let zoomPow = t.scale * this.state.worldSizeRatio;

        // Handle scaling and translation of objects in the map in the world's matrix transform, not the camera
        let scale = new THREE.Matrix4();
        let translateMap = new THREE.Matrix4();
        let rotateMap = new THREE.Matrix4();

        scale.makeScale(zoomPow, zoomPow, zoomPow);

        let x = -t.point.x;
        let y = t.point.y;

        translateMap.makeTranslation(x, y, 0);

        rotateMap.makeRotationZ(Math.PI);

        this.world.matrix = new THREE.Matrix4();
        this.world.matrix
            .premultiply(rotateMap)
            .premultiply(this.state.translateCenter)
            .premultiply(scale)
            .premultiply(translateMap);
    }
}
