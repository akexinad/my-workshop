import * as THREE from 'three';

export class ThreeMapObject extends THREE.Group {
    public coordinates: mapboxgl.LngLat;
    public duration: number;
    public name: string;

    constructor(coordinates: mapboxgl.LngLat) {
        super();
        this.name = 'threemap object';
        this.coordinates = coordinates;
    }

    public setDuration(num: number) {
        this.duration = num;
    }
}
