import { RegionTable, RegionTableColumn, RegionTableRow } from "../types";
import capitalizeEach from "./capitalizeEach";

export const createRegionTable = (data: RegionTable, frozenColumns: number) => {
  /**
   * transform the array of arrays into an array of objects,
   * attaching the accessor property to each cell value so
   * that it is readable for react-table.
   */
  const createRows = (data: RegionTable) => {
    return data.rows.map((row) => {
      let regionTableRow: RegionTableRow = {};

      row.forEach((cell, index) => {
        /**
         * If there are more rows than columns. Shouldn't happen
         * but we still need to check.
         */
        if (!regionTableColumns[index]) return;

        const columnAccessor = regionTableColumns[index].accessor;

        const value = {
          [columnAccessor]: cell === 0 ? "-" : cell,
        };

        regionTableRow = {
          ...regionTableRow,
          ...value,
        };
      });

      return regionTableRow;
    });
  };

  let regionTableColumns: Array<RegionTableColumn>;

  /**
   * React table's useTable hook requires the column object
   * for it's accessor property.
   */
  if (!data.headers) {
    regionTableColumns = data.rows.map((row, index) => ({
      Header: row[0].toString(),
      accessor: row[0].toString() + index,
    }));

    return {
      regionTableColumns,
      regionTableRows: createRows(data),
    };
  }

  regionTableColumns = data.headers.map((header, index) => {
    // Make the first set of columns freeze on the left
    while (index < frozenColumns) {
      return {
        Header: capitalizeEach(header.toString()),
        accessor: header.toString(),
        Footer: data.footers
          ? capitalizeEach(data.footers.toString()[index])
          : null,
        sticky: "left",
      };
    }

    return {
      Header: capitalizeEach(header.toString()),
      accessor: header.toString(),
      Footer: data.footers
        ? capitalizeEach(data.footers.toString()[index])
        : null,
    };
  });

  return {
    regionTableColumns,
    regionTableRows: createRows(data),
  };
};
