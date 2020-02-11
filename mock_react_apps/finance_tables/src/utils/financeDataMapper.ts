import {
  tableIncomeColumns,
  tableIncomeRows,
  tableExpensesDevCostColumns,
  tableExpensesDevCostRows,
  tableExpensesDesignColumns,
  tableExpensesDesignRows,
  tableOtherDevCostsColumns,
  tableOtherDevCostsRows
} from "../data/mockFinanceData";

const financeDataMapper = {
  data: [
    {
      title: "Sales Income",
      columns: tableIncomeColumns,
      rows: tableIncomeRows
    },
    {
      title: "Development Costs",
      columns: tableExpensesDevCostColumns,
      rows: tableExpensesDevCostRows
    },
    {
      title: "Design Costs",
      columns: tableExpensesDesignColumns,
      rows: tableExpensesDesignRows
    },
    {
      title: "Misc Development Costs",
      columns: tableOtherDevCostsColumns,
      rows: tableOtherDevCostsRows
    }
  ],

  sumTotals: () => {
    financeDataMapper.data.forEach(table =>
      table.rows.map(row => (row.total = row.input * row.quantity))
    );
  }
};

export default financeDataMapper;
