import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <div>
        <NavLink to="/patient/profile">
          <button className="btn btn-primary">profile</button>
        </NavLink>
        <NavLink to="/patient/appointment">
          <button className="btn btn-primary">Appointment</button>
        </NavLink>
      </div>
      <button className="btn btn-danger" onClick={props.handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
