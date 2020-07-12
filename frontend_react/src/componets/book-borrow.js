import React from "react";
import "./users.css";
import {
  getUserTable,
  getUserFree,
  addUserBook,
  deleteUserBook,
} from "../services/userService";
import {
  getBookById,
  editBookCountUp,
  editBookCountDown,
} from "../services/bookService";
import Pagination from "react-js-pagination";

class BookBorrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      freeUsers: [],
      usedUsers: [],
      book: {},
      filter: "",
      activePage: 1,
      totalPages: 0,
    };
    this.AddButtonCLicked = this.AddButtonCLicked.bind(this);
    this.DeleteButtonClicked = this.DeleteButtonClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await getBookById(this.props.match.params.id).then(
      (result) => {
        this.setState({
          isLoaded: true,
          book: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

    getUserFree(1, this.state.filter, this.state.book.name).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
        this.setState({
          isLoaded: true,
          freeUsers: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

    getUserTable(this.state.book.name).then(
      (result) => {
        this.setState({
          isLoaded: true,
          usedUsers: result,
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

  async AddButtonCLicked(id) {
    await addUserBook({ book: this.state.book.name }, id);
    await editBookCountUp(this.state.book.id, {});
    getUserTable(this.state.book.name).then(
      (result) => {
        this.setState({
          isLoaded: true,
          usedUsers: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

    getUserFree(1, this.state.filter, this.state.book.name).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
        this.setState({
          isLoaded: true,
          freeUsers: result,
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

  async DeleteButtonClicked(id) {
    await deleteUserBook({ book: this.state.book.name }, id);
    await editBookCountDown(this.state.book.id, {});
    getUserFree(1, this.state.filter, this.state.book.name).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
        this.setState({
          isLoaded: true,
          freeUsers: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

    getUserTable(this.state.book.name).then(
      (result) => {
        this.setState({
          isLoaded: true,
          usedUsers: result,
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
    this.setState({ activePage: pageNumber });
    getUserFree(pageNumber, this.state.filter, this.state.book.name).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
        this.setState({
          isLoaded: true,
          freeUsers: result,
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
    getUserFree(1, this.state.filter, this.state.book.name).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].total,
          });
        }
        this.setState({
          isLoaded: true,
          freeUsers: result,
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
    const { error, isLoaded, freeUsers, book, usedUsers } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="page-up-margin">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 offset-md-2">
                <div class="input-group md-form form-sm form-2 pl-0 margin">
                  <input
                    class="form-control my-0 py-1 amber-border"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    name="filter"
                    value={this.state.filter}
                    onChange={this.handleChange}
                  />
                  <div class="input-group-append" onClick={this.handleSubmit}>
                    <span
                      class="input-group-text amber lighten-3"
                      id="basic-text1"
                    >
                      <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
                <table className="table">
                  <thead className="thead-light">
                    <th>Nume</th>
                    <th>CNP</th>
                    <th>Opiuni</th>
                  </thead>
                  {freeUsers.map((user) => (
                    <tbody key={user.name} className="text-format">
                      <tr>
                        <td>{user.name} </td>
                        <td>{user.cnp}</td>
                        <td>
                          <button
                            onClick={() => this.AddButtonCLicked(user.id)}
                            type="button"
                            className="btn btn-sm btn-success"
                            id="add"
                          >
                            <i class="fas fa-plus"></i>
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
              <div className="col-md-4">
                <table className="table">
                  <thead className="thead-light">
                    <th>Nume</th>
                    <th>CNP</th>
                    <th>Carte imprumutata</th>
                    <th>Opiuni</th>
                  </thead>
                  {usedUsers.map((user) => (
                    <tbody key={user.name} className="text-format">
                      <tr>
                        <td>{user.name} </td>
                        <td>{user.cnp}</td>
                        <td>{book.name}</td>
                        <td>
                          <button
                            onClick={() => this.DeleteButtonClicked(user.id)}
                            type="button"
                            className="btn btn-sm btn-danger"
                            id="delete"
                          >
                            <i class="far fa-trash-alt"></i>
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

export default BookBorrow;
