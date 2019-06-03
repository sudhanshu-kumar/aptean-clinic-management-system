import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class TableRow extends Component {
  state = {
    row: this.props.obj
  };
  delete = () => {
    axios
      .delete("http://localhost:3001/api/patients/" + this.state.row._id)
      .then(res => {
        console.log(res.data);
        this.setState({ row: null });
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state.row);
    if (this.state.row !== null) {
      return (
        <tr>
          <td>{this.state.row.firstName}</td>
          <td>{this.state.row.lastName}</td>
          <td>{this.state.row.userName}</td>
          <td>{this.state.row.age}</td>
          <td>{this.state.row.sex}</td>
          <td>{this.state.row.address}</td>
          <td>{this.state.row.eName}</td>
          <td>{this.state.row.ePhone}</td>
          <td>{this.state.row.relation}</td>
          <td>
            <Link
              to={"/admin/patients/edit/" + this.state.row._id}
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
    } else return <Redirect to="/admin/patients" />;
  }
}

export default TableRow;
