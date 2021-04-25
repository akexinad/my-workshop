import PageWrapper from "components/Pages/PageWrapper";
import useWorkbookStore from "pages/workbook/state/workbookStore";
import React, { useEffect } from "react";
import { useQueryParameters } from "routes/hooks";
import { useProjectStore } from "stores/projectStore";
import { useScenarioStore } from "stores/scenarioStore";

const WorkbookBasePage = (props: { children?: React.ReactNode }) => {
  let queryParams = useQueryParameters();
  const [projectStore, projectStoreActions] = useProjectStore();
  const [scenarioStore, scenarioStoreActions] = useScenarioStore();
  const [state, actions] = useWorkbookStore();

  useEffect(() => {
    if (
      queryParams.scenarioId != null &&
      typeof queryParams.scenarioId === "string"
    ) {
      if (
        scenarioStore.selectedScenarioId == null ||
        scenarioStore.selectedScenarioId === ""
      ) {
        scenarioStoreActions.getScenarios([queryParams.scenarioId]);
        scenarioStoreActions.setSelectedScenario(queryParams.scenarioId, "");
      }
      actions.setScenarioId(queryParams.scenarioId);
      actions.loadData(queryParams.scenarioId);
    }
  }, [queryParams.scenarioId]);

  useEffect(() => {
    if (
      queryParams.projectId != null &&
      typeof queryParams.projectId === "string"
    ) {
      if (
        projectStore.selectedProjectId == null ||
        projectStore.selectedProjectId === ""
      ) {
        projectStoreActions.getProject(queryParams.projectId);
        projectStoreActions.setSelectedProject(queryParams.projectId, "");
      }
    }
  }, [queryParams.projectId]);

  useEffect(() => {
    if (state.forest != null && state.forest.getName() !== "") {
      actions.updateForest(state.forest);
    }
  }, [state.forest]);

  return <PageWrapper>{props.children}</PageWrapper>;
};

export default WorkbookBasePage;
