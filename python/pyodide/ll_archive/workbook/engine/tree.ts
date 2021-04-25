// Methods for constucting trees
import { TreeNode } from 'react-treebeard';
import { Node, Feature, Tree } from '../proto/element_pb'
import * as jspb from "google-protobuf";


export function addChildren(n: Node, tree: TreeNode, features: jspb.Map<string, Feature>, t: Tree) {
    const feature = features.get(n.getFeatureid()?.getValue() || '')
    const name = feature?.getName();
    const featType = subtypeToString(feature?.getKindCase());
    tree.name = (name || featType || '');
    tree.type = featType;
    tree.feature = feature;
    tree.children = n.getChildrenidsList().map((childId) => {

        const node = t.getNodesMap()?.get(childId?.getValue())

        if (node) {
            return addChildren(node, {
                name: '',
                toggled: false,
                children: []
            }, features, t)
        } else {
            return tree;
        }
    })

    return tree;
}

export const subtypeToString = (subtype: Feature.KindCase | undefined): string => {
    switch (subtype) {
        case Feature.KindCase.ENVELOPE:
            return 'Envelope';
        case Feature.KindCase.GROUP:
            return 'Group';
        case Feature.KindCase.PATH:
            return 'Path';
        case Feature.KindCase.POSITION:
            return 'Position';
        case Feature.KindCase.REGION:
            return 'Region';
        case Feature.KindCase.SPACE:
            return 'Space';
        default:
            return 'Undefined'
    }
}
