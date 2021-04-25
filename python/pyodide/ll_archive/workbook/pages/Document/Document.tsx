import React from "react";
import Document from "../../structures/Document/Document";
import WorkbookBasePage from "../WorkbookBasePage/WorkbookBasePage";
import classes from "./Document.module.scss";

const Doc = () => {
  return (
    <WorkbookBasePage>
      <div className={classes.container}>
        <div className={classes.document}>
          <Document />
        </div>
      </div>
    </WorkbookBasePage>
  );
};

export default Doc;
