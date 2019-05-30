import React, { Component } from "react";
import "./App.css";
import Login from "./components/login/Login";

class App extends Component {
  state = {
    userType: ""
  };

  render() {
    return (
      <div className="App">
        <Login type={this.state.userType} />
      </div>
    );
  }
}

export default App;
