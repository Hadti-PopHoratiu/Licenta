import React from "react";
import "./users.css";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { getUsers, deleteUser } from "../services/userService";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filter: "",
      activePage: 1,
      totalPages: 0,
    };
    this.deleteUserClicked = this.deleteUserClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getUsers(this.state.activePage, this.state.filter).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
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

  async deleteUserClicked(id) {
    await deleteUser(id);
    getUsers(1, this.state.filter).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
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

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    getUsers(pageNumber, this.state.filter).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    getUsers(1, this.state.filter).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
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
                    name="filter"
                    value={this.state.filter}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text amber lighten-3"
                      id="basic-text1"
                    >
                      <i
                        className="fas fa-search"
                        onClick={this.handleSubmit}
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
                <table className="table">
                  <thead className="thead-light ">
                    <th>Nume</th>
                    <th>CNP</th>
                    <th>Carti</th>
                    <th>Opiuni</th>
                  </thead>
                  {items.map((user) => (
                    <tbody key={user.name} className="text-format">
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
                              <i class="far fa-edit"></i>
                            </button>
                          </Link>
                          <button
                            onClick={() => this.deleteUserClicked(user.id)}
                            type="button"
                            className="btn btn-sm btn-danger"
                            id="edit"
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
                <div className="d-flex justify-content-end">
                  <Pagination
                    prevPageText="Inapoi"
                    nextPageText="Inainte"
                    activePage={this.state.activePage}
                    itemsCountPerPage={7}
                    totalItemsCount={this.state.totalPages}
                    onChange={this.handlePageChange.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Users;
