import React, { useMemo } from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import { GridElement } from "../../types/index";
import CellFactory from "../Cell/Cell";

class Spreadsheet extends ReactDataSheet<GridElement, number> {}

interface CodeOutputProps {
  values: (number | string | undefined)[];
  format: "none" | "dollars" | "percent";
}

const formatValue = (format: string, value: string) => {
  switch (format) {
    case "dollars":
      return `$${parseFloat(value).toFixed(2)}`;
    case "percent":
      return `${(parseFloat(value) * 100).toFixed(2)}%`;
    default:
      return value;
  }
};

function CodeOutput({ values, format }: CodeOutputProps) {
  const Cell = useMemo(() => CellFactory.bind(undefined, () => {}, false, 10, () => {}), [values]);

  let sheetData: GridElement[][] = useMemo(() => [
    values.map((v, index) => ({
      readOnly: true,
      value: { value: formatValue(format, `${v}`), format: format },
      isSeriesName: false,
      key: "a" + index
    }))
  ], [values, format]);

  return (
    <Spreadsheet
      cellRenderer={Cell}
      data={sheetData}
      valueRenderer={(cell) => cell.value.value}
    />
  );
}

export default CodeOutput;
