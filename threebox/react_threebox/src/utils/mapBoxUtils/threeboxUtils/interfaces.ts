// @ts-ignore
import { Threebox, THREE } from "threebox-map";

/***************************************************************** */
/***************** THE DATA MODEL **********************************/
/******************************** **********************************/

export interface IRootObject {
    data: IRootData;
}

export interface IRootData {
    __typename: string;
    nodeItemById: INodeItemById;
}

export interface INodeItemById {
    id: string;
    groupByGroupId: IGroupByGroupId;
    regionByRegionId?: IRegionByRegionId;
    volumeByVolumeId?: IVolumeByVolumeId;
    nodeItemsByParentNodeId: INodeItemsByParentNodeId;
}

interface INodeItemsByParentNodeId {
    totalCount: number;
    nodes: INode[];
}

export interface INode {
    id: string;
    groupByGroupId: IGroupByGroupId;
    regionByRegionId: IRegionByRegionId;
    volumeByVolumeId: IVolumeByVolumeId;
    nodeItemsByParentNodeId?: INodeItemsByParentNodeId;
}

export interface IVolumeByVolumeId {
    id: string;
    name: string;
    useType: number;
    volumeType: number;
    oliveGeometry: string;
}

export interface IRegionByRegionId {
    name: string;
    id: string;
    regionType: number;
    oliveGeometry: string;
}

export interface IGroupByGroupId {
    name: string;
    id: string;
    groupType: number;
}

/************************************************************ */
/********************* THE NODE TREE ************************ */
/************************************************************ */

export interface INodeTree {
    id: string;
    name: string;
    type: "group" | "region" | "volume";
    geometry: IGeometryData;
    nodes: INodeTree[];
    parent?: INodeContent;
}

export interface IGeometryData {
    count: number;
    holes: IPoint[];
    holesCount: number;
    points: IPoint[];
    height?: number;
}

export interface IPoint {
    x: number;
    y: number;
    z: number;
    srid: number;
}

export interface INodeContent {
    id: string;
    name: string;
    type: "group" | "region" | "volume";
    parent: INodeContent;
}

/************************************************************ */
/*********** SORTED NODES *********************************** */
/************************************************************ */

export interface IGroupedNodesByType {
    groups: ISortedNodeContent[];
    regions: ISortedNodeContent[];
    volumes: ISortedNodeContent[];
}

export interface ISortedNodeContent {
    id: string;
    name: string;
    type: "group" | "region" | "volume";
    parent?: INodeContent;
    geometry?: IGeometryData;
}

export interface IRenderedObjects {
    volume: THREE.Group;
    region: THREE.Group;
}

export interface IMaterial extends THREE.Material {
    originalHex: number;
    color?: {
        setHex: (color: number) => void;
    };
    opacity: number;
}

export interface IMesh extends THREE.Mesh {
    material: IMaterial;
    nodeContent: INodeContent;
}

export interface IRhinoBuilder {
    data: IRootObject;
    nodeTree: INodeTree[];
    groupedNodesByType: IGroupedNodesByType;
    renderedObjects: IRenderedObjects;

    buildVolumes: (volumeName: string) => THREE.Group;
    buildRegions: (regionName: string) => THREE.Group;
    repaint: (renderedObjectsByType: IRenderedObjects["region"] | IRenderedObjects["volume"]) => void;
    selectObject: (object: IMesh, wantsBuilding: boolean) => void; 
}

export interface IRhinoToMap {
    tb: Threebox;
    map: mapboxgl.Map;
    data: IRootObject;
    masterPlan: IRhinoBuilder;
    layerId: mapboxgl.Layer["id"];
    addThreeboxLayer: (layerId: string) => void;
    removeThreeboxLayer: (layerId: string) => void;
    raycaster: (wantsBuilding: boolean) => void;
}