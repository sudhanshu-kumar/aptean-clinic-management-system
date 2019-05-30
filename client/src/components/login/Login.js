import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Redirect, Link } from "react-router-dom";
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
      .post(`http://localhost:3001/api/login`, {
        userName: this.state.userName,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        sessionStorage.setItem("user", res.data._id);
        sessionStorage.setItem("type", res.data.userType);
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log(err);
        window.alert("invalid credentials...");
      });
  };
  render() {
    console.log(sessionStorage.getItem("user"));
    if (!this.state.user && sessionStorage.getItem("user") == null) {
      return (
        <div className="login-box">
          <h2>Login Form</h2>
          <div className="input-box">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              onChange={this.handleUserName}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              onChange={this.handlePassword}
            />
          </div>
          <div className="button-box">
            <button className="btn btn-primary" onClick={this.handleLogin}>
              Login
            </button>
          </div>
          <hr />
          <Link to="/signUp">
            <p>New to Site? Create Account</p>
          </Link>
          <h2>Clinic Management System</h2>
        </div>
      );
    } else if (this.state.user || sessionStorage.getItem("user") !== null) {
      return (
        <Redirect
          to={`/${sessionStorage.getItem("type")}/${sessionStorage.getItem(
            "user"
          )}`}
        />
      );
    }
  }
}

export default Login;
