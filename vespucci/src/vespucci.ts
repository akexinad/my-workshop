import Mapbox from 'mapbox-gl';
import THREE from 'three';

export class Vespucci {

    constructor(
        private mapbox: Mapbox.Map,
        private webGLContext: WebGLRenderingContext,
        private three: THREE.Group
    ) { }
}

