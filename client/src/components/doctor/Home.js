import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class Home extends Component {
  state = {
    user: null
  };
  handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("type");
    this.setState({ user: null });
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:3001/api/doctors/${sessionStorage.getItem("user")}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
      });
  }

  render() {
    if (
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("type") === "doctor"
    )
      return (
        <div>
          <h2>Doctor Home</h2>
          <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </div>
      );
    else return <Redirect to="/" />;
  }
}

export default Home;
