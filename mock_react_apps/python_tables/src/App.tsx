import React from "react";
import "./App.css";
import { Table } from "./components/Table/Table";
import { mockRegionTableData } from "./data/mockRegionTableData";
import { RegionTableColumn, RegionTableRow } from "./types";
import capitalizeEach from "./utils/capitalizeEach";

function App() {
  const FROZEN_COLUMNS = 5;

  // const columns: Array<RegionTableColumn> = mockRegionTableData.headers.map(
  //   (header, index) => {
  //     // Make the first set of columns freeze on the left
  //     while (index < FROZEN_COLUMNS) {
  //       return {
  //         Header: capitalizeEach(header),
  //         accessor: header,
  //         Footer: capitalizeEach(mockRegionTableData.footers[index]),
  //         sticky: "left",
  //       };
  //     }

  //     return {
  //       Header: capitalizeEach(header),
  //       accessor: header,
  //       Footer: capitalizeEach(mockRegionTableData.footers[index]),
  //     };
  //   }
  // );

  /**
   * transform the array of arrays into an array of objects,
   * attaching the accessor property to each cell value so
   * that it is readable for react-table.
   */
  // const data = mockRegionTableData.rows.map((row) => {
  //   let regionCellObject: RegionTableRow = {};

  //   row.forEach((cell, index) => {
  //     if (!columns[index]) return;

  //     const columnAccessor = columns[index].accessor;

  //     const value = {
  //       [columnAccessor]: cell === 0 ? "-" : cell,
  //     };

  //     regionCellObject = {
  //       ...regionCellObject,
  //       ...value,
  //     };
  //   });

  //   return regionCellObject;
  // });

  // const memoColumns = React.useMemo(() => columns, [columns]);

  // const memoData = React.useMemo(() => data, [data]);

  return (
    <div className="App">
      <Table data={mockRegionTableData} frozenColumns={5} />
    </div>
  );
}

export default App;
