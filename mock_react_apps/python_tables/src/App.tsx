import React from "react";
import logo from "./logo.svg";
import "./App.css";
import makeData from "./data/makeData";
import { Table } from "./components/Table/Table";

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        Footer: "Name",
        sticky: "left",
        columns: [
          {
            Header: "First Name",
            Footer: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            Footer: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        Footer: "Info",
        columns: [
          {
            Header: "Age",
            Footer: (info: any) => {
              const total = info.rows.reduce(
                (sum: number, row: any) => row.values.age + sum,
                0
              );
              const average = Math.round(total / info.rows.length);
              return <div>Moyenne: {average}</div>;
            },
            accessor: "age",
            width: 50,
          },
          {
            Header: "Visits",
            Footer: "Visits",
            accessor: "visits",
            width: 60,
          },
          {
            Header: "Status",
            Footer: "Status",
            accessor: "status",
          },
        ],
      },
      {
        Header: " ",
        Footer: " ",
        sticky: "right",
        columns: [
          {
            Header: "Profile Progress",
            Footer: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(40), []);

  return (
    <div className="App">
        <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
