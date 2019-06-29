import React from "react";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TableRow = props => {
  if (props.obj !== null) {
    return (
      <tr id={props.obj._id}>
        <td>{props.obj.firstName}</td>
        <td>{props.obj.lastName}</td>
        <td>{props.obj.userName}</td>
        <td>{props.obj.age}</td>
        <td>{props.obj.sex}</td>
        <td>{props.obj.address}</td>
        <td>{props.obj.eName}</td>
        <td>{props.obj.ePhone}</td>
        <td>{props.obj.relation}</td>
        <td>
          <Link
            to={"/admin/patients/edit/" + props.obj._id}
            className="btn btn-primary"
          >
            Edit
          </Link>
        </td>
        <td>
          <button
            onClick={() => props.onDelete(props.obj._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  } else return <Redirect to="/admin/patients" />;
};

export default TableRow;
