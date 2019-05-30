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
      .delete("http://localhost:3001/api/patients/" + this.props.obj._id)
      .then(res => {
          console.log(res.data)
          this.setState({ delete: true })
      });
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.firstName}</td>
        <td>{this.props.obj.lastName}</td>
        <td>{this.props.obj.userName}</td>
        <td>{this.props.obj.age}</td>
        <td>{this.props.obj.sex}</td>
        <td>{this.props.obj.address}</td>
        <td>{this.props.obj.eName}</td>
        <td>{this.props.obj.ePhone}</td>
        <td>{this.props.obj.relation}</td>
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
