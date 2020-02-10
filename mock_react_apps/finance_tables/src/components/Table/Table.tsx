import React, { FC } from "react";
import { useTable, Column, HeaderGroup, Row } from "react-table";
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
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    defaultColumn: {
      Cell: EditableCell
    },
    // @ts-ignore
    updateMyData
  });

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
    </table>
  );
};

export default Table;
