import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";
export class Edit extends Component {
  state = {
    name: "",
    userName: "",
    email: "",
    phone: "",
    speciality: "",
    fee: "",
    availabilityTimes: ""
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/api/doctors/" + this.props.match.params.doctorId
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          name: response.data.name,
          userName: response.data.userName,
          email: response.data.email,
          phone: response.data.phone,
          speciality: response.data.speciality,
          fee: response.data.fee,
          availabilityTimes: response.data.availabilityTimes
        });
      });
  }

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const obj = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      phone: this.state.phone,
      speciality: this.state.speciality,
      fee: this.state.fee
    };

    axios
      .put(
        "http://localhost:3001/api/doctors/" + this.props.match.params.doctorId,
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
    if (sessionStorage.getItem("type") === "admin") {
      return (
        <div style={{ marginTop: 10 }}>
          <h3 align="center">Edit Doctor</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>User Name: </label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={this.state.userName}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Phone: </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={this.state.phone}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Speciality: </label>
              <input
                type="text"
                className="form-control"
                name="speciality"
                value={this.state.speciality}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Fee: </label>
              <input
                type="text"
                className="form-control"
                name="fee"
                value={this.state.fee}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Availability Times: </label>
              <input
                type="text"
                className="form-control"
                name="availabilityTimes"
                value={this.state.availabilityTimes}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update Doctor"
                className="btn btn-primary"
              />
            </div>
            <Link to={"/admin/doctors"}>
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
    } else return <Redirect to="/" />;
  }
}

export default Edit;
