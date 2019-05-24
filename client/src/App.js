import React, { Component } from "react";
import "./App.css";
import LoginType from "./components/login/LoginType";
import Login from "./components/login/Login";

class App extends Component {
  state = {
    userType: ""
  };

  handleLoginType = (event) => {
    this.setState({userType: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <LoginType handleLoginType={this.handleLoginType} />
        <Login type={this.state.userType} />
      </div>
    );
  }
}

export default App;
