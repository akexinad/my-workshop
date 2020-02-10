import React, { useMemo } from "react";

import Table from "../components/Table/Table";

import makeData from "../utils/makeData";
import { Column, Data } from "../utils/interfaces";

import "./App.css";
import StyledTable from "../components/UI/StyledTable";

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
            accessor: "firstName"
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
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
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
