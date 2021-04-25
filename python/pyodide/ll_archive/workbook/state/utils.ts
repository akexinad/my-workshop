import { TreeNode } from "react-treebeard";
import {
  Attribute,
  Feature,
  Flow,
  Forest,
  Node,
  Tree
} from "../proto/element_pb";

export const findParent = (
  nodes: TreeNode[],
  child: TreeNode
): TreeNode | undefined => {
  return nodes.find((n: TreeNode) => {
    return !!n?.children?.find(
      (n) =>
        n?.feature?.getId()?.getValue() === child?.feature?.getId()?.getValue()
    );
  });
};

export const recursivelyFindAttr = (
  n: Node,
  forest: Forest,
  tree: Tree,
  name: string
): Attribute | undefined => {
  const attr = forest
    .getFeaturesMap()
    ?.get(n.getFeatureid()?.getValue() || "")
    ?.getAttributesMap()
    ?.get(name);

  if (attr) {
    return attr;
  }

  const parentId = n.getParentid()?.getValue() || "";

  const parent = tree.getNodesMap()?.get(parentId);

  if (!parent) {
    return undefined;
  } else {
    return recursivelyFindAttr(parent, forest, tree, name);
  }
};

export const recursivelyFindFlows = (
  n: Node,
  forest: Forest,
  tree: Tree,
  name: string
): (Flow | undefined)[] => {
  console.log("recursivelyFindFlows", n.toObject(), name);

  const childIds = n.getChildrenidsList();
  const nodes = tree.getNodesMap();

  const children = childIds.map((v) => nodes.get(v.getValue()));
  const featureID = n.getFeatureid()?.getValue();
  const features = forest.getFeaturesMap();

  if (featureID) {
    const feature = features.get(featureID);

    console.log(feature?.getFlowsList());

    const v =
      feature?.getFlowsList()?.filter((v: Flow) => {
        return v.getName() === name;
      }) || [];

    const subFlows = children.flatMap((c) => {
      if (c) {
        return recursivelyFindFlows(c, forest, tree, name);
      } else {
        return [];
      }
    });

    return [...v, ...subFlows];
  }

  return [];
};

export const getFirstTree = (forest: Forest) => {
  let firstTree: any;
  const treeNodeName = forest.getTreesMap()?.toArray();
  if (
    treeNodeName != null &&
    treeNodeName[0] != null &&
    treeNodeName[0][0] != null
  ) {
    firstTree = forest.getTreesMap()?.get(treeNodeName[0][0]);
  }
  return firstTree;
};

export const getRootFeature = (forest: Forest) => {
  const features = forest.getFeaturesMap();
  let rootFeatureId: string = "";
  features.forEach((x) => {
    if (x.getName() === "Root") {
      rootFeatureId = x.getId()?.getValue() ?? "";
    }
  });
  const feature = features?.get(rootFeatureId);
  return feature;
};

export const replaceFeatureDAG = (feature: Feature, featureDAG: Attribute) => {
  feature?.getAttributesMap()?.set("Root_DAG", featureDAG);
  return feature;
};