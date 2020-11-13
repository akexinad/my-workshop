import React, { FC, useState } from "react";

interface EditableCellProps {
  value: number;
}

const EditableCell: FC<EditableCellProps> = ({ value }) => {
  const [codeBlockValue, setCodeBlockValue] = useState(value);

  return (
    <input
      value={codeBlockValue}
      onChange={(e) => setCodeBlockValue(+e.target.value)}
    />
  );
};

export default EditableCell;
