import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SaveIcon from "@material-ui/icons/Save";
import useStateWithLocalStorage from "api/stateWithLocalStorage";
import { Value } from "google-protobuf/google/protobuf/struct_pb";
import { useSnackbar } from "notistack";
import { LoaderIcons } from "pages/configurator/components/Loader/LoaderIcons";
import AddBlockButton from "pages/workbook/components/AddBlockButton/AddBlockButton";
import { initPyodide } from "pages/workbook/engine/runPython";
import { replaceFeatureDAG } from "pages/workbook/state/utils";
import useWorkbookStore from "pages/workbook/state/workbookStore";
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Accordion from "styling/components/Accordion/Accordion";
import { PageLoader } from "styling/components/PageLoader/PageLoader";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import {
  base64ToBuffer,
  blocksToRegions,
  blocksToSeries,
  bufferToBase64,
  featureToSeries,
  getProtoDag,
  runAllSeriesThatDependOnAttr,
  runBlockAndDependants,
  seriesToBlocks
} from "../../engine";
import { Attribute, Feature, Flow, Movement } from "../../proto/element_pb";
import { BlockImpl } from "../../types";
import CodeBlock from "../CodeBlock/CodeBlock";
import RegionBlock from "../RegionBlock/RegionBlock";
import TextBlock from "../TextBlock/TextBlock";
import classes from "./Document.module.scss";

const MemoCodeBlock = React.memo(CodeBlock);

const LOCALSTORAGE = "local_";

