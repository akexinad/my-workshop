import React, { useMemo } from "react";

import Table from "../components/Table/Table";

import makeData from "../utils/makeData";
import { Column, Data } from "../utils/interfaces";

import "./App.css";
import StyledTable from "../components/UI/StyledTable";
import { TableInstance, Row } from "react-table";

const App = () => {
  const [data, setData] = React.useState<Array<Data>>(() => makeData(20));
  const [originalData] = React.useState(data);
  const resetData = () => setData(originalData);

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
            Footer: "Total"
          },
          {
            Header: "LastName",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age"
          },
          {
            Header: "Visits",
            accessor: "visits"
            // Footer: (info: TableInstance) => {
            //   const total = useMemo(
            //     () =>
            //       info.rows.reduce(
            //         (sum: number, row: Row) => row.values.visits + sum,
            //         0
            //       ),
            //     [info.rows]
            //   );

            //   return <>Total: {total}</>;
            // }
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
            Footer: (info: TableInstance) => {
              const total = useMemo(
                () =>
                  info.rows.reduce(
                    (sum: number, row: Row) => row.values.progress + sum,
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

  console.log(data);

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
  };

  return (
    <div className="App">
      <h1>LL Finance</h1>
      <button onClick={resetData}>RESET DATA</button>
      <StyledTable>
        <Table columns={columns} data={data} updateMyData={_updateMyData} />
      </StyledTable>
    </div>
  );
};

export default App;
