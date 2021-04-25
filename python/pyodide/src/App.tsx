import React, { useEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./App.css";

require("codemirror/mode/python/python");

/**
 * https://pyodide.org/en/stable/usage/quickstart.html
 * https://github.com/pyodide/pyodide/issues/552
 */

function App() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState<PyodideResult>("");
  const [isLoading, setIsLoading] = useState(true);

  const loadPyodide = async () => {
    await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/",
    });
    // Pyodide is now ready to use...
    window.pyodide.runPython(`
        import sys
        from traceback import format_exception
        
        sys.version

        def reformat_exception():
          from traceback import format_exception
          # Format a modified exception here
          # this just prints it normally but you could for instance filter some frames
          return "".join(
              format_exception(sys.last_type, sys.last_value, sys.last_traceback)
          )
    `);

    setIsLoading(false);
  };

  useEffect(() => {
    loadPyodide();
  }, []);

  const runScript = (code: string) => {
    const pyodide = window.pyodide;
    

    try {
      const result = pyodide.runPython(code);

      console.log(`typeof result`, typeof result);

      // if (typeof result === "object") {
      //   console.error("Result is possibly proxy. See: ", result);
      //   return;
      // }

      setOutput(result);
    } catch (error) {
      const reformat_exception = pyodide.globals.get("reformat_exception");
      console.error(`There was error running script`, error);
      //@ts-ignore
      error.message = reformat_exception()
      console.log(`error.message`, error.message)
      console.log(`error.message`, error.message.split(" "))

      const errorStart = error.message.split(" ").find((str: string) => str.includes(""))

      // throw error;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pyodide</h1>
        <div
          onKeyPress={({ ctrlKey, key }) => {
            return ctrlKey && key === "Enter" ? runScript(value) : null;
          }}
        >
          {isLoading ? <h2>Loading...</h2> : null}
          <CodeMirror
            className="ide"
            value={value}
            options={{
              mode: "python",
              theme: "material",
              lineNumbers: true,
            }}
            onChange={(editor, data, val) => {
              // console.log(`data`, data);
              setValue(val);
            }}
          />
        </div>
        <div>
          <h2>Result</h2>
          <h3>{output}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
