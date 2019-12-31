// import * as THREE from "three";
// @ts-ignore
import { THREE } from "threebox-map";
import {
    IPoint,
    IGeometryData,
    INodeContent,
    INodeTree,
    ISortedNodeContent,
    IGroupedNodesByType,
    IRenderedObjects,
    IRootObject,
    INodeItemById,
    INode,
    IMesh,
    IGroupByGroupId,
    IRegionByRegionId,
    IVolumeByVolumeId
} from "./interfaces";

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

export class Vector3 extends THREE.Vector3 {
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

    constructor(geometry: IGeometryData) {
        const vector2Array: Vector2[] = [];
        const vector3Array: Vector3[] = [];

        const extrudeSettings = {
            depth: geometry.height ? geometry.height : 0,
            steps: 1,
            bevelEnabled: false
        };

        geometry.points.forEach(point => {
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
    public opacity: number;

    constructor(color = RED, opacity = 1) {
        const options = {
            color,
            transparent: true,
            opacity
        };

        super(options);

        this.originalHex = color;
        this.opacity = opacity;
    }
}

export class Mesh extends THREE.Mesh {
    public nodeContent: INodeContent;
    public material: Material;

    constructor(
        node: ISortedNodeContent,
        geometry: Geometry,
        material: Material
    ) {
        const { id, name, type, parent } = node;
        const zPosition = node.geometry.points[0].z;

        super(geometry, material);

        this.nodeContent = {
            id,
            name,
            type,
            parent
        };

        this.material = material;
        // @ts-ignore
        this.position.set(0, 0, zPosition);
    }
}

export class RhinoBuilder {
    public data: IRootObject;
    public nodeTree: INodeTree[];
    public groupedNodesByType: IGroupedNodesByType;
    public renderedObjects: IRenderedObjects = {
        volume: null,
        region: null
    }

    constructor(rootData: IRootObject) {
        this.data = rootData;
        this.nodeTree = this.setNodeTree();
        this.groupedNodesByType = this.setGroupedNodesByType();
    }

    private setNodeTree(): INodeTree[] {
        const nodeTree: INodeTree[] = [];
        const masterNode: INodeItemById = this.data.data.nodeItemById;

        const { id, name } = masterNode.groupByGroupId;
        const childNodes: INode[] = masterNode.nodeItemsByParentNodeId.nodes;

        const parent: INodeContent = {
            id,
            name: name.toLowerCase(),
            type: "group",
            parent: null
        };

        const recurseNodeMapping = (node: INode, parentDetails: INodeContent): INodeTree => {
            let nodeBranch: INodeTree = {
                id: null,
                name: null,
                type: null,
                parent: parentDetails,
                geometry: null,
                nodes: null
            };
        
            let parent: INodeContent = {
                id: null,
                name: null,
                type: null,
                parent: parentDetails
            };
        
            const { groupByGroupId, regionByRegionId, volumeByVolumeId } = node;
        
            if (groupByGroupId) {
                const { id, name }: IGroupByGroupId = groupByGroupId;
        
                nodeBranch.id = id;
                nodeBranch.name = name.toLowerCase();
                nodeBranch.type = "group";
        
                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeBranch.type,
                    parent: parentDetails
                };
            }
            if (regionByRegionId) {
                const { id, name, oliveGeometry }: IRegionByRegionId = regionByRegionId;
        
                nodeBranch.id = id;
                nodeBranch.name = name.toLowerCase();
                nodeBranch.type = "region";
                nodeBranch.geometry = JSON.parse(oliveGeometry);
        
                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeBranch.type,
                    parent: parentDetails
                };
            }
            if (volumeByVolumeId) {
                const { id, name, oliveGeometry }: IVolumeByVolumeId = volumeByVolumeId;
        
                nodeBranch.id = id;
                nodeBranch.name = name.toLowerCase();
                nodeBranch.type = "volume";
                nodeBranch.geometry = JSON.parse(oliveGeometry);
        
                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeBranch.type,
                    parent: parentDetails
                };
            }
        
            return {
                ...nodeBranch,
                nodes: node.nodeItemsByParentNodeId
                    ? node.nodeItemsByParentNodeId.nodes.map(node =>
                          recurseNodeMapping(node, parent)
                      )
                    : null
            };
        }

        nodeTree.push({
            id,
            name: name.toLowerCase(),
            type: "group",
            geometry: null,
            nodes: childNodes.map(node => recurseNodeMapping(node, parent))
        });

        return nodeTree;
    }

