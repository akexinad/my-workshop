import React, { FC } from "react";
import {
  useTable,
  Column,
  HeaderGroup,
  Row,
  TableInstance,
  ColumnInstance
} from "react-table";
import EditableCell from "../EditableCell/EditableCell";

interface TableProps {
  columns: Column[];
  data: {}[];
  updateMyData: (index: number, id: number, value: string) => void;
}

const Table: FC<TableProps> = ({ columns, data, updateMyData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    // defaultColumn: {
    //   Cell: columns[0].columns?.map((column: any) => column.editable),
    // },
    // @ts-ignore
    updateMyData
  });

  console.log("data:", data);
  

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: Row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr {...footerGroups[0].getFooterGroupProps()}>
          {footerGroups[0].headers.map((column: ColumnInstance) => (
            <td {...column.getFooterProps()}>{column.render("Footer")}</td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
