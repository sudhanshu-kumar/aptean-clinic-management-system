import React from "react";
import { NavLink } from "react-router-dom";
import "./Nurse.css";

const Header = props => {
  return (
    <div className="head-box">
      <div className="nav-box">
        <NavLink to={`/nurse/${sessionStorage.getItem("user")}`}>
          <button className="btn btn-primary">Home</button>
        </NavLink>
        <NavLink to="/nurse/profile">
          <button className="btn btn-primary">Profile</button>
        </NavLink>
        <NavLink to="/nurse/appointments">
          <button className="btn btn-primary">Manage Appointments</button>
        </NavLink>
        <NavLink to="/nurse/visits">
          <button className="btn btn-primary">Manage Visits</button>
        </NavLink>
      </div>
      <button className="btn btn-danger" onClick={props.handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
