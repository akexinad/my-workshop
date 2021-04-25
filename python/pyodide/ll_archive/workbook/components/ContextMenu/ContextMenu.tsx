import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import classes from "./ContextMenu.module.scss";

const ContextMenu = (
  x: number,
  y: number,
  children: Array<{
    name: string;
    onClick: (evt: MouseEvent<HTMLDivElement>) => void;
  }>
) => {
  const elem = document.getElementById("contextMenu");

  const deleteMenu = () => {
    if (elem) ReactDOM.unmountComponentAtNode(elem);

    document.removeEventListener("click", deleteMenu);
  };

  document.addEventListener("click", deleteMenu);

  if (elem) {
    return ReactDOM.render(
      <div className={classes.contextMenu} style={{ top: y, left: x }}>
        {children.map((child, index) => (
          <div key={index} className={classes.item} onClick={child.onClick}>
            {child.name}
          </div>
        ))}
      </div>,
      elem
    );
  } else {
    return null;
  }
};

export default ContextMenu;
