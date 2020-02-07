import React, { useMemo } from "react";

import Table from "../components/Table/Table";

import makeData from "../utils/makeData";
import { Column, Data } from "../utils/interfaces";

import "./App.css";
import StyledTable from "../components/UI/StyledTable";

const App = () => {
  const [data, setData] = React.useState<Array<Data>>(() => makeData(20))
  const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)
  
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

  const updateMyData = (rowIndex: number, columnId: number, value: string) => {

    setData(old => old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value
        }
      }
      return row;
    }))
    
  }

  return (
    <div className="App">
      <h1>LL Finance</h1>
      <StyledTable>
        <Table columns={columns} data={data} updateMyData={updateMyData} />
      </StyledTable>
    </div>
  );
};

export default App;
