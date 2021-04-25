import useStateWithLocalStorage from "api/stateWithLocalStorage";
import useWorkbookStore from "pages/workbook/state/workbookStore";
import RegionView from "pages/workbook/structures/RegionView/RegionView";
import TextBlockView from "pages/workbook/structures/TextBlockView/TextBlockView";
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-scroll";
import {
  base64ToBuffer,
  blocksToRegions,
  featureToSeries,
  seriesToBlocks
} from "../../engine";
import { Feature } from "../../proto/element_pb";
import { BlockImpl } from "../../types";
import classes from "./DocumentView.module.scss";

const LOCALSTORAGE = "local_";

const defaultText = `
1. Define Initial Parameters for DCF:

Here we are initialising the parameters for the initial rent, annualised growth rate, and vacancy rate we are expecting:`;

const DocumentView = () => {
  const [state] = useWorkbookStore();
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
  const [blocks] = useState<BlockImpl[]>(seriesToBlocks(series));
  const stateRef = useRef<BlockImpl[]>(blocks);
  const regions = useMemo(() => blocksToRegions(stateRef.current), [
    stateRef.current
  ]);

  stateRef.current = blocks;

  return (
    <>
      <div className={classes.summaryDiv}>
        <Link
          className={classes.buttons}
          activeClass="active"
          to={"block" + (regions?.length - 1)}
          spy={true}
          smooth={true}
          duration={500}
        >
          Model Summary
        </Link>
      </div>
      <div className={classes.container}>
        {regions.map((b, i) => {
          let toReturn: any = null;

          if (b.type === "REGION") {
            toReturn = (
              <div id={"block" + i}>
                <RegionView region={b} />
              </div>
            );
          } else if (b.type === "TEXT") {
            toReturn = (
              <div id={"block" + i}>
                <TextBlockView
                  defaultText={""}
                  state={b.values ? JSON.parse(b.values[0].value) : []}
                />
              </div>
            );
          }

          return (
            <div key={b.name} className={classes.blocks}>
              {toReturn}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DocumentView;
