import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";
export class Create extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    age: "",
    sex: "",
    address: "",
    name: "",
    phone: "",
    relation: ""
  };

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const obj = {
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

    axios
      .post("http://localhost:3001/api/patients", obj)
      .then(res => console.log(res.data))
      .then(() => {
        this.setState({
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          age: "",
          sex: "",
          address: "",
          eName: "",
          ePhone: "",
          relation: ""
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  render() {
    if (sessionStorage.getItem("type") === "admin") {
      return (
        <div style={{ marginTop: 10 }}>
          <h3 align="center">Add New patient</h3>
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
              <label>Age: </label>
              <input
                type="text"
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
              <h3>Emergency Contact:</h3>
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
                type="text"
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
              <input
                type="submit"
                value="Register Patient"
                className="btn btn-primary"
              />
            </div>
            <Link to={"/admin/patients"}>
              {" "}
              <div className="form-group">
                <input
                  type="submit"
                  value="Back to Index"
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

export default Create;
