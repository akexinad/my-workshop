declare global {
  interface Window {
    pyodide: Pyodide;
    loadPyodide: ({ indexURL: string }) => Proimse<void>;
    __pyodideLoading: boolean
  }

  interface Pyodide {
    loadPackage: (arr: []) => Promise<void>;
    runPython: (script: string) => PyodideResult;
    runPythonAsync: (script: string) => Promise<PyodideResult>
    globals: Globals
  }

  interface Globals {
    get: (value: string) => PyodideResult
    set: (key: string, value: PyodideResult) => void
  }
  
  type PyodideResult = string | number | object | CallableFunction
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {};
