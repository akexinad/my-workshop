import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Func } from "./Func";

class App extends React.Component {
  state = {
    data: [
      {
        name: "foo",
        age: 21,
        male: true
      },
      {
        name: "bar",
        age: 78,
        male: true
      },
      {
        name: "baz",
        age: 89,
        male: false
      }
    ]
  };

  _changeName = () => {
    console.log("clicked App.tsx");
    
    
    const copy = [ ...this.state.data ];

    copy[0].name = "Feng";

    // this.state.data[0].name = "Feng";
    
    this.setState({
      data: copy
    });
  };

  renderData = () => (
    <ul>
      {this.state.data.map((item, index) => (
        <li key={index}>
          {item.name}: {item.age}: {item.male}
        </li>
      ))}
    </ul>
  );

  render() {
    console.log(this.state);

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
          {this.renderData()}
          <h2>Hello</h2>
          <Func data={this.state.data} clicked={this._changeName} />
        </header>
      </div>
    );
  }
}

export default App;
