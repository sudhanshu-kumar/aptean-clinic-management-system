import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";
export class Edit extends Component {
  state = {
    name: "",
    userName: "",
    email: "",
    phone: ""
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/api/nurses/" + this.props.match.params.nurseId
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          name: response.data.name,
          userName: response.data.userName,
          email: response.data.email,
          phone: response.data.phone
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
      phone: this.state.phone
    };

    axios
      .put(
        "http://localhost:3001/api/nurses/" + this.props.match.params.nurseId,
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
              <input
                type="submit"
                value="Update Nurse"
                className="btn btn-primary"
              />
            </div>
            <Link to={"/admin/nurses"}>
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
