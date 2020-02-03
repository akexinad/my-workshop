import React, {Component} from 'react';

import FinancePage from '../components/FinancePage/FinancePage';


import './App.css';

class App extends Component {  
  render() {
    return (
      <div className="App">
        <h1>LL Finance</h1>
        <FinancePage />
      </div>
    );
  }
}

export default App;
