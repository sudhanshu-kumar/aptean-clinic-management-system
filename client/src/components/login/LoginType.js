import React from "react";

const LoginType = props => {
  return (
    <div>
      <select onChange={props.handleLoginType}>
        <option>Doctor</option>
        <option>Nurse</option>
        <option>Admin</option>
      </select>
    </div>
  );
};

export default LoginType;
