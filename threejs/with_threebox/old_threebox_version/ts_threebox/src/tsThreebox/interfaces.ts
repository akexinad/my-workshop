export interface IThreeboxOptions {
    defaultLights: boolean;
    passiveRendering: boolean;
}

export interface ICameraState {
    fov: number;
    translateCenter: THREE.Matrix4;
    worldSizeRatio: number;
    cameraToCenterDistance: number;
    cameraTranslateZ: THREE.Matrix4;
    topHalfSurfaceDistance: number;
}

export interface ICreateObjectOptions {
    coordinates: {
        lng: number;
        lat: number;
        alt: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
}
