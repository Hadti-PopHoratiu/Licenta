import React from "react";
import { Link } from "react-router-dom";
import "./table.css";
import { getBooks } from "../services/bookService";
import Pagination from "react-js-pagination";

class Table extends React.Component {
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
      activePage: 1,
      totalPages: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getBooks(
      1,
      this.state.filter,
      this.state.isBook,
      this.state.isAuthor,
      this.state.genresFilter
    ).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].count,
          });
        }
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

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    getBooks(
      pageNumber,
      this.state.filter,
      this.state.isBook,
      this.state.isAuthor,
      this.state.genresFilter
    ).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].count,
          });
        }
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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleOptionChange(event) {
    if (event.target.value === "book") {
      this.setState({
        isBook: true,
        isAuthor: false,
      });
    } else {
      this.setState({
        isBook: false,
        isAuthor: true,
      });
    }
  }

  handleSubmit(event) {
    getBooks(
      1,
      this.state.filter,
      this.state.isBook,
      this.state.isAuthor,
      this.state.genresFilter
    ).then(
      (result) => {
        this.setState({
          totalPages: 0,
        });
        if (Object.keys(result).length) {
          this.setState({
            totalPages: result[0].count,
          });
        }
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
                    name="filter"
                    value={this.state.filter}
                    onChange={this.handleChange}
                  />
                  <div
                    className="input-group-append"
                    onClick={this.handleSubmit}
                  >
                    <span
                      className="input-group-text amber lighten-3"
                      id="basic-text1"
                    >
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <span
                    className="align-middle"
                    onChange={this.handleOptionChange.bind(this)}
                  >
                    <input
                      type="radio"
                      name="secondFilter"
                      value="book"
                      checked={this.state.isBook}
                      className="margin-between"
                      className="margin-between"
                    />
                    <label for="male">Carte</label>
                    <input
                      type="radio"
                      name="secondFilter"
                      value="author"
                      checked={this.state.isAuthor}
                      className="margin-between"
                    />
                    <label for="female">Autor</label>
                  </span>
                </div>
              </div>
              <div className="col-md-8 offset-md-2">
                <table className="table table-striped custab">
                  <thead class="thead-light">
                    <th>Carte</th>
                    <th>Autor</th>
                    <th>ISBN</th>
                    <th>Exemplare totale</th>
                    <th>Exemplare in uz</th>
                    <th>Detinatori curenti</th>
                  </thead>
                  {books.map((book) => (
                    <tr key={book} className="text-format">
                      <td>{book.name}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.total}</td>
                      <td>{book.used}</td>
                      <td>
                        <Link to={`/table/${book.id}`}>
                          <button
                            type="button"
                            className="btn btn-success"
                            routerLink="/table/{{book.id}}"
                          >
                            <i class="fas fa-external-link-alt"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </table>
                <div className="d-flex justify-content-end">
                  <Pagination
                    prevPageText="Inapoi"
                    nextPageText="Inainte"
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
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

export default Table;
