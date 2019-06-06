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
      .delete("http://localhost:3001/api/visits/" + this.props.obj._id)
      .then(res => {
        console.log(res.data);
        this.setState({ delete: true });
      });
  };
  render() {
    return (
      <tr>
        <td>{this.props.obj.hasOwnProperty('appointment') ? this.props.obj.appointment._id : "-"}</td>
        <td>{this.props.obj.hasOwnProperty('patient') ? this.props.obj.patient.userName : "-"}</td>
        <td>{this.props.obj.diagnosedBy.userName}</td>
        <td>{this.props.obj.nursedBy.name}</td>
        <td>{this.props.obj.date.substring(4, 15)}</td>
        <td>{this.props.obj.date.substring(16, 24)} Hrs</td>
        <td>
          <Link
            to={"/nurse/visits/edit/" + this.props.obj._id}
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
