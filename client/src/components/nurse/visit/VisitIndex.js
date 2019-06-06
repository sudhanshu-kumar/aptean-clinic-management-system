import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "./VisitRow";
import "../Nurse.css";

class Index extends Component {
  state = {
    visits: null
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3001/api/visits`)
      .then(res => {
        console.log(res);
        this.setState({ visits: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.visits !== null) {
      return (
        <div className="apt-box">
          <div className="title-box">
            <h2>Visiting List</h2>
            <Link to="/nurse/visits/add"><button className="btn btn-primary">Add</button></Link>
          </div>
          <table className="table table-striped" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>Appointment</th>
                <th>Patient</th>
                <th>Diagnosed By</th>
                <th>Nursed By</th>
                <th>Date</th>
                <th>Time</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.visits.map(function(obj, i) {
                return <TableRow obj={obj} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

export default Index;
