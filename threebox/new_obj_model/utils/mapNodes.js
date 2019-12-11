const NODES = EUSTON_DATA_191210;

// console.log(NODES);


const singleNode = NODES.data.nodeItemById.nodeItemsByParentNodeId.nodes[0]

function mapNodes(nodeData) {

    const nodeTree = [];
    const masterNode = nodeData.data.nodeItemById;

    const { id, name } = masterNode.groupByGroupId;
    const childNodes = masterNode.nodeItemsByParentNodeId.nodes;

    const parent = {
        id,
        name,
        type: 'group'
    }

    nodeTree.push({
        id,
        name,
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
            nodeContent.name = name;
            nodeContent.type = 'group';
            
            parent = {
                id,
                name,
                type: nodeContent.type
            }
        } if (regionByRegionId) {
            const { id, name, oliveGeometry } = regionByRegionId;
            
            nodeContent.id = id;
            nodeContent.name = name;
            nodeContent.type = 'region',
            nodeContent.geometry = JSON.parse(oliveGeometry);

            parent = {
                id,
                name,
                type: nodeContent.type
            }
        } if (volumeByVolumeId) {
            const { id, name, oliveGeometry } = volumeByVolumeId;

            nodeContent.id = id;
            nodeContent.name = name;
            nodeContent.type = 'volume';
            nodeContent.geometry = JSON.parse(oliveGeometry);

            parent = {
                id,
                name,
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

// const nodeTree = mapNodes(NODES);

// console.log(nodeTree);

function groupNodesByType(nodeTree) {
    
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

// const sortedNodesArray = groupNodesByType(nodeTree);

// console.log(sortedNodesArray);
