import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import SignUp from "./components/signUp/SignUp";
import AdminHome from "./components/admin/Home";
import PatientIndex from "./components/admin/patient/Index.Component";
import DoctorIndex from "./components/admin/doctor/Index.Component";
import NurseIndex from "./components/admin/nurse/Index.Component";
import AddPatient from "./components/admin/patient/Create.Component";
import DoctorHome from "./components/doctor/Home";
import PatientHome from "./components/patient/Home";
import NurseHome from "./components/nurse/Home";
import * as serviceWorker from "./serviceWorker";

const Routing = () => {
  return (
    <div className="maincontainer">
      <Router>
        <div className="root2">
          <Switch>
            <Route exact path={"/"} component={App} />
            <Route exact path={"/admin/patients"} component={PatientIndex} />
            <Route exact path={"/admin/doctors"} component={DoctorIndex} />
            <Route exact path={"/admin/nurses"} component={NurseIndex} />
            <Route exact path={"/admin/patients/add"} component={AddPatient} />
            <Route exact path={"/signUp"} component={SignUp} />
            <Route exact path={"/admin/:adminId"} component={AdminHome} />
            <Route exact path={"/doctor/:doctorId"} component={DoctorHome} />
            <Route exact path={"/patient/:patientId"} component={PatientHome} />
            <Route exact path={"/nurse/:nurseId"} component={NurseHome} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

ReactDOM.render(<Routing />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
