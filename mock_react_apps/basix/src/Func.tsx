import React, { FC, useState } from "react";

interface FuncProps {
  data: {
    name: string;
    age: number;
    male: boolean;
  }[];
  clicked: () => void;
}

export const Func: FC<FuncProps> = props => {
  const [name, setName] = useState(props.data);

  console.log(props);

  const _changeName = () => {
    // props.data[0].name = "Feng";

    const copy = { ...props.data };

    copy[0].name = "Feng";

    setName(copy);

    console.log(props);
  };

  return (
    <div>
      <h2>Func Component</h2>
      <button onClick={props.clicked}>CHANGE NAME</button>
      {/* <button onClick={_changeName}>CHANGE NAME</button> */}
    </div>
  );
};
