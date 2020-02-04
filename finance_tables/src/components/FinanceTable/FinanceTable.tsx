import React, { FC, Fragment, ChangeEvent, useState } from "react";
import {
  FinanceTableTitle,
  TableColumn,
  TableRow
} from "../../utils/interfaces";

import styles from "./FinanceTable.module.css";
import FinanceColumnHeader from "../FinanceColumnHeader/FinanceColumnHeader";
import FinanceTableData from "../FinanceTableData/FinanceTableData";

interface FinanceTableProps {
  title: FinanceTableTitle;
  columns: TableColumn[];
  rows: TableRow[];
}

const FinanceTable: FC<FinanceTableProps> = props => {
  const [unitInput, setUnitInput] = useState(0);

  console.log(props);

  const _changeUnitPrice = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log(e.target.value);

    setUnitInput(+e.target.value);
  };

  const renderTableTitles = () => (
    <table className={styles.Table}>
      <tbody>
        <tr>
          <th>
            <h3>{props.title}</h3>
          </th>
          <th>User Inputs</th>
          <th>System Inputs</th>
          <th>Results</th>
        </tr>
      </tbody>
    </table>
  );

  const renderColumnHeadings = () => (
    <table className={styles.Table}>
      <tbody>
        <tr>
          {props.columns.map(column => (
            <FinanceColumnHeader key={column.id} title={column.title} />
          ))}
        </tr>
      </tbody>
    </table>
  );

  const renderRowData = () => (
    <table className={styles.Table}>
      <tbody>
        {props.rows.map((row, index) => (
          <FinanceTableData
            key={index}
            rowInfo={row}
          />
        ))}
      </tbody>
    </table>
  );

  return (
    <Fragment>
      {renderTableTitles()}
      {renderColumnHeadings()}
      {renderRowData()}
    </Fragment>
  );
};

export default FinanceTable;
