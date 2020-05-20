import React from "react";
import "./books.css";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookService";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: [],
      genresFilter: [],
      isBook: true,
      isAuthor: false,
      filter: "",
      pageNumber: 1,
    };
  }

  componentDidMount() {
    getBooks(
      this.state.pageNumber,
      this.state.filter,
      this.state.isBook,
      this.state.isAuthor,
      this.state.genresFilter
    ).then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          books: result,
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
    const { error, isLoaded, books } = this.state;
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
                    <span className="align-middle">
                      <input
                        type="radio"
                        value="book"
                        className="margin-between"
                      />
                      <label for="male">Carte</label>
                      <input
                        type="radio"
                        value="author"
                        className="margin-between"
                      />
                      <label for="female">Autor</label>
                    </span>
                  </div>
                </div>
                <table className="table">
                  <thead className="thead-light">
                    <th>Nume</th>
                    <th>Autor</th>
                    <th>Exemplare</th>
                    <th>Opiuni</th>
                  </thead>
                  {books.map((book) => (
                    <tbody key={book.name}>
                      <tr>
                        <td>{book.name} </td>
                        <td>{book.author}</td>
                        <td>{book.total}</td>
                        <td>
                          <Link to={`/books/edit/${book.id}`}>
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

export default Books;
