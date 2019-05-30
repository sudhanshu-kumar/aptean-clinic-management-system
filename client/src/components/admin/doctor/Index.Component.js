import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";
import "bootstrap/dist/css/bootstrap.min.css";

class Index extends Component {
  state = {
    doctors: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/doctors")
      .then(response => {
        console.log(response.data);
        this.setState({ doctors: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.doctors.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    if (
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("type") === "admin"
    )
      return (
        <div>
          <div className="container">
            <h2>Admin Doctor Index</h2>
            <Link to={`/admin/${sessionStorage.getItem("user")}`}>
              <button className="btn btn-primary">Back To Home</button>
            </Link>
            <h3 align="center">Doctor List</h3>
            <Link to={"/admin/doctors/add"}>
              <h3 align="center">Add</h3>
            </Link>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Speciality</th>
                  <th>Fee</th>
                  <th>Availability Times</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{this.tabRow()}</tbody>
            </table>
          </div>
        </div>
      );
    else return <Redirect to="/" />;
  }
}

export default Index;
