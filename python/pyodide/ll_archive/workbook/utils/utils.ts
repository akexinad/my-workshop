import { capitalize } from "lodash";
import { Cell, ColumnInstance } from "react-table";
import {
  CSSClasses,
  Region,
  RegionTableColumn,
  RegionTableRow
} from "../types";

export const capitalizeEach = (word: string) => {
  const str = word.toString();

  if (!str) return word;

  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const createRegionFinancialTable = (region: Region) => {
  const { frozenColumns, header, footer, data } = region;

  /**
   * transform the array of arrays into an array of objects,
   * attaching the accessor property to each cell value so
   * that it is readable for react-table.
   */
  const createRows = (regionRows: Region["data"]) => {
    return regionRows.map((row) => {
      let tableRow: RegionTableRow = {};

      row.forEach((cell, index) => {
        /**
         * Return if there are more rows than columns.
         */
        if (!columns[index]) return;

        /**
         * The accessor is the common denominator between the column
         * and the data in react table.
         */
        const columnAccessor = columns[index].accessor;

        /** replace 0 with - as per excel's accounting format */
        const value = {
          [columnAccessor]: cell === 0 ? "-" : cell
        };

        tableRow = {
          ...tableRow,
          ...value
        };
      });

      return tableRow;
    });
  };

  let columns: Array<RegionTableColumn>;

  /**
   * React table's useTable hook requires the column object
   * for it's accessor property even if the table header
   * won't be visible in the UI.
   */
  if (!header) {
    columns = ((region.data || [])[0] || []).map((row, index) => ({
      Header: row ? row.toString() : "header" + index,
      accessor: "accessor" + index
    }));

    return {
      columns,
      rows: createRows(data)
    };
  }

  columns = header.map((value, index) => {
    // Make the first set of columns freeze on the left
    while (index < frozenColumns) {
      return {
        Header: value === "blank" ? "" : capitalizeEach(value.toString()),
        accessor: "accessor" + index,
        // footer won't always be available
        // Footer: footer ? capitalizeEach(footer[index].toString()) : null,
        sticky: "left"
      };
    }

    return {
      Header: value === "blank" ? "" : capitalizeEach(value.toString()),
      accessor: "accessor" + index
      // Footer: region.footer
      //   ? capitalizeEach(region.footer[index].toString())
      //   : null
    };
  });

  return {
    columns,
    rows: createRows(data)
  };
};

export const getTableBodyClasses = (
  cell: Cell<RegionTableRow>,
  classes: CSSClasses,
  currentClassName?: keyof CSSClasses
): string => {
  const classNames = currentClassName ? [currentClassName] : [];

  /**
   * First column in the table
   */
  if (cell.column.id === "accessor0") {
    classNames.push(classes.firstColumn);

    return classNames.join(" ");
  }

  return classNames.join(" ");
};

export const getTableHeaderAndFooterClasses = (
  column: ColumnInstance<RegionTableRow>,
  classes: CSSClasses,
  currentClassName: keyof CSSClasses
): string => {
  const classNames = [currentClassName];

  /**
   * First column in the table
   */
  if (column.id === "accessor0") {
    classNames.push(classes.firstColumn);

    return classNames.join(" ");
  }

  return classNames.join(" ");
};
