import "./ide.css";

import React, { Fragment as div, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "../../../node_modules/codemirror/lib/codemirror.css";
import "../../../node_modules/codemirror/theme/material.css";

require("codemirror/mode/python/python");
require("codemirror/keymap/sublime");

const Ide = () => {
  const [script, setScript] = useState<string>("")

  const _handleClick = () => {
    console.log('script', script)
  }

  return (
    <div className="pythonEditor">
      <h2>IDE</h2>
      <CodeMirror
        value={script}
        options={{
          mode: "python",
          indentUnit: 4,
          theme: "material",
          lineNumbers: "true",
          keyMap: "sublime"
        }}
        onBeforeChange={(editor, data, value) => {
          console.log("editor", editor);
          console.log("data", data);
          console.log("value", value);

          setScript(value);
        }}
      />

      <button onClick={_handleClick}>EXECUTE</button>
    </div>
  );
};

export default Ide;