    private setGroupedNodesByType() {
        const groupedNodesByType: IGroupedNodesByType = {
            groups: [],
            regions: [],
            volumes: []
        };

        function recurseNodeGrouping(nodeTree: INodeTree[]) {
            nodeTree.forEach((node: INodeTree) => {
                const { id, name, type, parent, geometry } = node;

                switch (type) {
                    case "group":
                        groupedNodesByType.groups.push({
                            id,
                            name,
                            type,
                            parent
                        });
                        break;
                    case "region":
                        groupedNodesByType.regions.push({
                            id,
                            name,
                            type,
                            parent,
                            geometry
                        });
                        break;
                    case "volume":
                        groupedNodesByType.volumes.push({
                            id,
                            name,
                            type,
                            parent,
                            geometry
                        });
                        break;
                    default:
                        break;
                }

                if (!node.nodes) {
                    return;
                }

                recurseNodeGrouping(node.nodes);
            });
        }

        recurseNodeGrouping(this.nodeTree);

        return groupedNodesByType;
    }

    private createGroup(name: string) {
        const group = new THREE.Group();
        group.name = `${ name }_collection`;
        return group;
    }

    private setHex(object: IMesh, color: number) {
        object.material.color.setHex(color);
        return object;
    }

    private setOpacity(object: IMesh | Mesh, opacity = 1) {
        object.material.opacity = opacity;
        return object;
    }

    public buildVolumes(volumeName: string) {
        const groupOfVolumeMesh = this.createGroup(volumeName);

        const filteredVolumes = this.groupedNodesByType.volumes.filter(volume => {
            return volume.name.includes(volumeName);
        });

        if (filteredVolumes.length === 0) {
            console.error(`No volumes with the following name: ${volumeName}`);
            return;
        }

        filteredVolumes.forEach(volume => {
            const geometry = new Geometry(volume.geometry);
            const material = new Material(RED);
            const volumeMesh = new Mesh(volume, geometry, material);

            groupOfVolumeMesh.add(volumeMesh);
        });

        this.renderedObjects.volume = groupOfVolumeMesh;

        return groupOfVolumeMesh;
    }

    public buildRegions(regionName: string) {
        const groupOfRegionMesh = this.createGroup(regionName);

        const filteredRegions = this.groupedNodesByType.regions.filter(region => {
            return region.name.includes(regionName);
        });

        if (filteredRegions.length === 0) {
            console.error(`No regions with following name: ${regionName}`);
            return;
        }

        filteredRegions.forEach(region => {
            const geometry = new Geometry(region.geometry);
            const material = new Material(BLUE);
            const regionMesh = new Mesh(region, geometry, material);

            regionMesh.nodeContent.name.includes("site")
                ? this.setOpacity(regionMesh, 0.5)
                : this.setOpacity(regionMesh);

            groupOfRegionMesh.add(regionMesh);
        });

        this.renderedObjects.region = groupOfRegionMesh;

        return groupOfRegionMesh;
    }

    public repaint(renderedObjectsByType: THREE.Group) {
        if (!this.renderedObjects) return;

        renderedObjectsByType.children.forEach((child: Mesh) => {
            this.setHex(child, child.material.originalHex);
            this.setOpacity(child, 1);
        });
    }

    public selectObject(object: IMesh, wantsBuilding: boolean): void {
        const type: INodeContent["type"] = object.nodeContent.type;

        if (type !== "region" && type !== "volume") return;

        const renderedObjectsByType = this.renderedObjects[type];

        this.repaint(renderedObjectsByType);

        // if user wants to select an entire building.
        if (wantsBuilding) {
            // change colour of selected building
            renderedObjectsByType.children.filter((child: IMesh) => {
                if (child.nodeContent.parent.name === object.nodeContent.parent.name) {
                    this.setOpacity(child, 0.8);
                    this.setHex(child, GREEN);
                } else {
                    // blur out deselected buidlings
                    this.setOpacity(child, 0.3);
                }

                return renderedObjectsByType;
            });
        }

        this.setHex(object, GREEN);
    }

    public destroyObject(object: THREE.Group) {
        
    }
}
