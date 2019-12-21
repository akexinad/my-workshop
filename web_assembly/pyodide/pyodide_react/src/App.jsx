import React, { useEffect, useState } from "react";
import "./App.css";

/*global languagePluginLoader */
/*global pyodide */

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://pyodide.cdn.iodide.io/pyodide.js";
    script.async = true;
    script.onload = () => scriptLoaded();

    console.log("script has loaded");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [isPyodideReady, setPyStatus] = useState(false);

  function scriptLoaded() {
    console.log("pyodide not run yet");
    languagePluginLoader.then(() => {
      console.log("pyodide starting");
      // pyodide is now ready to use...
      console.log(pyodide.runPython("import sys\nsys.version"));
      pyodide.runPython("import sys\nsys.version");
      pyodide.loadPackage(["matplotlib", "numpy"]);
      setPyStatus(true)
    });
  }

  const execute = (code) => {
    return pyodide.runPython(code);
  } 

  return (
    <div className="App">
      <h1>Py</h1>
      <textarea
        name="code"
        value={code}
        cols="60"
        rows="20"
        onChange={e => setCode(e.target.value)}
        disabled={ !isPyodideReady }
      />
      <button
        onClick={() => setResult( execute(code) )}
        disabled={ !isPyodideReady }
      >
        RUN
      </button>
      <h3>RESULT</h3>
      <p>{ result }</p>
    </div>
  );
};

export default App;
