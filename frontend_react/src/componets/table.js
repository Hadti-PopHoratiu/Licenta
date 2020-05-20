import React from "react";
import { Link } from "react-router-dom";
import "./table.css";
import { getGenres } from "../services/genreService";
import { getBooks } from "../services/bookService";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      genres: [],
      books: [],
      genresFilter: [],
      isBook: true,
      isAuthor: false,
      filter: "",
      pageNumber: 1,
    };
  }

  componentDidMount() {
    getGenres().then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          genres: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

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
    const {
      error,
      isLoaded,
      genres,
      books,
      genresFilter,
      isBook,
      isAuthor,
      filter,
      pageNumber,
    } = this.state;
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
              <div className="col-md-8 offset-md-2">
                <table className="table table-striped custab">
                  <thead>
                    <th>Carte</th>
                    <th>Autor</th>
                    <th>ISBN</th>
                    <th>Exemplare totale</th>
                    <th>Exemplare in uz</th>
                    <th>Detinatori curenti</th>
                  </thead>
                  {books.map((book) => (
                    <tr key={book}>
                      <td>{book.name}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.total}</td>
                      <td>{book.used}</td>
                      <Link to={`/table/${book.id}`}>
                        <button
                          type="button"
                          className="btn btn-success"
                          routerLink="/table/{{book.id}}"
                        >
                          Deschide
                        </button>
                      </Link>
                    </tr>
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

export default Table;
