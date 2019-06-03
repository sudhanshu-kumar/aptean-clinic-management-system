import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export class Add extends Component {
  state = {
    aptDate: "",
    doctor: "",
    patient: "",
    type: "",
    status: "",
    createdBy: ""
  };

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const obj = {
      aptDate: this.state.aptDate,
      doctor: this.state.doctor,
      patient: this.state.patient,
      type: this.state.type,
      status: this.state.status,
      createdBy: this.state.createdBy
    };

    axios
      .post("http://localhost:3001/api/appointments/", obj)
      .then(res => {
        console.log(res.data);
        window.alert("Successfully Added");
      })
      .then(() => {
        this.setState({
          aptDate: "",
          doctor: "",
          patient: "",
          type: "",
          status: "",
          createdBy: ""
        });
      })
      .catch(err => console.log(err));
    //this.props.history.push("/nurse/appointments");
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Add Appointment</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Appointment Date: </label>
            <input
              type="text"
              className="form-control"
              placeholder="YYYY-MM-DD"
              name="aptDate"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Doctor: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Doctor's Username"
              name="doctor"
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
            <label>Type: </label>
            <input
              type="text"
              className="form-control"
              name="type"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <input
              type="text"
              className="form-control"
              name="status"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Created By: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nurse's Username"
              name="createdBy"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Appointment"
              className="btn btn-primary"
            />
          </div>
          <Link to={"/nurse/appointments"}>
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
