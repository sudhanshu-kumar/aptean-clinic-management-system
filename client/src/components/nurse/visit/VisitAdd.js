import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export class Add extends Component {
  state = {
    appointment: "",
    patient: "",
    diagnosedBy: "",
    nursedBy: ""
  };

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    let obj = {
      diagnosedBy: this.state.diagnosedBy,
      nursedBy: this.state.nursedBy
    };
    if (this.state.appointment) {
      obj.appointment = this.state.appointment;
    } else if (this.state.patient) {
      obj.patient = this.state.patient;
    }

    axios
      .post("http://localhost:3001/api/visits/", obj)
      .then(res => {
        console.log(res.data);
        window.alert("Successfully Added");
      })
      .then(() => {
        this.setState({
          appointment: "",
          patient: "",
          diagnosedBy: "",
          nursedBy: ""
        });
      })
      .catch(err => console.log(err));
    //this.props.history.push("/nurse/appointments");
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Add Visit</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Appointment: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient's username"
              name="appointment"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Patient: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient's Username"
              name="patient"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Diagnosed By: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Doctor's Username"
              name="doctor"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Nursed By: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nurse's Username"
              name="nursedBy"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Visit"
              className="btn btn-primary"
            />
          </div>
          <Link to={"/nurse/visits"}>
            {" "}
            <div className="form-group">
              <input
                type="submit"
                value="Back to List"
                className="btn btn-primary"
              />
            </div>
          </Link>
        </form>
      </div>
    );
  }
}

export default Add;
