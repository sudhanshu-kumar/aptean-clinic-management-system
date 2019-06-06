import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Profile from "./Profile";
import AppointmentIndex from "./appointment/AppointmentIndex";
import AppointmentAdd from "./appointment/AppointmentAdd";
import AppointmentEdit from "./appointment/AppointmentEdit";
import VisitIndex from "./visit/VisitIndex";
import VisitAdd from "./visit/VisitAdd";

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
      .get(`http://localhost:3001/api/nurse`,{ headers: { authorization: `Bearer ${sessionStorage.getItem("user")}` } })
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
        <BrowserRouter>
          <div>
            <Header handleLogout={this.handleLogout} />
            <Switch>
              <Route
                path="/nurse/profile"
                render={props => <Profile {...props} user={this.state.user} />}
                exact
              />
              <Route
                path="/nurse/appointments"
                component={AppointmentIndex}
                exact
              />
              <Route
                path="/nurse/appointments/edit/:id"
                component={AppointmentEdit}
                exact
              />
              <Route
                path="/nurse/appointments/add"
                component={AppointmentAdd}
                exact
              />
              <Route path="/nurse/visits" component={VisitIndex} exact />
              <Route path="/nurse/visits/add" component={VisitAdd} exact />
            </Switch>
          </div>
        </BrowserRouter>
      );
    else return <h2>Loading...</h2>;
    //else return <Redirect to="/" />;
  }
}

export default Home;
