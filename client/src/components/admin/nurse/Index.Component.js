import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";
import "bootstrap/dist/css/bootstrap.min.css";

class Index extends Component {
  state = {
    nurses: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/nurses")
      .then(response => {
        console.log(response.data);
        this.setState({ nurses: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteNurse = id => {
    axios
      .delete("http://localhost:3001/api/nurses/" + id)
      .then(res => {
        console.log(res.data);
      })
      .then(() => {
        const nurses = this.state.nurses.filter(nurse => nurse._id !== id);
        this.setState({ nurses });
      })
      .catch(err => console.log(err));
  };

  tabRow() {
    return this.state.nurses.map((object, i) => {
      return <TableRow obj={object} key={i} onDelete={this.deleteNurse} />;
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
            <h2 align="center">Admin Nurse Index</h2>
            <Link to={`/admin/${sessionStorage.getItem("user")}`}>
              <button className="btn btn-primary">Back To Home</button>
            </Link>
            <h3 align="center">Nurse List</h3>
            <Link to={"/admin/nurses/add"}>
              <h3 align="center">Add</h3>
            </Link>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
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
