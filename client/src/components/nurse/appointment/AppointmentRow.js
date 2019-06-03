import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class TableRow extends Component {
  state = {
    delete: false,
  };
  delete = () => {
    axios
      .delete("http://localhost:3001/api/appointments/" + this.props.obj._id)
      .then(res => {
        console.log(res.data);
        this.setState({ delete: true });
      });
  };
  render() {
    return (
      <tr>
        <td>{this.props.obj.aptDate.substring(0, 10)}</td>
        <td>{this.props.obj.doctor.name}</td>
        <td>
          {this.props.obj.patient.firstName} {this.props.obj.patient.lastName}
        </td>
        <td>{this.props.obj.type}</td>
        <td>{this.props.obj.status}</td>
        <td>{this.props.obj.createdBy.name}</td>
        <td>
          <Link
            to={"/nurse/appointments/edit/" + this.props.obj._id}
            className="btn btn-primary"
          >
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
