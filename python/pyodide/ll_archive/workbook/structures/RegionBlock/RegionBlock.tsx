import CollapseButton from "pages/workbook/components/CollapseButton/CollapseButton";
import DeleteButton from "pages/workbook/components/DeleteButton/DeleteButton";
import React, { FC, useEffect, useState } from "react";
import { Checkbox } from "styling/components/Checkbox/Checkbox";
import { BlockImpl, RB } from "../../types";
import "./RegionBlock.scss";

require("codemirror/mode/python/python");
require("codemirror/keymap/sublime");

interface RegionBlockProps {
  block: RB;
  blocks: { current: BlockImpl[] };
  save: (run: boolean, b: BlockImpl) => void;
  delete: () => void;
  collapse: boolean;
}

const RegionBlock: FC<RegionBlockProps> = (props) => {
  const { collapse } = props;
  const [collapsed, setCollapsed] = useState(collapse);
  const [name, setName] = useState(props.block.name);
  const [hasHeader, setHasHeader] = useState(props.block.hasHeader);
  const [hasFooter, setHasFooter] = useState(props.block.hasFooter);
  const [description, setDescription] = useState(props.block.description);
  const [frozenColumns, setFrozenColumns] = useState(props.block.frozenColumns);

  const [editingCollapsed, setEditingCollapsed] = useState(false);

  const extraClasses = collapsed ? "no-padding" : "";

  useEffect(() => {
    setCollapsed(!collapse);
  }, [collapse]);

  return (
    <div className={`RegionBlock ${extraClasses}`}>
      <div className={`RegionBlock-left ${extraClasses}`}>
        <DeleteButton delete={props.delete} />
        <CollapseButton
          clicked={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <br />
        <span className="holder">
          {!collapsed && <label htmlFor="seriesName">Name: </label>}
          <input
            className="nameEditor"
            name="seriesName"
            type="text"
            value={name}
            onChange={(evt) => {
              const lower = evt.target.value.toLowerCase();
              const toSet = lower.replace(/[\s,$#@!`~-]/g, "");
              setName(toSet);
            }}
            onBlur={(evt) => {
              props.save(false, {
                ...props.block,
                name: evt.target.value
              });
            }}
          />
        </span>
        {!collapsed && (
          <span className="holder">
            <label htmlFor="seriesName">Description: </label>
            <input
              className="nameEditor"
              name="seriesDescription"
              type="text"
              value={description}
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
              onBlur={(evt) => {
                props.save(false, {
                  ...props.block,
                  description: evt.target.value
                });
              }}
            />
          </span>
        )}
        {!collapsed && (
          <span className="holder">
            <label htmlFor="seriesName">Frozen Columns: </label>
            <input
              className="nameEditor"
              name="seriesFrozenColumns"
              type="text"
              value={frozenColumns}
              onChange={(evt) => {
                console.log(evt.target.value.match(/((-)?[0-9]+)/g));

                const toSet = Number(
                  evt.target.value.match(/((-)?[0-9]+)/g) || ""
                );
                setFrozenColumns(toSet);
              }}
              onBlur={(evt) => {
                const toSet = Number(
                  evt.target.value.match(/((-)?[0-9]+)/g) || ""
                );

                props.save(false, {
                  ...props.block,
                  frozenColumns: toSet
                });
              }}
            />
          </span>
        )}
        {!collapsed && (
          <span className="holder">
            <br />
            <label htmlFor="seriesName">Has Header: </label>
            <Checkbox
              checked={hasHeader}
              onChange={(evt) => {
                props.save(false, {
                  ...props.block,
                  hasHeader: !hasHeader
                });

                setHasHeader(!hasHeader);
              }}
            />
          </span>
        )}
        {!collapsed && (
          <span className="holder">
            <br />
            <label htmlFor="seriesName">Has Footer: </label>
            <Checkbox
              checked={hasFooter}
              onChange={(evt) => {
                props.save(false, {
                  ...props.block,
                  hasFooter: !hasFooter
                });

                setHasFooter(!hasFooter);
              }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default RegionBlock;