const Document = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [collapse, setCollapse] = useState(true);
  const [state, actions] = useWorkbookStore();
  const [sourceScenarioId, setSourceScenarioId] = useState("");
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const storageHook = useStateWithLocalStorage(
    LOCALSTORAGE + state.scenarioId || ""
  );
  const series =
    storageHook.value !== ""
      ? featureToSeries(
          Feature.deserializeBinary(base64ToBuffer(storageHook.value)),
          1
        )
      : featureToSeries(state.feature, 1);
  const [blocks, setBlocks] = useState<BlockImpl[]>(seriesToBlocks(series));
  const stateRef = useRef<BlockImpl[]>(blocks);

  stateRef.current = blocks;

  useEffect(() => {
    try {
      initPyodide(() => {
        runAllSeriesThatDependOnAttr(series, state.feature);
        setPyodideLoaded(true);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const insertBlock = (b: BlockImpl, index: number) => {
    stateRef.current.splice(index, 0, b);

    setBlocks([...stateRef.current]);
  };

  const replaceBlock = (
    index: number,
    run: boolean,
    b: BlockImpl,
    setName: boolean = false
  ) => {
    if (stateRef.current.filter((c) => c.name === b.name).length > 1) {
      b.name += "_1";
    }

    if (setName) {
      const toSet = b.description
        .toLowerCase()
        .replace(/[^a-z,0-9,_,\s]/g, "")
        .replace(/\s+/g, "_");

      if (toSet !== "") {
        b.name = toSet;
      }
    }

    stateRef.current.splice(index, 1, b);

    if (run) {
      const blocks = [
        ...runBlockAndDependants(b, stateRef.current, state.feature)
      ];

      setBlocks(blocks);

      const f = getProtoDag(blocksToSeries(stateRef.current), state.feature);

      if (window.flows?.set) {
        const flow = new Flow();
        flow.setName(window.flows?.value?.name);

        flow.setMovementsList(
          window.flows?.value.values.map((v) => {
            const movement = new Movement();
            movement.setAmount(v);
            return movement;
          })
        );

        const flows = f.getFlowsList().filter((v) => {
          return v.getName() !== window.flows?.value?.name;
        });

        flows.push(flow);

        f.setFlowsList(flows);

        console.log(f.toObject());

        window.flows = {
          set: false,
          value: {
            name: "",
            values: []
          }
        };
      }

      if (window.attr?.set) {
        const attr = new Attribute();
        const map = f.getAttributesMap();

        const v = new Value();

        if (window.attr?.value?.value && window.attr?.value?.name && map) {
          v.setNumberValue(window.attr.value.value);
          attr.setValue(v);
          map.set(window.attr.value.name, attr);
        }

        window.attr = {
          set: false,
          value: {
            name: "",
            value: 0
          }
        };
      }

      actions.setFeature(f);
      storageHook.setValue(bufferToBase64(f.serializeBinary()));

      console.log("blocksToRegions(blocks)", blocksToRegions(blocks));
    } else {
      setBlocks([...stateRef.current]);

      actions.setFeature(
        getProtoDag(blocksToSeries(stateRef.current), state.feature)
      );
    }
  };

  const replaceBlockByName = useCallback(
    (
      oldName: string,
      name: string,
      run: boolean,
      b: BlockImpl,
      setName: boolean = false
    ) => {
      const index = stateRef.current.findIndex((b) => b.name === oldName);

      if (index != -1) {
        replaceBlock(index, run, b, setName);
      }
    },
    [...stateRef.current.map((b) => b.name)]
  );

  const deleteBlock = (index: number) => {
    stateRef.current.splice(index, 1);

    setBlocks([...stateRef.current]);

    actions.setFeature(
      getProtoDag(blocksToSeries(stateRef.current), state.feature)
    );
  };

  const deleteBlockByName = useCallback(
    (name: string) => {
      const index = stateRef.current.findIndex((b) => b.name === name);

      if (index != -1) {
        deleteBlock(index);
      }
    },
    [...stateRef.current.map((b) => b.name)]
  );

  const deleteAllBlocks = () => {
    stateRef.current = [];

    setBlocks(stateRef.current);

    actions.setFeature(
      getProtoDag(blocksToSeries(stateRef.current), state.feature)
    );
  };

  const btnClick = (i: number) => (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    ContextMenu(evt.pageX, evt.pageY, [
      {
        name: "Text",
        onClick: () => {
          insertBlock(
            {
              type: "TEXT",
              name: "text_" + generateUUID(),
              description: "text",
              text: "New text box",
              order: i + 0.01
            },
            i
          );
        }
      },
      {
        name: "Code",
        onClick: () => {
          insertBlock(
            {
              type: "CODE",
              description: "",
              name: "new_" + generateUUID().split("-")[0],
              format: "none",
              code: "",
              values: [],
              order: i + 0.01
            },
            i
          );
        }
      },
      {
        name: "Region",
        onClick: () => {
          insertBlock(
            {
              type: "REGION",
              description: "",
              name: "region_" + generateUUID().split("-")[0],
              frozenColumns: 0,
              hasHeader: false,
              hasFooter: false,
              order: i + 0.01
            },
            i
          );
        }
      }
    ]);
  };

  // TODO development only, for copy DAG
  const handleCopy = (scenarioId: string) => {
    actions.loadRootFeature(scenarioId);
  };

  // TODO development only, for copy DAG
  useEffect(() => {
    if (state.featureDAG != null) {
      const newFeature = replaceFeatureDAG(state.feature, state.featureDAG);
      actions.setFeature(newFeature);
      storageHook.setValue(bufferToBase64(newFeature.serializeBinary()));
    }
  }, [state.featureDAG]);

  return (
    <div className={classes.container}>
      {!pyodideLoaded && (
        <PageLoader title={"LOADING"}>
          <LoaderIcons />
        </PageLoader>
      )}
      {pyodideLoaded && (
        <div className={classes.buttons}>
          <Accordion isOpen={false} display="flat" header="">
            <div className={classes.button}>
              <Tooltip title="Delete All Blocks">
                <DeleteIcon onClick={deleteAllBlocks}></DeleteIcon>
              </Tooltip>
              <Tooltip title="Save">
                <SaveIcon
                  onClick={async () => {
                    if (state.scenarioId == null) {
                      enqueueSnackbar("Scenario ID must be provided!", {
                        variant: "error",
                        preventDuplicate: true
                      });
                      return;
                    }
                    await actions.saveData({
                      scenarioId: state.scenarioId,
                      id: state.id,
                      userId: state.userId,
                      buildingId: state.buildingId
                    });
                    storageHook.setValue("");
                  }}
                ></SaveIcon>
              </Tooltip>
              {collapse && (
                <ExpandLessIcon
                  onClick={() => setCollapse(!collapse)}
                ></ExpandLessIcon>
              )}
              {!collapse && (
                <ExpandMoreIcon
                  onClick={() => setCollapse(!collapse)}
                ></ExpandMoreIcon>
              )}
              <input
                type="text"
                value={sourceScenarioId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSourceScenarioId(e.target.value)
                }
              />
              <Tooltip title="Save">
                <FileCopyIcon
                  onClick={async () => handleCopy(sourceScenarioId)}
                ></FileCopyIcon>
              </Tooltip>
            </div>
          </Accordion>
          <div className={classes.button}>
            <AddBlockButton clicked={btnClick(0)} />
          </div>
        </div>
      )}
      {pyodideLoaded &&
        stateRef.current.map((b, i) => {
          let toReturn: any = null;
          if (b.type === "TEXT") {
            toReturn = (
              <TextBlock
                key={b.name}
                name={b.name}
                defaultText={b.text}
                save={replaceBlock.bind(undefined, i, false)}
                delete={deleteBlock.bind(undefined, i)}
              />
            );
          } else if (b.type === "CODE") {
            toReturn = (
              <MemoCodeBlock
                key={b.name}
                block={b}
                save={replaceBlockByName}
                delete={deleteBlockByName}
                collapse={collapse}
              />
            );
          } else if (b.type === "REGION") {
            toReturn = (
              <RegionBlock
                key={b.name}
                block={b}
                save={replaceBlock.bind(undefined, i)}
                blocks={stateRef}
                delete={deleteBlock.bind(undefined, i)}
                collapse={collapse}
              />
            );
          }

          return (
            <div key={b.name} className={classes.blocks}>
              <div className={classes.addBlock}>
                <AddBlockButton clicked={btnClick(i + 1)} />
              </div>
              {toReturn}
            </div>
          );
        })}
    </div>
  );
};

const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export default Document;
