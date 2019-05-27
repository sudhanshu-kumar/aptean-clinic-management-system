import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginType = props => {
  return (
    <div>
      <select className="browser-default custom-select" style={{maxWidth: 200}} onChange={props.handleLoginType}>
      <option value="" disabled selected>Login As</option>
        <option value="doctor">Doctor</option>
        <option value="nurse">Nurse</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default LoginType;
