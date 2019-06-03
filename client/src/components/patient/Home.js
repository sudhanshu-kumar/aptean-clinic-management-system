import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Profile from "./Profile";
import Appointment from "./Appointment";

class Home extends Component {
  state = {
    user: null,
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
      .then(() => {
        axios
          .get(
            `http://localhost:3001/api/appointments/patient/${sessionStorage.getItem(
              "user"
            )}`
          )
          .then(res => {
            console.log(res)  
            this.setState({ appointment: res.data })})
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    if (
      this.state.user !== null &&
      this.state.appointment !== null &&
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("type") === "patient"
    )
      return (
        <BrowserRouter>
          <div>
            <Header handleLogout={this.handleLogout} />
            <Switch>
              <Route
                path="/patient/profile"
                render={props => <Profile {...props} user={this.state.user} />}
                exact
              />
              <Route
                path="/patient/appointment"
                render={props => (
                  <Appointment {...props} appointment={this.state.appointment} />
                )}
                exact
              />
            </Switch>
          </div>
        </BrowserRouter>
      );
    else return <h2>Loading...</h2>;
    //else return <Redirect to="/" />;
  }
}

export default Home;
