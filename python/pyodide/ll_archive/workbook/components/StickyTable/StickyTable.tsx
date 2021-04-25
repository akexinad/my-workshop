import { CB, FinancialTable, Region } from "pages/workbook/types";
import {
  getTableBodyClasses,
  getTableHeaderAndFooterClasses
} from "pages/workbook/utils/utils";
import React, { FC } from "react";
import { CellProps, useBlockLayout, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import classes from "./StickyTable.module.scss";

interface TableFrozenColumnsProps {
  table: FinancialTable;
  header: boolean;
  footer: boolean;
}

const StickyTable: FC<TableFrozenColumnsProps> = (props) => {
  const { table, header, footer } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    columns,
    prepareRow
  } = useTable(
    {
      columns: table.columns,
      data: table.rows
    },
    useBlockLayout,
    useSticky
  );

  columns.forEach((column) => {
    /**
     * TODOdc: A separate component to handle inputs
     */
    column.Cell = (props: React.PropsWithChildren<CellProps<Region>>) => {
      const codeBlock: CB = props.cell.value;

      if (codeBlock && codeBlock.values) {
        return <input value={codeBlock.values[0]} readOnly />;
      } else {
        return props.cell.value || null;
      }
    };
  });

  /**
   * Comment and line below is from official example:
   * https://github.com/GuillaumeJasmin/react-table-sticky
   */
  // Workaround as react-table footerGroups doesn't provide the same internal data than headerGroups
  const footerGroups = headerGroups.slice().reverse();

  return (
    <div
      {...getTableProps()}
      className={[classes.table, classes.sticky].join(" ")}
    >
      {!header ? null : (
        <div className={classes.header}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className={classes.tr}>
              {headerGroup.headers.map((column) => {
                const className = getTableHeaderAndFooterClasses(
                  column,
                  classes,
                  classes.th
                );

                return (
                  <div {...column.getHeaderProps()} className={className}>
                    {column.render("Header")}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      <div {...getTableBodyProps()} className={classes.body}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className={classes.tr}>
              {row.cells.map((cell) => {
                const className = getTableBodyClasses(
                  cell,
                  classes,
                  classes.td
                );

                return (
                  <div {...cell.getCellProps()} className={className}>
                    {cell.render("Cell")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {!footer ? null : (
        <div className={classes.footer}>
          {footerGroups.map((footerGroup) => (
            <div {...footerGroup.getHeaderGroupProps()} className={classes.tr}>
              {footerGroup.headers.map((column) => {
                return (
                  <div {...column.getHeaderProps()} className={classes.td}>
                    {column.render("Footer")}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StickyTable;
