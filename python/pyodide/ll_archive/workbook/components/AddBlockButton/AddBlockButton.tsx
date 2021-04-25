import React, { FC } from "react";
import AddIcon from '@material-ui/icons/Add';
import classes from "./AddBockButton.module.scss";

interface AddBlockButtonProps {
    clicked: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddBlockButton: FC<AddBlockButtonProps> = (props) => {
  return (
    <button className={classes.addBlockButton} onClick={props.clicked}>
      <AddIcon />
    </button>
  );
};

export default AddBlockButton;
