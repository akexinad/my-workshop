const NODES = EUSTON_DATA_191210;

// console.log(NODES);


const singleNode = NODES.data.nodeItemById.nodeItemsByParentNodeId.nodes[0]

function mapNodes(nodeData) {

    const nodeTree = [];
    const masterNode = nodeData.data.nodeItemById;

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

        const { groupByGroupId, regionByRegionId, volumeByVolumeId } = node;
    
        if (groupByGroupId) {
            nodeContent.id = groupByGroupId.id;
            nodeContent.name = groupByGroupId.name;
            nodeContent.type = 'group';
        } if (regionByRegionId) {
            nodeContent.id = regionByRegionId.id;
            nodeContent.name = regionByRegionId.name;
            nodeContent.type = 'region',
            nodeContent.geometry = JSON.parse(regionByRegionId.oliveGeometry);
        } if (volumeByVolumeId) {
            nodeContent.id = volumeByVolumeId.id;
            nodeContent.name = volumeByVolumeId.name;
            nodeContent.type = 'volume';
            nodeContent.geometry = JSON.parse(volumeByVolumeId.oliveGeometry);
        }

        return {
            ...nodeContent,
            nodes: node.nodeItemsByParentNodeId ? 
                    node.nodeItemsByParentNodeId.nodes.map(node => recurseNodeMapping(node)) : null
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

    function siftNodes(nodeTree) {

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
            
            // if (type === 'group') {
            //     sortedNodes.groups.push({
            //         id,
            //         name,
            //         type
            //     });
            // } if (type === 'region') {
            //     sortedNodes.regions.push({
            //         id,
            //         name,
            //         type,
            //         geometry
            //     });
            // } if (type === 'volume') {
            //     sortedNodes.volumes.push({
            //         id,
            //         name,
            //         type,
            //         geometry
            //     });
            // }
    
            if (!node.nodes) {
                return;
            }
    
            siftNodes(node.nodes);
        });
    }

    siftNodes(nodeTree);

    return sortedNodes;
}

// const sortedNodesArray = groupNodesByType(nodeTree);

// console.log(sortedNodesArray);
