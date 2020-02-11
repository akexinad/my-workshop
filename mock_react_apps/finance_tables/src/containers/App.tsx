import React, { useMemo, useEffect } from "react";
import { TableInstance, Row, Column } from "react-table";

import Table from "../components/Table/Table";

import makeData from "../utils/makeData";
import financeDataMapper from "../utils/financeDataMapper";
import { MyColumn, Data } from "../utils/interfaces";

import "./App.css";
import StyledTable from "../components/UI/StyledTable";
import EditableCell from "../components/EditableCell/EditableCell";

const App = () => {
  const [data, setData] = React.useState(() => financeDataMapper.data);
  // const [originalData] = React.useState(financeDataMapper.data);
  // const resetData = () => setData(originalData);

  useEffect(() => {
    financeDataMapper.sumTotals();
    // setData(data);
  }, [data]);

  const columns = useMemo(
    () => [
      // {
      //   Header: "Name",
      //   columns: [
      //     {
      //       Header: "First Name",
      //       accessor: "firstName",
      //       Footer: "Total"
      //     },
      //     {
      //       Header: "LastName",
      //       accessor: "lastName"
      //     }
      //   ]
      // },
      {
        Header: "Sales",
        columns: [
          {
            Header: "Unit Types (Sales)",
            accessor: "name",
            Footer: "Total"
          },
          {
            Header: "Expected Sales Price Per Unit",
            accessor: "input",
            Cell: EditableCell
          },
          {
            Header: "Quantity",
            accessor: "quantity"
          },
          {
            Header: "Income",
            accessor: "total",

            Footer: (info: TableInstance) => {
              const total = useMemo(
                () =>
                  info.rows.reduce(
                    (sum: number, row: Row) => row.values.total + sum,
                    0
                  ),
                [info.rows]
              );

              return <>{total}</>;
            }
          }
        ]
      }
    ],
    []
  );

  // console.log(data);

  const _updateMyData = (
    rowIndex: number,
    columnId: number,
    value: string
  ): void => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
    financeDataMapper.sumTotals();
  };

  return (
    <div className="App">
      <h1>LL Finance</h1>
      {/* <button onClick={resetData}>RESET DATA</button> */}
      <StyledTable>
        <Table
          columns={columns}
          data={data[0].rows}
          updateMyData={_updateMyData}
        />
      </StyledTable>
    </div>
  );
};

export default App;
