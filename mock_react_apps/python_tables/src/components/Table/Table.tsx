import React, { FC, useState } from "react";
import { CellProps, useBlockLayout, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";
import { CB, RegionCell, RegionColumn, RegionTableRow } from "../../types";
import EditableCell from "../EditableCell/EditableCell";

const Styles = styled.div`
  padding: 1rem;

  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

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
      const codeBlock = props.value as CB;

      if (codeBlock.value) {
        return (
          <EditableCell value={codeBlock.value} />
        );
      }

      return props.value;
    };
  });

  // Workaround as react-table footerGroups doesn't provide the same internal data than headerGroups
  const footerGroups = headerGroups.slice().reverse();

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: 1200, height: 400 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="footer">
          {footerGroups.map((footerGroup) => (
            <div {...footerGroup.getHeaderGroupProps()} className="tr">
              {footerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="td">
                  {column.render("Footer")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};
