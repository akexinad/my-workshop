const NODES = EUSTON_DATA_191210;

console.log(NODES);


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

    console.log(Boolean(masterNode.nodeItemsByParentNodeId.nodes[0].volumeByVolumeId))

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

        // const { id, name, type, region } = nodeContent;

        return {
            ...nodeContent,
            nodes: node.nodeItemsByParentNodeId ? 
                    node.nodeItemsByParentNodeId.nodes.map(node => recurseNodeMapping(node)) : null
        }
    }

    return nodeTree;
}


const nodeTree = mapNodes(NODES);

console.log(nodeTree);