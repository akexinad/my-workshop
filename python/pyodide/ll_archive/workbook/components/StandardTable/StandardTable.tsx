import { CB, FinancialTable, Region } from "pages/workbook/types";
import { getTableBodyClasses } from "pages/workbook/utils/utils";
import React, { FC } from "react";
import { CellProps, useTable } from "react-table";
import classes from "./StandardTable.module.scss";

interface StandardTableProps {
  table: FinancialTable;
  header: boolean;
  footer: boolean;
}

const StandardTable: FC<StandardTableProps> = (props) => {
  const { table, header, footer } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    columns,
    rows,
    prepareRow
  } = useTable({
    columns: table.columns,
    data: table.rows
  });

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

  return (
    <table {...getTableProps()} className={classes.table}>
      {!header ? null : (
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
      )}

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const className = getTableBodyClasses(cell, classes);

                return (
                  <td {...cell.getCellProps()} className={className}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>

      {!footer ? null : (
        <tfoot>
          <tr {...footerGroups[0].getFooterGroupProps()}>
            {footerGroups[0].headers.map((columns) => (
              <td {...columns.getFooterProps()}>{columns.render("Footer")}</td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default StandardTable;
