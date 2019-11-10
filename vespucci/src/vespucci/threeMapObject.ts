import * as THREE from 'three';

export class ThreeMapObject extends THREE.Group {
    public coordinates: mapboxgl.LngLat;
    public duration: number;
    public name: string;
    public animationQueue: number[];
    public set: () => void;

    constructor(coordinates: mapboxgl.LngLat) {
        super();
        this.name = 'threemap object';
        this.coordinates = coordinates;
    }

    public setDuration(num: number): void {
        this.duration = num;
    }
}
