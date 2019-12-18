import { INode, IParentNodeContent, INodeBranch, IGroupByGroupId, IRegionByRegionId, IVolumeByVolumeId, ISortedNodes } from "./interfaces";

export const mapNodesToTree = (node: INode, parentDetails: IParentNodeContent): INodeBranch => {
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

        nodeBranch.id = id;
        nodeBranch.name = name.toLowerCase();
        nodeBranch.type = 'group';

        parent = {
            id,
            name: name.toLowerCase(),
            type: nodeBranch.type
        }
    }
    if (regionByRegionId) {
        const {
            id,
            name,
            oliveGeometry
        }: IRegionByRegionId = regionByRegionId;

        nodeBranch.id = id;
        nodeBranch.name = name.toLowerCase();
        nodeBranch.type = 'region';
        nodeBranch.geometry = JSON.parse(oliveGeometry);

        parent = {
            id,
            name: name.toLowerCase(),
            type: nodeBranch.type
        }
    }
    if (volumeByVolumeId) {
        const {
            id,
            name,
            oliveGeometry
        }: IVolumeByVolumeId = volumeByVolumeId;

        nodeBranch.id = id;
        nodeBranch.name = name.toLowerCase();
        nodeBranch.type = 'volume';
        nodeBranch.geometry = JSON.parse(oliveGeometry);

        parent = {
            id,
            name: name.toLowerCase(),
            type: nodeBranch.type
        }
    }


    return {
        ...nodeBranch,
        nodes: node.nodeItemsByParentNodeId
            ? node.nodeItemsByParentNodeId.nodes.map(node =>
                mapNodesToTree(node, parent)
            )
            : null
    };
}

export const groupNodesByType = (nodeTree: INodeBranch[]): ISortedNodes => {
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

    recurseNodeGrouping(nodeTree);

    return sortedNodesByType;
}