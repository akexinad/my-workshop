interface PyLanguageDefinition {
  displayName: string;
  url: string;
  scriptId: string;
}

// TODO setup local pyodide once git LFS issue resolved.
export const PYODIDE_URL = process.env.USE_LOCAL_PYODIDE
  ? "/pyodide/pyodide.js"
  : "https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js";

export const pyLanguageDefinition: PyLanguageDefinition = {
  displayName: "Python",
  url: PYODIDE_URL,
  scriptId: "pyodide"
};

export const loadDynamicScript = (
  pluginData: PyLanguageDefinition
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(pluginData.scriptId);
    if (!existingScript) {
      const script = document.createElement("script");
      const head = document.querySelector("head");
      script.src = pluginData.url;
      script.id = pluginData.scriptId;
      head?.appendChild(script);
      script.onload = (e) => {
        resolve(e);
      };
    } else {
      reject(undefined);
    }
  });
};

export default loadDynamicScript;
