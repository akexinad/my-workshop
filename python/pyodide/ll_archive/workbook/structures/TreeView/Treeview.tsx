import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Treebeard, TreeNode } from "react-treebeard";
import { Routes } from "routes/routes";
import { RouteProps } from "routes/types";
import { Button } from "styling/components/Button/Button";
import { featureToSeries, saveByteArray } from "../../engine";
import useWorkbookStore from "../../state/workbookStore";
import classes from "./TreeView.module.scss";

interface TreeviewProps {
  setCursor: (c: TreeNode) => void;
  cursor: TreeNode | undefined;
}

const Treeview: FC<TreeviewProps> = ({ cursor, setCursor }) => {
  const history = useHistory();
  const [state, actions] = useWorkbookStore();
  const { enqueueSnackbar } = useSnackbar();
  const route: RouteProps = Routes.filter(
    (route) => route.name === "WorkbookDocument"
  )[0];
  return (
    <div className={classes.treeview}>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button
            classType="primary"
            onClick={() => {
              if (cursor && cursor.feature) {
                const { feature } = cursor;

                const series = featureToSeries(
                  feature,
                  state.periodsToCalculate
                );

                actions.setFeature(feature);

                actions.setSeries(series);

                history.push(`${route.path}?scenarioId=${state.scenarioId}`);
              }
            }}
          >
            Edit
          </Button>
        </div>
        <div className={classes.button}>
          <Button
            classType="primary"
            onClick={() => {
              saveByteArray(
                `${state.forest.getName()}.kalamata`,
                state.forest.serializeBinary()
              );
            }}
          >
            Save File
          </Button>
        </div>
        <div className={classes.button}>
          <Button
            classType="primary"
            onClick={() => {
              if (state.scenarioId == null) {
                enqueueSnackbar("Scenario ID must be provided!", {
                  variant: "error",
                  preventDuplicate: true
                });
                return;
              }
              actions.saveData({
                scenarioId: state.scenarioId,
                id: state.id,
                userId: state.userId,
                buildingId: state.buildingId
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <Treebeard
        data={state.tree}
        onToggle={(node: TreeNode) => {
          if (node.children && node.children.length) {
            node.toggled = !node.toggled;
          }

          if (cursor) {
            cursor.active = false;
          }
          node.active = true;
          setCursor(node);

          actions.setTree(state.tree);
        }}
      />
    </div>
  );
};

export default Treeview;
