import React from "react";

const Profile = props => {
  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{props.user.name}</td>
          </tr>
          <tr>
            <th>User Name</th>
            <td>{props.user.userName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{props.user.email}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{props.user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
