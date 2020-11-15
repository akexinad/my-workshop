import React, { FC, useState } from "react";

import classes from "./EditableCell.module.scss"

interface EditableCellProps {
  value: number;
}

const EditableCell: FC<EditableCellProps> = ({ value }) => {
  const [codeBlockValue, setCodeBlockValue] = useState(value);

  return (
    <input className={classes.cell}
      value={codeBlockValue}
      onChange={(e) => setCodeBlockValue(+e.target.value)}
    />
  );
};

export default EditableCell;
