import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import React, { FC } from "react";
import classes from "./DeleteButton.module.scss";

interface DeleteButtonProps {
  delete: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
  return (
    <button className={classes.deleteButton} onClick={props.delete}>
      <DeleteOutlinedIcon />
    </button>
  );
};

export default DeleteButton;
