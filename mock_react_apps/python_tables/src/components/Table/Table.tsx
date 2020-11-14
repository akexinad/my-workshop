import React, { FC } from "react";
import { CellProps, useBlockLayout, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import { CB, RegionCell, RegionColumn, RegionTableRow } from "../../types";
import EditableCell from "../EditableCell/EditableCell";
import classes from "./Table.module.scss";

interface TableProps {
  regionColumns: Array<RegionColumn>;
  data: Array<RegionTableRow>;
}

export const Table: FC<TableProps> = ({ regionColumns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    columns,
    prepareRow,
  } = useTable(
    {
      columns: regionColumns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useSticky
  );

  columns.forEach((column) => {
    column.Cell = (
      props: React.PropsWithChildren<CellProps<RegionTableRow, RegionCell>>
    ) => {
      /**
       * Casting to CB as TS throws type
       * error because types string and CB are
       * incompatible.
       */
      const codeBlock = props.value as CB;

      if (codeBlock.value) {
        return <EditableCell value={codeBlock.value} />;
      }

      return props.value;
    };
  });

  // Workaround as react-table footerGroups doesn't provide the same internal data than headerGroups
  const footerGroups = headerGroups.slice().reverse();

  return (
    <div
      {...getTableProps()}
      className={[classes.table, classes.sticky].join(" ")}
      style={{ width: 1200, height: 400 }}
    >
      <div className={classes.header}>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className={classes.tr}>
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className={classes.th}>
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className={classes.body}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className={classes.tr}>
              {row.cells.map((cell) => {
                return (
                  <div {...cell.getCellProps()} className={classes.td}>
                    {cell.render("Cell")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className={classes.footer}>
        {footerGroups.map((footerGroup) => (
          <div {...footerGroup.getHeaderGroupProps()} className={classes.tr}>
            {footerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className={classes.td}>
                {column.render("Footer")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
