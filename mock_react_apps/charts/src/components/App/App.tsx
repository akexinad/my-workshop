import React, { FC } from 'react';
import logo from '../../logo.svg';
import './App.css';
import TreemapChart from '../TreemapChart/TreemapChart';
import data from '../../data';

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TreemapChart data={data} colors={COLORS} />
      </header>
    </div>
  );
}

export default App;
