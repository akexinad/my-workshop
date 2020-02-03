import React, { Component } from "react";

import {
  tableIncomeColumns,
  tableIncomeRows,
  tableExpensesDevCostColumns,
  tableExpensesDesignColumns,
  tableExpensesDesignRows,
  tableOtherDevCostsColumns,
  tableOtherDevCostsRows
} from "../../data/mockFinanceData";

import {
  TableColumn,
  TableRow,
  FinanceTableTitle
} from "../../utils/interfaces";
import FinanceTable from "../FinanceTable/FinanceTable";

interface FinancePageState {
    financeTables: {
        title: FinanceTableTitle
    }
  tableIncomeColumns: TableColumn[];
  tableIncomeRows: TableRow[];
  tableExpensesDevCostColumns: TableColumn[];
  tableExpensesDesignColumns: TableColumn[];
  tableExpensesDesignRows: TableRow[];
  tableOtherDevCostsColumns: TableColumn[];
  tableOtherDevCostsRows: TableRow[];
}

const titles: FinanceTableTitle[] = [
  "Unit Sales",
  "Development Costs",
  "Design And Construction Costs",
  "Other Develeopment Costs"
];

export default class FinancePage extends Component<null, FinancePageState> {
  state: FinancePageState = {
      financeTables: [{
          title: "Unit Sales",
          column: tableIncomeColumns
      }]
      
    tableIncomeColumns,
    tableIncomeRows,
    tableExpensesDevCostColumns,
    tableExpensesDesignColumns,
    tableExpensesDesignRows,
    tableOtherDevCostsColumns,
    tableOtherDevCostsRows
  };

  renderFinanceTables = () => titles.map(title => (
  <FinanceTable />));

  render() {
    return <h2>Finance Page</h2>;
  }
}
