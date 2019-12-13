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

// const singlePt = {
//     x: 12,
//     y: 34,
//     z: 56,
//     srid: 7890
// }

// const vec2 = new Vector2(singlePt);
// console.log(vec2);


class Vector3 extends THREE.Vector3 {
    constructor(point) {
        super(point.x, point.y, point.z);

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.srid = point.srid;
    }
}

// const vec3 = new Vector3(singlePt);
// console.log(vec3);


// class Shape extends THREE.ShapeBufferGeometry {
//     constructor(geometry) {
//         const vector2Array = [];
//         const vector3Array = [];

//         geometry.points.forEach((point) => {
//             vector2Array.push(new Vector2(point));
//             vector3Array.push(new Vector3(point));
//         });

//         const shape = new THREE.Shape(vector2Array);
        
//         super(shape);

//         this.vector2 = vector2Array;
//     }
// }

class Geometry extends THREE.ExtrudeBufferGeometry {
    constructor(geometry) {
        const vector2Array = [];
        const vector3Array = [];

        geometry.points.forEach((point) => {
            vector2Array.push(new Vector2(point));
            vector3Array.push(new Vector3(point));
        });

        const shape = new THREE.Shape(vector2Array);

        const extrudeSettings = {
            depth: geometry.height ? geometry.height : 0,
            steps: 1,
            bevelEnabled: false
        }

        super(shape, extrudeSettings);

        this.vector3 = vector3Array;
    }
}

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
    constructor(node, geometry, material) {
        const { id, name, type, parent  } = node;
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

class Development {

    constructor(data) {
        this.data = data;
        this.classifications = {
            VOLUME: "volumeCollection",
            REGION: "regionCollection"
        };
        this.nodeTree = this.mapNodes(this.data);
        this.sortedNodes = this.groupNodesByType(this.nodeTree);
        this.renderedObjects = {
            volume: null,
            region: null
        }
    }

    mapNodes() {
        const nodeTree = [];
        const masterNode = this.data.data.nodeItemById;

        const { id, name } = masterNode.groupByGroupId;
        const childNodes = masterNode.nodeItemsByParentNodeId.nodes;

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

        function recurseNodeMapping(node, parentDetails) {
            let nodeContent = {
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
    
    groupNodesByType(nodeTree) {
        const sortedNodes = {
            groups: [],
            regions: [],
            volumes: []
        };
    
        function recurseNodeGrouping(nodeTree) {
            nodeTree.forEach(node => {
                const { id, name, type, parent, geometry } = node;
        
                switch (type) {
                    case 'group':
                        sortedNodes.groups.push({
                            id,
                            name,
                            type,
                            parent
                        });    
                        break;
                    case 'region':
                        sortedNodes.regions.push({
                            id,
                            name,
                            type,
                            parent,
                            geometry
                        });
                        break;
                    case 'volume':
                        sortedNodes.volumes.push({
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
    
        recurseNodeGrouping(nodeTree);
    
        return sortedNodes;
    }

    createGroup(name) {
        const group = new THREE.Group();
        
        group.name = name;

        return group;
    }

    buildVolumes(volumeName) {
        const groupOfVolumeMesh = this.createGroup(this.classifications.VOLUME);

        const filteredVolumes = this.sortedNodes.volumes.filter(volume => {
            return volume.name.includes(volumeName);
        });

        if (filteredVolumes.length === 0) {
            console.error(`No volumes with following name: ${ volumeName }`);
            return;
        }
        
        filteredVolumes.forEach((volume) => {
            const geometry = new Geometry(volume.geometry);
            const material = new Material(0xD40004);
            const volumeMesh = new Mesh(volume, geometry, material);

            groupOfVolumeMesh.add(volumeMesh);
        });
        
        this.renderedObjects.volume = groupOfVolumeMesh;

        return groupOfVolumeMesh;
    }

    buildRegions(regionName) {
        const groupOfRegionMesh = this.createGroup(this.classifications.REGION);

        const filteredRegions = this.sortedNodes.regions.filter(region => {
            return region.name.includes(regionName)
        });

        if (filteredRegions.length === 0) {
            console.error(`No regions with following name: ${ regionName }`);
            return;
        }

        filteredRegions.forEach(region => {
            const geometry = new Geometry(region.geometry);
            const material = new Material(0xd40000);
            const regionMesh = new Mesh(region, geometry, material);

            groupOfRegionMesh.add(regionMesh);
        });

        this.renderedObjects.region = groupOfRegionMesh;
        
        return groupOfRegionMesh;
    }

    repaint(renderedObjects) {
        renderedObjects.children.forEach(object => {
            object.material.color.setHex(object.material.originalHex);
        });
    }
    
    highlightObject(object) {
        this.repaint(this.renderedObjects[object.nodeContent.type]);
        object.material.color.setHex(0xbada55);
    }
} 