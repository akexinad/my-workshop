export const CONSTANTS = {
    WORLD_SIZE: 1024000,
    MERCATOR_A: 6378137.0, // 900913 projection property
    PROJECTION_WORLD_SIZE: 1024000 / (6378137.0 * Math.PI * 2),
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    EARTH_CIRCUMFERENCE: 40075000, // In meters
}