import React from "react";
import "./users.css";
import { getUsers, getUserTable } from "../services/userService";
import { getBookById } from "../services/bookService";

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
    };
  }

  componentDidMount() {
    getUsers(1, this.state.filter).then(
      (result) => {
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
    getBookById("5ebe6583ac98930f10ccd764").then(
      (result) => {
        this.setState({
          isLoaded: true,
          book: result,
        });
        console.log(this.book);
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
    const { error, isLoaded, freeUsers } = this.state;
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
                  />
                  <div class="input-group-append">
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
                    <tbody key={user.name}>
                      <tr>
                        <td>{user.name} </td>
                        <td>{user.cnp}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            id="edit"
                          >
                            Adauga
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="col-md-4">
                <table className="table">
                  <thead className="thead-light">
                    <th>Nume</th>
                    <th>CNP</th>
                    <th>Carte imprumutata</th>
                    <th>Opiuni</th>
                  </thead>
                  {freeUsers.map((user) => (
                    <tbody key={user.name}>
                      <tr>
                        <td>{user.name} </td>
                        <td>{user.cnp}</td>
                        <td>asa merge viata</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            id="edit"
                          >
                            Sterge
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
