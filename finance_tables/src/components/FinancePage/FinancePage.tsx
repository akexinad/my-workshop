import React, { Component } from "react";

import {
  tableIncomeColumns,
  tableIncomeRows,
  tableExpensesDevCostColumns,
  tableExpensesDevCostRows,
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
    title: FinanceTableTitle;
  };
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

export default class FinancePage extends Component {
  render() {
    return (
      <div className="financials">
        <h2>Finance Page</h2>
        {/* FINANCIAL HEADER COMPONENT */}

        <section className="separator table">
          <h2>Income (Revenue)</h2>
          <FinanceTable
            title={titles[0]}
            columns={tableIncomeColumns}
            rows={tableIncomeRows}
          ></FinanceTable>
        </section>

        <section className="separator table">
          <h2>Development Expenses</h2>
          <FinanceTable
            title={titles[1]}
            columns={tableExpensesDevCostColumns}
            rows={tableExpensesDevCostRows}
          ></FinanceTable>
        </section>

        <section className="separator table">
          <h2>Design Expenses</h2>
          <FinanceTable
            title={titles[2]}
            columns={tableExpensesDesignColumns}
            rows={tableExpensesDesignRows}
          ></FinanceTable>
        </section>

        <section className="separator table">
          <h2>Miscellaneous</h2>
          <FinanceTable
            title={titles[3]}
            columns={tableOtherDevCostsColumns}
            rows={tableOtherDevCostsRows}
          ></FinanceTable>
        </section>
      </div>
    );
  }
}
