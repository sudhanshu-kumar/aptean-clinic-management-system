import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
//import TableRow from "./TableRow";
import "bootstrap/dist/css/bootstrap.min.css";

class Index extends Component {
  state = {
    patients: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/patients")
      .then(response => {
        console.log(response.data);
        this.setState({ patients: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deletePatient = event => {
    axios
      .delete("http://localhost:3001/api/patients/" + event.target.id)
      .then(res => {
        console.log(res.data);
      })
      .then(() => {
        axios
          .get("http://localhost:3001/api/patients")
          .then(response => {
            console.log(response.data);
            this.setState({ patients: response.data });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(err => console.log(err));
  };

  // tabRow = () => {
  //   return this.state.patients.map(function(object, i) {
  //     return <TableRow obj={object} key={i} />;
  //   });
  // };

  render() {
    if (
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("type") === "admin"
    )
      return (
        <div>
          <div className="container">
            <h2>Admin Patient Index</h2>
            <Link to={`/admin/${sessionStorage.getItem("user")}`}>
              <button className="btn btn-primary">Back To Home</button>
            </Link>
            <h3 align="center">Patient List</h3>
            <Link to={"/admin/patients/add"}>
              <h3 align="center">Add</h3>
            </Link>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Address</th>
                  <th>E Name</th>
                  <th>E Phone</th>
                  <th>Relation</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.patients.map(function(object, i) {
                  return (
                    <div>
                      <tr key={i}>
                        <td>{object.firstName}</td>
                        <td>{object.lastName}</td>
                        <td>{object.userName}</td>
                        <td>{object.age}</td>
                        <td>{object.sex}</td>
                        <td>{object.address}</td>
                        <td>{object.eName}</td>
                        <td>{object.ePhone}</td>
                        <td>{object.relation}</td>
                        <td>
                          <Link
                            to={"/admin/patients/edit/" + object._id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            id={object._id}
                            onClick={this.deletePatient}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </div>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    else return <Redirect to="/" />;
  }
}

export default Index;
