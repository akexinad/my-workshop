import React, { useEffect } from 'react';
import './App.css';

const App = () => {

  useEffect( () => {
    const script = document.createElement("script");

    script.src = "https://pyodide.cdn.iodide.io/pyodide.js";
    script.async = true;
    script.onload = () =>  scriptLoaded();
    
    console.log('script has loaded');
     
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scriptLoaded = () => {
    languagePluginLoader.then(() => {
      
    })
  }

  
  return (
    <div className="App">
      <h1>Py</h1>
    </div>
  );
}

export default App;
