import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";

class Create extends Component {
  state = {
    name: "",
    userName: "",
    password: "",
    email: "",
    phone: ""
  };

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const obj = {
      name: this.state.name,
      userName: this.state.userName,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone
    };

    axios
      .post("http://localhost:3001/api/nurses", obj)
      .then(res => console.log(res.data))
      .then(() => {
        this.setState({
          name: "",
          userName: "",
          password: "",
          email: "",
          phone: ""
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
          <h3 align="center">Add New Nurse</h3>
          <form onSubmit={this.onSubmit}>
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
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                name="email"
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
              <input
                type="submit"
                value="Register Nurse"
                className="btn btn-primary"
              />
            </div>
            <Link to={"/admin/nurses"}>
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
