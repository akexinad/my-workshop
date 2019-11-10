import { ThreeMapObject } from './threeMapObject';

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

    public enroll(object: ThreeMapObject): void {

        /* Extend the provided object with animation-specific properties and track in the animation manager */

        this.enrolledObjects.push(object);

        // Give this object its own internal animation queue
        object.animationQueue = [];

        object.set = () => {

        };
    }

}
