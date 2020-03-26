import "./ide.css";

import React, { Fragment as div, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "../../../node_modules/codemirror/lib/codemirror.css";
import "../../../node_modules/codemirror/theme/material.css";

require("codemirror/mode/python/python");
require("codemirror/keymap/sublime");

const Ide = () => {
  const [code, setCode] = useState<string>("");

  return (
    <div className="pythonEditor">
      <h2>IDE</h2>
      <CodeMirror
        value={code}
        options={{
          mode: "python",
          theme: "material",
          lineNumbers: "true",
          keyMap: "sublime"
        }}
        onBeforeChange={(editor, data, value) => {
          console.log("editor", editor);
          console.log("data", data);
          console.log("value", value);

          setCode(value);
        }}
      />
    </div>
  );
};

export default Ide;
