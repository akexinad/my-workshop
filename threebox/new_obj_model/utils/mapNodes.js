const NODES = EUSTON_DATA_191210;

console.log(NODES);


const singleNode = NODES.data.nodeItemById.nodeItemsByParentNodeId.nodes[0]

function mapNodes(nodeData) {

    const nodeArray = [];
    const masterNode = nodeData.data.nodeItemById;

    nodeArray.push({
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
            nodeContent.name = node.groupByGroupId.name;
            nodeContent.id = node.groupByGroupId.id;
            nodeContent.type = 'group';
        } else if (node.regionByRegionId) {
            nodeContent.name = node.regionByRegionId.name;
            nodeContent.id = node.regionByRegionId.id;
            nodeContent.type = 'region',
            nodeContent.geometry = JSON.parse(node.regionByRegionId.oliveGeometry);
        } else if (node.volumeByVolumeId) {
            nodeContent.name = node.volumeByVolumeId.name;
            nodeContent.id = node.volumeByVolumeId.id;
            nodeContent.type = 'volume';
            nodeContent.geometry = JSON.parse(node.volumeByVolumeId.oliveGeometry);
        } else {
            return;
        }
    
        const { id, name, type, geometry } = nodeContent;

        console.log(node.nodeItemsByParentNodeId);
    
        nodeArray.push({
            id,
            name,
            type,
            geometry,
            nodes: node.nodeItemsByParentNodeId ? 
                    node.nodeItemsByParentNodeId.nodes.map(node => recurseNodeMapping(node)) :
                    null
        });
    }

    return nodeArray;
}


const array = mapNodes(NODES);

console.log(array);

// const groups = array.filter(node => node.type === "group")
// const regions = array.filter(node => node.type === "region")
// const volumes = array.filter(node => node.type === "volume");

// console.log(groups);
// console.log(regions);
// console.log(volumes);

const sites = array.filter(node => node.type === "region");

console.log(sites);
