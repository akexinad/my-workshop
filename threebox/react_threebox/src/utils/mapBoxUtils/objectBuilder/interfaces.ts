export interface IPoint {
    x: number;
    y: number;
    z: number;
    srid: number;
}

export interface IGeometry {
    count: number;
    holes?: IPoint[];
    holesCount: number;
    points: IPoint[]
    height?: number;
}


/***************************************************************** */
/***************** THE DATA MODEL **********************************/
/******************************** **********************************/


export interface IDataModel {
    data: IMasterNode
}

export interface IMasterNode {
    __typename: string;
    nodeItemById: IChildNode;
}

export interface IChildNode {
    id: string;
    groupByGroupId?: IGroupNodeContent;
    regionByRegionId?: IRegionNodeContent;
    volumeByVolumeId?: IVolumeNodeContent;
    nodeItemsByParentNodeId: INodeItemsByParentNode;
}

interface IGroupNodeContent {
    name: string;
    id: string;
    groupType: number;
}

interface IRegionNodeContent {
    name: string;
    id: string;
    regionType: number;
    oliveGeometry: string;
}

interface IVolumeNodeContent {
    name: string;
    id: string;
    volumeType: number;
    oliveGeometry: string;
}

interface INodeItemsByParentNode {
    nodes: IChildNode[];
    totalCount: number;
}


/************************************************************ */
/********************* THE NODE TREE ************************ */
/************************************************************ */

export interface INodeTree {
    id: string;
    name: string;
    type: string;
    geometry?: IGeometry;
    nodes: INodeBranch[];
}[]

export interface INodeBranch extends INodeTree {
    parent: INodeContent;
}

export interface INode {
    id: string;
    name: string;
    type: string;
    parent: INodeContent;
    geometry?: IGeometry;
}

export interface INodeContent {
    id: string;
    name: string;
    type: string;
}

/************************************************************ */
/*********** SORTED NODES *********************************** */
/************************************************************ */


export interface ISortedNodes {
    groups: INode[];
    regions: INode[];
    volumes: INode[];
}

export interface IRenderedObjects {
    volume: THREE.Group;
    region: THREE.Group;
}