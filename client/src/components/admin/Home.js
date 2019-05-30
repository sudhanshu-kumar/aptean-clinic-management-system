import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Admin.css";
import axios from "axios";

class AdminHome extends Component {
  state = {
    user: null
  };
  handleLogOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("type");
    this.setState({ user: null });
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3001/api/admins/${sessionStorage.getItem("user")}`)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
      });
  }
  render() {
    console.log(this.props);
    if (sessionStorage.getItem("user") && sessionStorage.getItem("type") === "admin") {
      return (
        <div>
          <div className="admin-head">
            <h2>Admin Home</h2>
            <button className="btn btn-danger" onClick={this.handleLogOut}>
              LogOut
            </button>
          </div>
          <Link to="/admin/patients">
            <button className="btn btn-primary">Manage Paients</button>
          </Link>
          <Link to="/admin/doctors">
            <button className="btn btn-primary">Manage Doctors</button>
          </Link>
          <Link to="/admin/nurses">
            <button className="btn btn-primary">Manage Nurses</button>
          </Link>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default AdminHome;
