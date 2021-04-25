import axios from "api/axios-eli";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { createHook, createStore, StoreActionApi } from "react-sweet-state";
import { TreeNode } from "react-treebeard";
import { base64ToBuffer, bufferToBase64 } from "../engine";
import { addChildren } from "../engine/tree";
import { Attribute, Feature, Flow, Forest, Node } from "../proto/element_pb";
import { Dict, Series, Workbook } from "../types";
import { findParent, getFirstTree, getRootFeature, recursivelyFindAttr, recursivelyFindFlows } from "./utils";
import { messageStoreActions, MessageStoreState } from "stores/extensions/storeMessageExtension";
import { getErrorMessage } from "pages/portfolio/data/types";

const baseUrl =
  process.env.REACT_APP_FINANCIAL_BASE_API ||
  process.env.REACT_APP_BASE_API ||
  "";

const financialUrl =
  process.env.REACT_APP_FINANCIAL_API || "/api/financialservice/v1/financials";

const workbookUrl = baseUrl + financialUrl + "/developments";

type State = MessageStoreState & {
  periodsToCalculate: number;
  feature: Feature;
  series: Dict<Series>;
  forest: Forest;
  tree: TreeNode;
  scenarioId: string;
  id?: string;
  userId?: string,
  buildingId?: string,
  // TODO development only, copy DAG
  featureDAG?: Attribute
}

type StoreApi = StoreActionApi<State>;
type Actions = typeof actions;

const initialState: State = {
  periodsToCalculate: 10,
  feature: new Feature(),
  series: {},
  forest: new Forest(),
  tree: {
    name: "",
    toggled: false,
    children: [],
  },
  scenarioId: "",
  buildingId: ""
};

