import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  state = {
    userName: "",
    password: "",
    user: null
  };
  handleUserName = event => {
    this.setState({ userName: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleLogin = () => {
    axios
      .post(
        `http://localhost:3001/api/${this.props.type.toLowerCase()}s/login`,
        { userName: this.state.userName, password: this.state.password }
      )
      .then(res => {
        console.log(res);
        sessionStorage.setItem("user", res.data._id);
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log(err);
        window.alert("invalid credentials...");
      });
  };
  render() {
    console.log(this.props.type);
    if (!this.state.user) {
      return (
        <div className="login-box">
          <h2>Login Form</h2>
          <input
            type="text"
            placeholder="username"
            onChange={this.handleUserName}
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.handlePassword}
          />
          <div className="button-box">
            <button onClick={this.handleLogin}>Login</button>
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>
          <hr />
          <p>New to Site? Create Account</p>
          <h2>Clinic Management System</h2>
        </div>
      );
    } else if(this.state.user) {
      return (
        <Redirect to={`/${this.props.type}/${sessionStorage.getItem("user")}`} />
      );
    }
  }
}

export default Login;
