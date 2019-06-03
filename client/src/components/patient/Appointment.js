import React from "react";

const Appointment = props => {
  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Appointment Date</th>
            <th>Doctor</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {props.appointment.map(function(obj, i) {
            return (
              <tr key={i}>
                <td>{(obj.aptDate).substring(0, 10)}</td>
                <td>{obj.doctor.name}</td>
                <td>{obj.type}</td>
                <td>{obj.status}</td>
                <td>{obj.createdBy.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointment;