const actions = {
  ...messageStoreActions,
  ...{
    getCurNode: () => ({ getState }: StoreApi) => {
      const state = getState();
      const { forest, feature } = state;

      const firstTree = getFirstTree(forest);
      let node = new Node();

      firstTree?.getNodesMap()?.forEach((n) => {
        if (n.getFeatureid()?.getValue() === feature.getId()?.getValue()) {
          node = n;
        }
      });

      return node;
    },

    GetSubFeaturesOfNode: (n: Node) => ({ getState, dispatch }: StoreApi) => {
      const state = getState();
      const { forest } = state;

      /**
       * In this method i use dispatch to call the method recursively
       * inside the flat map method.
       */
      const firstTree = getFirstTree(forest);

      const toReturn = [
        forest.getFeaturesMap().get(n.getFeatureid()?.getValue() || ""),
        ...n
          .getChildrenidsList()
          .flatMap((id) =>
            dispatch(
              actions.GetSubFeaturesOfNode(
                firstTree?.getNodesMap()?.get(id.getValue()) || new Node()
              )
            )
          )
      ].filter((x) => x !== undefined) as Feature[];

      return toReturn;
    },

    getSubFeatures: () => ({ dispatch }: StoreApi) => {
      /**
       * Using dispatch to call methods within the actions
       */
      return dispatch(
        actions.GetSubFeaturesOfNode(dispatch(actions.getCurNode()))
      );
    },

    /**
     * This method originally had 2 args, feature and tree.
     * The tree came from the store so I tried to replicate
     * this here using getState.
     */
    getCursorByFeature: (feature: Feature) => ({ getState }: StoreApi) => {
      const state = getState();
      const { tree } = state;

      let toSearch = [tree, ...(tree.children || [])];

      while (toSearch.length) {
        const node = toSearch.pop();
        if (node?.feature?.getId()?.getValue() === feature.getId()?.getValue()) {
          return node;
        } else {
          toSearch = [...toSearch, ...(node?.children || [])];
        }
      }
    },

    /**
     * This method originally had 1 arg, the tree.
     * which was coming from the store so I tried to replicate
     * this here using getState.
     */
    collapseAll: () => ({ getState, setState }: StoreApi) => {
      const state = getState();
      const { tree } = state;

      let toSearch = [tree, ...(tree.children || [])];

      while (toSearch.length) {
        const node = toSearch.pop();
        if (node) {
          node.toggled = false;
          node.active = false;
        }
        toSearch = [...toSearch, ...(node?.children || [])];
      }

      return Object.assign({}, tree);
    },

    /**
     * This method originally had 2 args, feature and tree.
     * The tree came from the store so I tried to replicate
     * this here using getState.
     *
     * Additionally, the first argument was passes in the
     * funciton collapseAll which returned a tree, so here
     * I tried to do the same by calling a dispatch to the collapseAll
     * action to and mimic the same functinoality.
     */
    openToNode: (target: TreeNode) => ({ getState, dispatch }: StoreApi) => {
      const state = getState();
      const { tree } = state;

      dispatch(actions.collapseAll());

      let toSearch = [tree, ...(tree.children || [])];
      let allNodes: TreeNode[] = [];
      let found = false;

      while (toSearch.length && !found) {
        const node = toSearch.pop();
        if (node) allNodes = [...allNodes, node];
        if (
          node?.feature?.getId()?.getValue() ===
          target?.feature?.getId()?.getValue()
        ) {
          found = true;
        } else {
          toSearch = [...toSearch, ...(node?.children || [])];
        }
      }

      let parent = findParent(allNodes, target);
      let parents = [parent];

      while (parent) {
        parent = findParent(allNodes, parent);
        parents = [...parents, parent];
      }

      parents = [...parents, tree];

      parents.forEach((n) => {
        if (n?.children?.length) {
          n.toggled = true;
        }
      });

      target.active = true;

      return Object.assign({}, tree);
    },

    setTree: (tree: TreeNode) => ({ setState }: StoreApi) => {
      setState({
        tree
      });
    },

    setForest: (forest: Forest) => ({ setState }: StoreApi) => {
      setState({
        forest
      });
    },

    setSeries: (series: Dict<Series>) => ({ setState }: StoreApi) => {
      setState({
        series
      });
    },

    setPeriodsToCalculate: (periodsToCalculate: number) => ({
      setState
    }: StoreApi) => {
      setState({
        periodsToCalculate
      });
    },

    setFeature: (feature: Feature) => ({ getState, setState }: StoreApi) => {
      window.getForest = () => {
        const state = getState();
        return state.forest.toObject();
      };

      window.setFlow = (name, values) => {
        window.flows = {
          set: true,
          value: {
            name,
            values
          }
        };
      };

      window.setAttr = (name, value) => {
        window.attr = {
          set: true,
          value: {
            name,
            value
          }
        };
      };

      window.getAttr = (name) => {
        const state = getState();

        const firstTree = getFirstTree(state.forest);

        let node = new Node();

        firstTree?.getNodesMap()?.forEach((n) => {
          if (n.getFeatureid()?.getValue() === feature.getId()?.getValue()) {
            node = n;
          }
        });

        if (firstTree) {
          const attr = recursivelyFindAttr(node, state.forest, firstTree, name);

          // This only works for numbers and structs right now because I am a bad programmer.
          if (attr?.getValue()?.getNumberValue()) {
            return attr?.getValue()?.getNumberValue();
          } else if (attr?.getValue()?.getStructValue()) {
            return attr?.getValue()?.getStructValue()?.toJavaScript();
          } else if (attr?.getValue()?.getListValue()) {
            return attr?.getValue()?.getListValue()?.toJavaScript();
          }
        }
      };

      window.getFlow = (name) => {
        const flows = feature.getFlowsList();

        const toReturn = (flows.find((f) => f.getName() === name) || new Flow())
          .getMovementsList()
          .map((m) => {
            return { amount: m.getAmount(), date: m.getDate() };
          });

        return {
          amounts: toReturn.map((v) => v.amount),
          dates: toReturn.map((v) => v.date)
        };
      };

      window.getChildFlows = (name) => {
        const state = getState();

        const firstTree = getFirstTree(state.forest);
        let node = new Node();

        firstTree?.getNodesMap()?.forEach((n) => {
          if (n.getFeatureid()?.getValue() === feature.getId()?.getValue()) {
            node = n;
          }
        });

        console.log(
          node?.toObject(),
          feature.getId()?.getValue(),
          firstTree?.toObject()
        );

        if (node && firstTree) {
          const values = recursivelyFindFlows(
            node,
            state.forest,
            firstTree,
            name
          ).flatMap((flow) => {
            if (flow) {
              const toReturn = flow.getMovementsList().map((m) => {
                return { amount: m.getAmount(), date: m.getDate() };
              });
              return {
                amounts: toReturn.map((v) => v.amount),
                dates: toReturn.map((v) => v.date)
              };
            } else {
              const temp: {
                amounts: number[];
                dates: (Timestamp | undefined)[];
              } = { amounts: [], dates: [] };
              return temp;
            }
          });

          let tempAmounts: number[] = [];
          let tempDates: (Timestamp | undefined)[] = [];

          values.forEach((v) => {
            tempAmounts = [...tempAmounts, ...v.amounts];
            tempDates = [...tempDates, ...v.dates];
          });

          return {
            amounts: tempAmounts,
            dates: tempDates
          };
        }

        return {
          amounts: [],
          dates: []
        };
      };

      setState({
        feature
      });
    },

    setScenarioId: (scenarioId: string) => ({
      setState,
    }: StoreApi) => {
      setState({
        scenarioId,
      });
    },
    setBuildingId: (buildingId: string) => ({
      setState,
    }: StoreApi) => {
      setState({
        buildingId,
      });
    },
    loadData: (scenarioId: string) => async ({
      getState, setState
    }: StoreApi) => {
      const url = `${workbookUrl}?ScenarioId=${scenarioId}`;
      const state = getState();
      if (state.scenarioId === scenarioId && state.forest.getName() !== "") {
        return;
      }
      await axios
        .get<Workbook[]>(url)
        .then((res) => {
          if (res.data.length > 0) {
            const data = res.data[0];
            const forest = Forest.deserializeBinary(base64ToBuffer(data?.forest!));
            setState(
              {
                forest: forest,
                scenarioId: data?.scenarioId,
                id: data?.id,
                userId: data?.userId,
                buildingId: data?.buildingId
              }
            )
          }
        })
        .catch((reason) => {
          const errorMessage = getErrorMessage(reason, "Error loading data");
          setState({ message: { text: errorMessage, variant: "error" } });
        })
        .finally(() => {
        });
    },
    saveData: (workbook: Workbook) => async ({
      getState, setState
    }: StoreApi) => {
      const url = `${workbookUrl}`;
      const state = getState();
      const data: Workbook = {
        id: workbook.id,
        userId: workbook.userId,
        scenarioId: workbook.scenarioId,
        buildingId: workbook.buildingId,
        forest: bufferToBase64(state.forest.serializeBinary())
      };
      await axios
        .post<Workbook[]>(url, data)
        .then((res) => {
          const message = getErrorMessage("A workbook was saved successfully.");
          setState({ message: { text: message, variant: "success" } });
        })
        .catch((reason) => {
          const errorMessage = getErrorMessage(reason, "Error saving data");
          setState({ message: { text: errorMessage, variant: "error" } });
        })
        .finally(() => {
        });
    },
    updateForest: (forest: Forest) => ({ setState
    }: StoreApi) => {
      let tree: TreeNode = {
        name: '',
        toggled: false,
        children: []
      };

      const firstTree = getFirstTree(forest);
      const root = firstTree?.getRoot();
      if (root && firstTree) {
        setState({ tree: addChildren(root, tree, forest.getFeaturesMap(), firstTree) });
      }
      setState({ forest });
    },
    loadRootFeature: (scenarioId: string) => async ({
      getState, setState
    }: StoreApi) => {
      const url = `${workbookUrl}?ScenarioId=${scenarioId}`;
      const state = getState();
      if (state.scenarioId === scenarioId && state.forest.getName() !== "") {
        return;
      }
      await axios
        .get<Workbook[]>(url)
        .then((res) => {
          if (res.data.length > 0) {
            const data = res.data[0];
            const forest = Forest.deserializeBinary(base64ToBuffer(data?.forest!));
            const rootFeature = getRootFeature(forest);
            setState({ featureDAG: rootFeature?.getAttributesMap()?.get("Root_DAG") })
          }
        })
        .catch((reason) => {
          const errorMessage = getErrorMessage(reason, "Error loading data");
          setState({ message: { text: errorMessage, variant: "error" } });
        })
        .finally(() => { });
    }
  }
};

const name = "WorkbookStore";

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

const useWorkbookStore = createHook(Store);
export default useWorkbookStore;
