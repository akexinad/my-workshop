const EUSTON = EUSTON_DATA_191210;

class Vector2 extends THREE.Vector2 {
    constructor(point) {
        super(point.x, point.y);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

class Vector3 extends THREE.Vector3 {
    constructor(point) {
        super(point.x, point.y, point.z);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

// const pointData = DATA.floors[0].oliveGeometry.polygon.points[0];
// const point = new Vector3(pointData);
// console.log(point);

class Shape extends THREE.ShapeBufferGeometry {
    constructor(geometry) {
        const vector2Array = [];
        const vector3Array = [];

        geometry.points.forEach((point) => {
            vector2Array.push(new Vector2(point));
            vector3Array.push(new Vector3(point));
        });

        const shape = new THREE.Shape(vector2Array);
        
        super(shape);

        this.vector2 = vector2Array;
    }
}

class Extrusion extends THREE.ExtrudeBufferGeometry {
    constructor(geometry) {
        const vector2Array = [];
        const vector3Array = [];

        geometry.polygon.points.forEach((point) => {
            vector2Array.push(new THREE.Vector2(point.x, point.y));
            vector3Array.push(new Vector3(point));
        });

        const shape = new THREE.Shape(vector2Array);

        const extrudeSettings = {
            depth: geometry.height,
            steps: 1,
            bevelEnabled: false
        }

        super(shape, extrudeSettings);

        this.vector3 = vector3Array;
    }
}

// const shapeData = DATA.floors[0].oliveGeometry;
// const polygon = new Extrusion(shapeData);
// console.log(polygon);


class Material extends THREE.MeshLambertMaterial {

    constructor(color = 0xd40000) {
        const options = {
            color,
            transparent: true,
            opacity: 1
        }

        super(options);

        this.originalHex = color;
    }
}

class Mesh extends THREE.Mesh {

    constructor(volume, geometry, material) {

        const zPosition = volume.oliveGeometry.polygon.points[0].z;

        super(geometry, material);

        this.nodeContent = {
            nodeId: volume.nodeId,
            parentNodeId: volume.parentNodeId,
            classification: volume.classification,
            useType: volume.attributes.useType,
            type: volume.type
        };
        this.position.set(0, 0, zPosition);
    }    
}



class Lattice extends THREE.Mesh {

    constructor(region, geometry, material) {

        const zPosition = region.oliveGeometry.points[0].z;

        super(geometry, material);

        this.nodeContent = {
            nodeId: region.nodeId,
            parentNodeId: region.parentNodeId,
            classification: region.classification,
            type: region.type
        };
        this.position.set(0, 0, zPosition);
    }    
}

// const volumeData = DATA.floors[0];
// const volume = new VolumeLattice(volumeData);
// console.log(volume);

class Development {

    constructor(data) {
        this.data = data;
        this.classifications = {
            VOLUME: "volumeNode",
            REGION: "regionNode"
        }

        this.renderedObjects = {
            floors: null,
            footprints: null,
            landscapes: null,
            openspaces: null
        }

        this.nodeTree = this.mapNodes(this.data);

        // this.sortedNodes = {
        //     groups: [],
        //     regions: [],
        //     volumes: []        
        // }

        this.sortedNodes = this.groupNodesByType(this.nodeTree);
    }

    mapNodes() {

        const nodeTree = [];
        const masterNode = this.data.data.nodeItemById;

        nodeTree.push({
            id: masterNode.groupByGroupId.id,
            name: masterNode.groupByGroupId.name,
            type: 'group',
            geometry: null,
            nodes: masterNode.nodeItemsByParentNodeId.nodes.map(node => recurseNodeMapping(node)) 
        });

        function recurseNodeMapping(node) {
            
            let nodeContent = {
                id: null,
                name: null,
                type: null,
                geometry: null
            };
        
            if (node.groupByGroupId) {
                nodeContent.id = node.groupByGroupId.id;
                nodeContent.name = node.groupByGroupId.name;
                nodeContent.type = 'group';
            } if (node.regionByRegionId) {
                nodeContent.id = node.regionByRegionId.id;
                nodeContent.name = node.regionByRegionId.name;
                nodeContent.type = 'region',
                nodeContent.geometry = JSON.parse(node.regionByRegionId.oliveGeometry);
            } if (node.volumeByVolumeId) {
                nodeContent.id = node.volumeByVolumeId.id;
                nodeContent.name = node.volumeByVolumeId.name;
                nodeContent.type = 'volume';
                nodeContent.geometry = JSON.parse(node.volumeByVolumeId.oliveGeometry);
            }

            return {
                ...nodeContent,
                nodes: node.nodeItemsByParentNodeId ? 
                        node.nodeItemsByParentNodeId.nodes.map(node => recurseNodeMapping(node)) : null
            }
        }

        return nodeTree;
    }
    
    groupNodesByType(nodeTree) {
    
        const sortedNodes = {
            groups: [],
            regions: [],
            volumes: []
        };
    
        function recurseNodeGrouping(nodeTree) {
    
            nodeTree.forEach(node => {
        
                const { id, name, type, geometry } = node;
        
                switch (type) {
                    case 'group':
                        sortedNodes.groups.push({
                            id,
                            name,
                            type
                        });    
                        break;
                    case 'region':
                        sortedNodes.regions.push({
                            id,
                            name,
                            type,
                            geometry
                        });
                        break;
                    case 'volume':
                        sortedNodes.volumes.push({
                            id,
                            name,
                            type,
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
    
        recurseNodeGrouping(nodeTree);
    
        return sortedNodes;
    }

    createGroup(name) {
        const group = new THREE.Group();
        
        group.name = name;

        return group;
    }

    // repaint(objects) {
    //     objects.forEach(object => {
    //         object.material.color.setHex(object.material.originalHex);
    //     });
    // }
    
    // buildFloors() {
    //     const groupOfFloors = this.createGroup(this.classifications.VOLUME);

    //     this.data.floors.forEach((floor) => {
    //         const geometry = new Extrusion(floor.oliveGeometry);
    //         const material = new Material(0xD40004);
            
    //         floor = new Mesh(floor, geometry, material);
            
    //         groupOfFloors.add(floor);
    //     });

    //     this.renderedObjects.floors = groupOfFloors.children;
        
    //     return groupOfFloors;
    // }

    // buildFootprints() {
    //     const groupOfFootprints = this.createGroup(this.classifications.REGION);

    //     this.data.footprints.forEach((footprint) => {
    //         const geometry = new Shape(footprint.oliveGeometry);
    //         const material = new Material(0xd40000);

    //         footprint = new Lattice(footprint, geometry, material);

    //         groupOfFootprints.add(footprint);
    //     });

    //     this.renderedObjects.footprints = groupOfFootprints.children;

    //     return groupOfFootprints;
    // }

    // buildSites() {
    //     const groupOfSites = this.createGroup(this.classifications.REGION);

    //     this.data.sites.forEach((site) => {
    //         const geometry = new Shape(site.oliveGeometry);
    //         const material = new Material();

    //         site = new Lattice(site, geometry, material);

    //         groupOfSites.add(site);
    //     });

    //     this.renderedObjects.sites = groupOfSites.children;

    //     return groupOfSites;
    // }

    // highlightObject(object) {
    //     this.repaint(this.renderedObjects[object.nodeContent.type]);
    //     object.material.color.setHex(0xbada55);
    // }
} 