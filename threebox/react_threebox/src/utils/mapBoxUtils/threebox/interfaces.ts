// @ts-ignore
import { THREE } from "threebox-map";

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
    groupByGroupId?: any;
    regionByRegionId?: any;
    volumeByVolumeId?: IVolumeByVolumeId;
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

export interface INodeBranch {
    id: string;
    name: string;
    type: "group" | "region" | "volume";
    geometry: IOliveGeometry;
    nodes: INodeBranch[];
    parent?: IParentNodeContent;
}

export interface IOliveGeometry {
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

export interface IParentNodeContent {
    id: string;
    name: string;
    type: "group" | "region" | "volume";
}

/************************************************************ */
/*********** SORTED NODES *********************************** */
/************************************************************ */

export interface ISortedNodes {
    groups: ISortedNodeContent[];
    regions: ISortedNodeContent[];
    volumes: ISortedNodeContent[];
}

export interface ISortedNodeContent {
    id: string;
    name: string;
    type: "group" | "region" | "volume";
    parent?: IParentNodeContent;
    geometry?: IOliveGeometry;
}

export interface IRenderedObjects {
    volume?: THREE.Group;
    region?: THREE.Group;
}

export interface IMaterial extends THREE.Material {
    originalHex: number;
    color?: {
        setHex: (color: number) => void;
    }
}

export interface IMesh extends THREE.Mesh  {
    position: {
        set: (x: number, y: number, z: number) => void;
    }
    material: IMaterial;
    nodeContent: IParentNodeContent;
    parentNode: IParentNodeContent;
}