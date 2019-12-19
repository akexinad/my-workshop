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
    IMesh
} from "./interfaces";
import { groupNodesByType, mapNodesToTree } from "./nodeMappers";

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
    public parentNode: IParentNodeContent;
    public nodeContent: IParentNodeContent;
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
            type
        };

        this.parentNode = parent;
        this.material = material;
        // @ts-ignore
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
        this.sortedNodes = groupNodesByType(this.nodeTree);
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

        nodeTree.push({
            id,
            name: name.toLowerCase(),
            type: "group",
            geometry: null,
            nodes: childNodes.map(node => mapNodesToTree(node, parent))
        });

        return nodeTree;
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

    public repaint(renderedObjectsByType: THREE.Group) {
        if (!this.renderedObjects) return;

        renderedObjectsByType.children.forEach((child: Mesh) => {
            this.setHex(child, child.material.originalHex);
            this.setOpacity(child, 1);
        });
    }

    private setHex(object: IMesh, color: number) {
        object.material.color.setHex(color);
        return object;
    }

    private setOpacity(object: IMesh | Mesh, opacity = 1) {
        object.material.opacity = opacity;
        return object;
    }

    public selectObject(object: IMesh, wantsBuilding: boolean): void {
        const type: IParentNodeContent["type"] = object.nodeContent.type;

        if (type !== "region" && type !== "volume") return;

        const renderedObjectsByType = this.renderedObjects[type];

        this.repaint(renderedObjectsByType);

        // if user wants to select an entire building.
        if (wantsBuilding) {
            // change colour of selected building
            renderedObjectsByType.children.filter((child: IMesh) => {
                if (child.parentNode.name === object.parentNode.name) {
                    this.setOpacity(child, 0.8);
                    this.setHex(child, GREEN);
                } else {
                    // blur out deselected buidlings
                    this.setOpacity(child, 0.3);
                }

                return renderedObjectsByType;
            });
        }

        object.material.color.setHex(GREEN);
    }
}
