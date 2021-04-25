import React, { FC } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import classes from "./CollapseButtons.module.scss";

interface CollapseButtonProps {
  collapsed: boolean;
  clicked: () => void;
}

const CollapseButton: FC<CollapseButtonProps> = (props) => {
  return (
    <button className={classes.collapseButton} onClick={props.clicked}>
      {props.collapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
    </button>
  );
};

export default CollapseButton;
