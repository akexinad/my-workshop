import { FormControlLabel, Switch } from "@material-ui/core";
import { getRootFeature } from "pages/workbook/state/utils";
import useWorkbookStore from "pages/workbook/state/workbookStore";
import DocumentView from "pages/workbook/structures/DocumentView/DocumentView";
import React, { useEffect } from "react";
import Document from "../../structures/Document/Document";
import WorkbookBasePage from "../WorkbookBasePage/WorkbookBasePage";
import classes from "./WorkbookPage.module.scss";

const WorkbookPage = () => {
  const [workbookState, workbookStateActions] = useWorkbookStore();
  const [state, setState] = React.useState({
    regionView: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (workbookState.forest?.getFeaturesMap()?.getLength() > 0) {
      const feature = getRootFeature(workbookState.forest);
      if (feature != null) {
        workbookStateActions.setFeature(feature);
      }
    }
  }, [workbookState.forest]);

  const DocumentDiv = () => {
    if (workbookState.feature.getName() === "") return <></>;
    if (state.regionView) {
      return <DocumentView />;
    }
    return <Document />;
  };

  return (
    <WorkbookBasePage>
      <div className={classes.toggleDiv}>
        <FormControlLabel
          control={
            <Switch
              checked={state.regionView}
              onChange={handleChange}
              color="primary"
              name="regionView"
              inputProps={{ "aria-label": "primary  checkbox" }}
            />
          }
          label="Region View"
        />
      </div>
      {DocumentDiv()}
    </WorkbookBasePage>
  );
};

export default WorkbookPage;
