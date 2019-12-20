export interface ICompartment {
    id: string;
    structureId: string;
    geometry: IGeometry;
    height: number;
    useType: string;
    attributes: IAttributes;
}

export interface IAttributes {
    GFA: number;
    RHID: string;
}

export interface IGeometry {
    height: number;
    holes: any[];
    points: IPoint[];
    count: number;
    isReadOnly: boolean;
    srid?: any;
}

export interface IPoint {
    x: number;
    y: number;
    z: number;
    srid?: number;
}
