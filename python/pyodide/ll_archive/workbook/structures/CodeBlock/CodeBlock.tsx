import CollapseButton from "pages/workbook/components/CollapseButton/CollapseButton";
import DeleteButton from "pages/workbook/components/DeleteButton/DeleteButton";
import React, { FC, useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "react-datasheet/lib/react-datasheet.css";
import "../../../../../node_modules/codemirror/lib/codemirror.css";
import "../../../../../node_modules/codemirror/theme/duotone-light.css";
import "../../../../../node_modules/codemirror/theme/material.css";
import CodeOutput from "../../components/CodeOutput/CodeOutput";
import { BlockImpl, CB } from "../../types";
import "./CodeBlock.scss";

require("codemirror/mode/python/python");
require("codemirror/keymap/sublime");

interface CodeBlockProps {
  block: CB;
  save: (oldName: string, name: string, run: boolean, b: BlockImpl, setName?: boolean) => void;
  delete: (name: string) => void;
  collapse: boolean;
}

const MemoCodeOutput = React.memo(CodeOutput)

const CodeBlock: FC<CodeBlockProps> = (props) => {
  const { collapse } = props;
  const [collapsed, setCollapsed] = useState(collapse);
  const [name, setName] = useState(props.block.name);
  const [description, setDescription] = useState(props.block.description);
  const [format, setFormat] = useState(props.block.format);
  const [code, setCode] = useState(props.block.code);
  const [editingCollapsed, setEditingCollapsed] = useState(false);

  let values = props.block.values;

  const extraClasses = collapsed ? "no-padding" : "";

  useEffect(() => {
    setCollapsed(!collapse);
  }, [collapse]);

  return (
    <div className={`codeblock ${extraClasses}`}>
      <div className={`codeblock-left ${extraClasses}`}>
        <CollapseButton
          clicked={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <br />
        <span className="holder">
          {collapsed && <label>{description}</label>}
          {!collapsed && (
            <>
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
                  props.save(
                    props.block.name,
                    props.block.name,
                    false,
                    {
                      ...props.block,
                      description: evt.target.value
                    },
                    true
                  );
                }}
              />
            </>
          )}
        </span>
        {!collapsed && (
          <span className="holder">
            <label htmlFor="seriesName">Name: </label>
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
                props.save(props.block.name, props.block.name, false, {
                  ...props.block,
                  name: evt.target.value
                });
              }}
            />
          </span>
        )}
        {!collapsed && (
          <>
            <span className="holder">
              <label htmlFor="format">Format: </label>
              <select
                name="format"
                value={format}
                onChange={(evt) => {
                  const v = evt.target.value;
                  let val: "none" | "dollars" | "percent" = "none";

                  switch (v) {
                    case "none":
                      setFormat("none");
                      val = "none";
                      break;
                    case "percent":
                      setFormat("percent");
                      val = "percent";
                      break;
                    case "dollars":
                      setFormat("dollars");
                      val = "dollars";
                      break;
                  }

                  props.save(props.block.name, props.block.name, false, {
                    ...props.block,
                    format: val
                  });
                }}
              >
                <option value="none">none</option>
                <option value="dollars">$0.00</option>
                <option value="percent">0%</option>
              </select>
            </span>
          </>
        )}
      </div>
      <div className="codeblock-right">
        {!collapsed && (
          <CodeMirror
            value={code}
            options={{
              mode: "python",
              theme: "duotone-light",
              lineNumbers: false,
              keyMap: "sublime"
            }}
            onBlur={(editor) => {
              props.save(props.block.name, props.block.name, true, {
                ...props.block,
                code: editor.getValue()
              });
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
              // props.save(false, { type: "CODE", ...props.block, code: value });
            }}
          />
        )}
        {!editingCollapsed ? (
          <>
            <MemoCodeOutput
              values={values}
              format={format}
            />
          </>
        ) : (
          <CodeMirror
            value={code}
            className={"mini-editor"}
            options={{
              mode: "python",
              // theme: 'duotone-light',
              lineNumbers: false,
              keyMap: "sublime",
              autofocus: true
            }}
            scroll={{}}
            onBlur={(editor) => {
              setEditingCollapsed(false);
              props.save(props.block.name, props.block.name, true, {
                ...props.block,
                code: editor.getValue()
              });
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
              props.save(props.block.name, props.block.name, false, { ...props.block, code: value });
            }}
          />
        )}
      </div>
      <div className={`codeblock-delete ${extraClasses}`}>
        <DeleteButton delete={() => props.delete(props.block.name)} />
      </div>
    </div>
  );
};

export default CodeBlock;
