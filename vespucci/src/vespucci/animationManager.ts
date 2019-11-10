export class AnimationManager {
    public map: mapboxgl.Map;
    public enrolledObjects: THREE.Group[];
    public previousTimeFrame: Date;

    constructor(
        mapboxMap: mapboxgl.Map
    ) {
        this.map = mapboxMap;
        this.enrolledObjects = [];
    }

    public enroll(): void {

    }

}
