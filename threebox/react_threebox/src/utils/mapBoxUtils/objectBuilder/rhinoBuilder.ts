import * as THREE from "three";
import { IPoint, IGeometry, INode, INodeContent, IDataModel, IMotherNode, ISortedNodes, IRenderedObjects, INode, IChildNode, IMotherNode } from "./interfaces";

const GREEN = 0x2bb600;
const RED = 0x6a0000;
const BLUE = 0x002d6a;

class Vector2 extends THREE.Vector2 {
    public x: number;
    public y: number;
    public z: number;
    public srid: number;

    constructor(point: IPoint) {
        super(point.x, point.y);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

class Vector3 extends THREE.Vector3 {
    public x: number;
    public y: number;
    public z: number;
    public srid: number;

    constructor(point: IPoint) {
        super(point.x, point.y);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

class Geometry extends THREE.ExtrudeBufferGeometry {
    public vector2Array: Vector2[];
    public vector3Array: Vector3[];

    constructor(geometry: IGeometry) {
        const vector2Array: Vector2[] = [];
        const vector3Array: Vector3[] = [];

        const extrudeSettings = {
            depth: geometry.height ? geometry.height : 0,
            steps: 1,
            bevelEnabled: false
        }

        geometry.points.forEach((point) => {
            vector2Array.push(new Vector2(point));
            vector3Array.push(new Vector3(point));
        });

        const shape = new THREE.Shape(vector2Array);

        super(shape, extrudeSettings);

        this.vector2Array = vector2Array;
        this.vector3Array = vector3Array;
    }
}

class Material extends THREE.MeshLambertMaterial {
    public originalHex: number;

    constructor(color = RED, opacity = 1) {
        const options = {
            color,
            transparent: true,
            opacity
        }

        super(options);

        this.originalHex = color;
    }
}

class Mesh extends THREE.Mesh {
    public parentNode: INodeContent;
    public nodeContent: INodeContent

    constructor(node: INode, geometry: Geometry, material: THREE.Material) {
        const { id, name, type, parent } = node;
        const zPosition = node.geometry.points[0].z;

        super(geometry, material);

        this.nodeContent = {
            id,
            name,
            type
        };

        this.parentNode = parent;
        this.position.set(0, 0, zPosition);
    }
}


class rhinoBuilder {

    public data: IDataModel;
    public classifications = {
        VOLUME: "volumeCollection",
        REGION: "regionCollection"
    };
    public nodeTree: IMotherNode[];
    public sortedNodes: ISortedNodes;
    public renderedObjects: IRenderedObjects = {
        volume: null,
        region: null
    };

    constructor(data: IDataModel) {
        this.data = data;
        this.nodeTree = this.mapNodes();

    }

    private mapNodes() {
        const nodeTree: IMotherNode[] = [];
        const masterNode: INode = this.data.data.nodeItemById;

        const { id, name } = masterNode.groupByGroupId;
        const childNodes: INode[] = masterNode.nodeItemsByParentNodeId.nodes;

        const parent = {
            id,
            name: name.toLowerCase(),
            type: 'group'
        }

        nodeTree.push({
            id,
            name: name.toLowerCase(),
            type: 'group',
            geometry: null,
            nodes: childNodes.map(node => recurseNodeMapping(node, parent))
        });

        function recurseNodeMapping(node: INode, parentDetails: INodeContent): IChildNode {
            let nodeContent: IChildNode = {
                id: null,
                name: null,
                type: null,
                parent: parentDetails,
                geometry: null
            };

            let parent = {
                id: null,
                name: null,
                type: null
            };

            const { groupByGroupId, regionByRegionId, volumeByVolumeId } = node;

            if (groupByGroupId) {
                const { id, name } = groupByGroupId;

                nodeContent.id = id;
                nodeContent.name = name.toLowerCase();
                nodeContent.type = 'group';

                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeContent.type
                }
            } if (regionByRegionId) {
                const { id, name, oliveGeometry } = regionByRegionId;

                nodeContent.id = id;
                nodeContent.name = name.toLowerCase();
                nodeContent.type = 'region',
                    nodeContent.geometry = JSON.parse(oliveGeometry);

                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeContent.type
                }
            } if (volumeByVolumeId) {
                const { id, name, oliveGeometry } = volumeByVolumeId;

                nodeContent.id = id;
                nodeContent.name = name.toLowerCase();
                nodeContent.type = 'volume';
                nodeContent.geometry = JSON.parse(oliveGeometry);

                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeContent.type
                }
            }

            return {
                ...nodeContent,
                nodes: node.nodeItemsByParentNodeId ?
                    node.nodeItemsByParentNodeId.nodes.map(node => recurseNodeMapping(node, parent)) : null
            }
        }

        return nodeTree;

    }


}