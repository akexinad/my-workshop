import React from "react";
import "./App.css";
import { Table } from "./components/Table/Table";
import { mockRegionTableData } from "./data/mockRegionTableData";

function App() {
  return (
    <div className="App">
      <Table data={mockRegionTableData} frozenColumns={5} />
    </div>
  );
}

export default App;
