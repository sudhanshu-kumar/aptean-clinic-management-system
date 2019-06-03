import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";
export class Edit extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    age: "",
    address: "",
    name: "",
    phone: "",
    relation: ""
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/api/patients/" +
          this.props.match.params.patientId
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          userName: response.data.userName,
          age: response.data.age,
          address: response.data.address,
          name: response.data.eName,
          phone: response.data.ePhone,
          relation: response.data.relation
        });
      });
  }

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      age: this.state.age,
      address: this.state.address,
      eName: this.state.name,
      ePhone: this.state.phone,
      relation: this.state.relation
    };

    axios
      .put(
        "http://localhost:3001/api/patients/" + this.props.match.params.patientId,
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
          <h3 align="center">Edit Nurse</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>First Name: </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Last Name: </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={this.state.lastName}
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
              <label>Age: </label>
              <input
                type="text"
                className="form-control"
                name="age"
                value={this.state.age}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Address: </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={this.state.address}
                onChange={this.onChangeInput}
              />
            </div>
            <div>
              <h3>Emergency Contact:</h3>
            </div>
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
              <label>Realation: </label>
              <input
                type="text"
                className="form-control"
                name="relation"
                value={this.state.relation}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update Patient"
                className="btn btn-primary"
              />
            </div>
            <Link to={"/admin/patients"}>
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
