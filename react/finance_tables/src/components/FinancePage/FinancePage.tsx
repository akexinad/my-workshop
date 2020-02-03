import React, { Component } from "react";

import {
  tableIncomeColumns,
  tableIncomeRows
} from "../../data/mockFinanceData";

export default class FinancePage extends Component {
  state = {
    tableIncomeColumns,
    tableIncomeRows
  };

  render() {
    return <h2>Finance Page</h2>;
  }
}
