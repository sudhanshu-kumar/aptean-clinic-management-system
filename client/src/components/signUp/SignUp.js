import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class SignUp extends Component {
  state = {
    lastName: "",
    firstName: "",
    age: "",
    sex: "",
    address: "",
    uniqueId: ""
  };

  onChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  onChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  };

  onChangeAge = event => {
    this.setState({ age: event.target.value });
  };

  onChangeSex = event => {
    this.setState({ sex: event.target.value });
  };

  onChangeAddress = event => {
    this.setState({ address: event.target.value });
  };

  onChangeUniqueId = event => {
    this.setState({ uniqueId: event.target.value });
  };

  render() {
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
            <label>Last Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Age: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group">
            <label>Sex: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sex}
              onChange={this.onChangeSex}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Unique Id: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.uniqueId}
              onChange={this.onChangeUniqueId}
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
