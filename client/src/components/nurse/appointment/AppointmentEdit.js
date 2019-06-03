import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export class Edit extends Component {
  state = {
    aptDate: "",
    doctor: "",
    patient: "",
    type: "",
    status: "",
    createdBy: ""
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/api/appointments/" + this.props.match.params.id
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          aptDate: response.data.aptDate.substring(0, 10),
          doctor: response.data.doctor.userName,
          patient: response.data.patient.userName,
          type: response.data.type,
          status: response.data.status,
          createdBy: response.data.createdBy.userName
        });
      });
  }

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
      .put(
        "http://localhost:3001/api/appointments/" + this.props.match.params.id,
        obj
      )
      .then(res => {
        console.log(res.data);
        window.alert("Successfully Updated");
      })
      .catch(err => console.log(err));
    //this.props.history.push("/nurse/appointments");
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Edit Appointment</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Appointment Date: </label>
            <input
              type="text"
              className="form-control"
              placeholder="yyyy-mm-dd"
              name="aptDate"
              value={this.state.aptDate}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Doctor: </label>
            <input
              type="text"
              className="form-control"
              name="doctor"
              value={this.state.doctor}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Patient: </label>
            <input
              type="text"
              className="form-control"
              name="patient"
              value={this.state.patient}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Type: </label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={this.state.type}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <input
              type="text"
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Created By: </label>
            <input
              type="text"
              className="form-control"
              name="createdBy"
              value={this.state.createdBy}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Appointment"
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

export default Edit;
