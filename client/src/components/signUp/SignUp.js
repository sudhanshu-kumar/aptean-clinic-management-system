import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    cnfPassword: "",
    age: "",
    sex: "",
    address: "",
    name: "",
    phone: "",
    relation: ""
  };

  onChangeInput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.password !== this.state.cnfPassword) {
      window.alert("password not matched");
    } else {
      const patient = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password: this.state.password,
        age: this.state.age,
        sex: this.state.sex,
        address: this.state.address,
        eName: this.state.name,
        ePhone: this.state.phone,
        relation: this.state.relation
      };
      //fetch(`http://localhost:3001/api/patients`, { method: "post", body: JSON.stringify(patient) })
      axios
        .post("http://localhost:3001/api/patients", patient)
        .then(res => console.log(res.data))
        .then(() => window.alert("account created"))
        .catch(err => console.log(err));
    }
  };

  render() {
    //console.log(this.state.userName);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3 align="center">Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>User Name: </label>
            <input
              type="text"
              className="form-control"
              name="userName"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              type="password"
              className="form-control"
              name="cnfPassword"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Age: </label>
            <input
              type="number"
              className="form-control"
              name="age"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Sex: </label>
            <input
              type="text"
              className="form-control"
              name="sex"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={this.onChangeInput}
            />
          </div>
          <div>
            <h4>Emergency Contact</h4>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="number"
              className="form-control"
              name="phone"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Relation: </label>
            <input
              type="text"
              className="form-control"
              name="relation"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </div>
        </form>
        <div>
          <Link to="/">
            <p>Already have account? Login Here</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
