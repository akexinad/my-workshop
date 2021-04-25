import { Region } from "pages/workbook/types";
import { createRegionFinancialTable } from "pages/workbook/utils/utils";
import React, { FC, useMemo } from "react";
import StandardTable from "../StandardTable/StandardTable";
import StickyTable from "../StickyTable/StickyTable";
import classes from "./RegionFinancialTable.module.scss";

interface RegionTableProps {
  region: Region;
}

const RegionFinancialTable: FC<RegionTableProps> = ({ region }) => {
  const { hasHeader, hasFooter, frozenColumns } = region;

  const table = useMemo(() => createRegionFinancialTable(region), [region]);

  return (
    <div className={classes.container}>
      {frozenColumns ? (
        <StickyTable table={table} header={hasHeader} footer={hasFooter} />
      ) : (
        <StandardTable table={table} header={hasHeader} footer={hasFooter} />
      )}
    </div>
  );
};

export default RegionFinancialTable;
