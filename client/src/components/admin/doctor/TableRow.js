import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false
    };
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete("http://localhost:3001/api/doctors/" + this.props.obj._id)
      .then(res => {
          console.log(res.data)
          this.setState({ delete: true })
      });
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.userName}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.phone}</td>
        <td>{this.props.obj.speciality}</td>
        <td>{this.props.obj.fee}</td>
        <td>{this.props.obj.availabilityTimes}</td>
        <td>
          <Link
            to={"/admin/patients/edit/" + this.props.obj._id}
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
