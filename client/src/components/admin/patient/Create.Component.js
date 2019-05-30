import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeRelation = this.onChangeRelation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
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
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  onChangeUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }
  onChangeSex(e) {
    this.setState({
      sex: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  onChangeRelation(e) {
    this.setState({
      relation: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.password,
      age: parseInt(this.state.age),
      sex: this.state.sex,
      address: this.state.address,
      eName: this.state.name,
      ePhone: this.state.phone,
      relation: this.state.relation
    };

    axios
      .post("http://localhost:3001/api/patients", obj, { headers: { "Content-Type": "application/json" }})
      .then(res => console.log(res.data))
      .then(() => {
        this.setState({
          firstName: "",
          lastName: "",
          userName: "",
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
      })
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Add New patient</h3>
        <form onSubmit={this.onSubmit}>
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
            <label>Last Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>User Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.userName}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
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
          <div>
            <h3>Emergency Contact:</h3>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group">
            <label>Relation: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.relation}
              onChange={this.onChangeRelation}
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
  }
}

export default Create;
