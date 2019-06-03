import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class Home extends Component {
  state = {
    appointment: null
  };
  handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("type");
    this.props.history.push("/");
    //this.setState({ user: null });
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:3001/api/patients/${sessionStorage.getItem("user")}`
      )
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    if (
      this.state.user !== null &&
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("type") === "patient"
    )
      return (
        <div>
          <h2>Patient Home</h2>
          <Link to="/patient/appointment" >
              <button className="btn btn-primary">Appointment</button>
          </Link>
          <button className="btn btn-danger" onClick={this.handleLogout}>
            Logout
          </button>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <tbody>
              <tr>
                <th>Token Id</th>
                <td>{this.state.user.tokenId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  {this.state.user.firstName} {this.state.user.lastName}
                </td>
              </tr>
              <tr>
                <th>User Name</th>
                <td>{this.state.user.userName}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{this.state.user.age}</td>
              </tr>
              <tr>
                <th>Sex</th>
                <td>{this.state.user.sex}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{this.state.user.address}</td>
              </tr>
              <tr>
                <th colSpan="2">Emergency Contact</th>
              </tr>
              <tr>
                <th>Name</th>
                <td>{this.state.user.eName}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{this.state.user.ePhone}</td>
              </tr>
              <tr>
                <th>Relation</th>
                <td>{this.state.user.relation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    else return <h2>Loading...</h2>;
    //else return <Redirect to="/" />;
  }
}

export default Home;
