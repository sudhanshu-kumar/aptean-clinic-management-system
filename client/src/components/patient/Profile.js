import React from 'react';

const Profile = props => {
  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th>Token Id</th>
            <td>{props.user.tokenId}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>
              {props.user.firstName} {props.user.lastName}
            </td>
          </tr>
          <tr>
            <th>User Name</th>
            <td>{props.user.userName}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{props.user.age}</td>
          </tr>
          <tr>
            <th>Sex</th>
            <td>{props.user.sex}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{props.user.address}</td>
          </tr>
          <tr>
            <th colSpan="2">Emergency Contact</th>
          </tr>
          <tr>
            <th>Name</th>
            <td>{props.user.eName}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{props.user.ePhone}</td>
          </tr>
          <tr>
            <th>Relation</th>
            <td>{props.user.relation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
