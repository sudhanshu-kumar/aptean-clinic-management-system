import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "./AppointmentRow";
import "../Nurse.css";

class Index extends Component {
  state = {
    appointments: null
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3001/api/appointments`)
      .then(res => {
        console.log(res);
        this.setState({ appointments: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.appointments !== null) {
      return (
        <div className="apt-box">
          <div className="title-box">
            <h2>Appointment List</h2>
            <Link to="/nurse/appointments/add"><button className="btn btn-primary">Add</button></Link>
          </div>
          <table className="table table-striped" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>Appointment Date</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created By</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.appointments.map(function(obj, i) {
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
