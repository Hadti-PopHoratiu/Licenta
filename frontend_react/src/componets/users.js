import React from "react";
import "./users.css";
import { Link } from "react-router-dom";
import { getUsers } from "../services/userService";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filter: "",
    };
  }

  componentDidMount() {
    getUsers(1, this.state.filter).then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="page-up-margin">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="input-group md-form form-sm form-2 pl-0 margin">
                  <input
                    className="form-control my-0 py-1 amber-border"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text amber lighten-3"
                      id="basic-text1"
                    >
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
                <table className="table">
                  <thead className="thead-light">
                    <th>Nume</th>
                    <th>CNP</th>
                    <th>Carti</th>
                    <th>Opiuni</th>
                  </thead>
                  {items.map((user) => (
                    <tbody key={user.name}>
                      <tr>
                        <td>{user.name} </td>
                        <td>{user.cnp}</td>
                        <td>
                          {user.books.map((book) => (
                            <div>{book}</div>
                          ))}
                        </td>
                        <td>
                          <Link to={`/users/edit/${user.id}`}>
                            <button
                              type="button"
                              className="btn btn-sm btn-info"
                              id="edit"
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            id="edit"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Users;
