export interface ICameraState {
    fov: number;
    translateCenter: THREE.Matrix4;
    worldSizeRatio: number;
    cameraToCenterDistance?: number;
    cameraTranslateZ?: THREE.Matrix4;
    topHalfSurfaceDistance?: number;
}

export interface IRotation {
    x: number;
    y: number;
    z: number;
}