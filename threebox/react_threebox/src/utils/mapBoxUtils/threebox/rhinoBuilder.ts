// import * as THREE from "three";
// @ts-ignore
import { THREE } from "threebox-map";
import {
    IPoint,
    IOliveGeometry,
    IParentNodeContent,
    INodeBranch,
    ISortedNodeContent,
    ISortedNodes,
    IRenderedObjects,
    IRootObject,
    INodeItemById,
    INode,
    IGroupByGroupId,
    IRegionByRegionId,
    IVolumeByVolumeId,
    IMaterial,
    IMesh,
} from "./interfaces";

/**
 * PLEASE NOTE
 * ===========
 * 
 * The reason for the // @ts-ignore tags is because some THREE.js types are incomplete
 * and therefore is throwing errors saying that properties do not exist when in fact they do
 * 
 */


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

    constructor(geometry: IOliveGeometry) {
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

    constructor(color = RED, opacity = 1) {
        const options = {
            color,
            transparent: true,
            opacity
        };

        super(options);

        this.originalHex = color;
    }
}

export class Mesh extends THREE.Mesh {
    public parentNode: IParentNodeContent;
    public nodeContent: IParentNodeContent;
    public material: Material;
    public position: IMesh["position"];

    constructor(
        node: ISortedNodeContent,
        geometry: Geometry,
        material: IMaterial
    ) {
        const { id, name, type, parent } = node;
        const zPosition = node.geometry.points[0].z;

        super(geometry, material);

        this.nodeContent = {
            id,
            name,
            type
        };

        this.parentNode = parent;
        this.material = material;
        this.position.set(0, 0, zPosition);
    }
}

export class RhinoBuilder {
    public data: IRootObject;
    public classifications = {
        VOLUME: "volumeCollection",
        REGION: "regionCollection"
    };
    public nodeTree: INodeBranch[];
    public sortedNodes: ISortedNodes;
    public renderedObjects: IRenderedObjects = {
        volume: null,
        region: null
    };

    constructor(rootData: IRootObject) {
        this.data = rootData;
        this.nodeTree = this.mapNodes();
        this.sortedNodes = this.groupNodesByType();
    }

    private mapNodes(): INodeBranch[] {
        const nodeTree: INodeBranch[] = [];
        const masterNode: INodeItemById = this.data.data.nodeItemById;

        const { id, name } = masterNode.groupByGroupId;
        const childNodes: INode[] = masterNode.nodeItemsByParentNodeId.nodes;

        const parent: IParentNodeContent = {
            id,
            name: name.toLowerCase(),
            type: "group"
        };

        const recurseNodeMapping = (
            node: INode,
            parentDetails: IParentNodeContent
        ): INodeBranch => {
            let nodeBranch: INodeBranch = {
                id: null,
                name: null,
                type: null,
                parent: parentDetails,
                geometry: null,
                nodes: null
            };

            let parent: IParentNodeContent = {
                id: null,
                name: null,
                type: null
            };

            const { groupByGroupId, regionByRegionId, volumeByVolumeId } = node;

            if (groupByGroupId) {
                const { id, name }: IGroupByGroupId = groupByGroupId;

                nodeBranch = {
                    id,
                    name: name.toLowerCase(),
                    type: "group",
                    geometry: null,
                    nodes: null
                };

                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeBranch.type
                };
            }
            if (regionByRegionId) {
                const {
                    id,
                    name,
                    oliveGeometry
                }: IRegionByRegionId = regionByRegionId;

                nodeBranch = {
                    id,
                    name: name.toLowerCase(),
                    type: "region",
                    geometry: JSON.parse(oliveGeometry),
                    nodes: null
                };

                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeBranch.type
                };
            }
            if (volumeByVolumeId) {
                const {
                    id,
                    name,
                    oliveGeometry
                }: IVolumeByVolumeId = volumeByVolumeId;

                nodeBranch = {
                    id,
                    name: name.toLowerCase(),
                    type: "volume",
                    geometry: JSON.parse(oliveGeometry),
                    nodes: null
                };

                parent = {
                    id,
                    name: name.toLowerCase(),
                    type: nodeBranch.type
                };
            }

            return {
                ...nodeBranch,
                parent,
                nodes: node.nodeItemsByParentNodeId
                    ? node.nodeItemsByParentNodeId.nodes.map(node =>
                          recurseNodeMapping(node, parent)
                      )
                    : null
            };
        };

        nodeTree.push({
            id,
            name: name.toLowerCase(),
            type: "group",
            geometry: null,
            nodes: childNodes.map(node => recurseNodeMapping(node, parent))
        });

        return nodeTree;
    }

    private groupNodesByType(): ISortedNodes {
        const sortedNodesByType: ISortedNodes = {
            groups: [],
            regions: [],
            volumes: []
        };

        function recurseNodeGrouping(nodeTree: INodeBranch[]) {
            nodeTree.forEach((node: INodeBranch) => {
                const { id, name, type, parent, geometry } = node;

                switch (type) {
                    case "group":
                        sortedNodesByType.groups.push({
                            id,
                            name,
                            type,
                            parent
                        });
                        break;
                    case "region":
                        sortedNodesByType.regions.push({
                            id,
                            name,
                            type,
                            parent,
                            geometry
                        });
                        break;
                    case "volume":
                        sortedNodesByType.volumes.push({
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

        return sortedNodesByType;
    }

    private createGroup(name: string) {
        const group = new THREE.Group();

        group.name = name;

        return group;
    }

    public buildVolumes(volumeName: string) {
        const groupOfVolumeMesh = this.createGroup(this.classifications.VOLUME);

        const filteredVolumes = this.sortedNodes.volumes.filter(volume => {
            return volume.name.includes(volumeName);
        });

        if (filteredVolumes.length === 0) {
            console.error(`No volumes with following name: ${volumeName}`);
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

    buildRegions(regionName: string) {
        const groupOfRegionMesh = this.createGroup(this.classifications.REGION);

        const filteredRegions = this.sortedNodes.regions.filter(region => {
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

    // public repaint() {
    //     if (!this.renderedObjects) {
    //         return;
    //     }

    //     renderedObjects.children.forEach((child: Mesh) => {
    //         // @ts-ignore
    //         this.setHex(child, child.material.originalHex);
    //         this.setOpacity(child, 1);
    //     });
    // }

    private setHex(object: IMesh, color: number) {
        object.material.color.setHex(color);
        return object;
    }

    private setOpacity(object: Mesh, opacity = 1) {
        // @ts-ignore
        object.material.opacity = opacity;
        return object;
    }

    public selectObject(object: IMesh, wantsBuilding: boolean): void {
        const type: IParentNodeContent["type"] = object.nodeContent.type;

        if (type !== "region" && type !== "volume") {
            return;
        }
        
        const renderedObjectsByType = this.renderedObjects[type];
        
        // if user wants to select an entire building.
        if (wantsBuilding) {
            // change colour of selected building
            renderedObjectsByType.children.filter((child: IMesh) => {
                console.log(child);
                
                if (child.parentNode.name === object.parentNode.name) {
                    this.setOpacity(child, 0.8);
                    this.setHex(child, GREEN);
                } else {
                    // blur out deselected buidlings
                    this.setOpacity(child, 0.3);
                }
            });            
        }
        
        object.material.color.setHex(GREEN);
    }
}
