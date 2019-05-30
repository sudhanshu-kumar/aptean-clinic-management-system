import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class Home extends Component {
  state = {
    user: null
  };
  handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("type");
    this.props.history.push("/");
    //this.setState({ user: null });
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3001/api/nurses/${sessionStorage.getItem("user")}`)
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
      sessionStorage.getItem("type") === "nurse"
    )
      return (
        <div>
          <h2>Nurse Home</h2>
          <Link to="/nurse/appointment">
            <button className="btn btn-primary">Appointment</button>
          </Link>
          <button className="btn btn-danger" onClick={this.handleLogout}>
            Logout
          </button>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{this.state.user.name}</td>
              </tr>
              <tr>
                <th>User Name</th>
                <td>{this.state.user.userName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{this.state.user.email}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{this.state.user.phone}</td>
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
