import React, { Component } from "react";
class Login extends Component {
  state = {};
  render() {
    return (
      <div className="login-box">
        <h2>Login Form</h2>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <div className="button-box">
          <button>Login</button>
          <input type="checkbox" />
          <label>Remember Me</label>
        </div>
        <hr />
        <p>New to Site? Create Account</p>
        <h2>Clinic Management System</h2>
      </div>
    );
  }
}

export default Login;
