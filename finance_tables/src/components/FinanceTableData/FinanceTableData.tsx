import React, { FC, useState, ChangeEvent } from "react";
import { TableRow } from "../../utils/interfaces";

interface FinanceTableDataProps {
  rowInfo: TableRow;
}

const FinanceTableData: FC<FinanceTableDataProps> = ({ rowInfo }) => {
  const [inputValue, setInputValue] = useState<number | null>(null);

  const foo = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    
    setInputValue(+e.target.value);
  };

  return (
    <tr>
      <td>{rowInfo.name}</td>

      <td>
        {/* {props.input} */}
        {/* <input type="number" onChange={_changeUnitPrice} value={unitInput} /> */}
        <input type="number" onChange={foo} />
      </td>

      <td>{rowInfo.quantity}</td>

      <td>{inputValue ? inputValue* rowInfo.quantity : 0}</td>
    </tr>
  );
};

export default FinanceTableData;
