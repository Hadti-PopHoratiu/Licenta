import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getBooks } from "../services/bookService";
import Pagination from "react-js-pagination";

class Home extends React.Component {
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
      activePage: 1,
      totalPages: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getGenres().then(
      (result) => {
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

  handleGenreFilterChange(event) {
    const target = event.target;
    const name = target.name;
    const checked = target.checked;
    const arr = this.state.genresFilter;
    if (checked) {
      arr.push(name);
    } else {
      const index = arr.indexOf(name);
      if (index !== -1) arr.splice(index, 1);
    }
    this.setState({
      genresFilter: arr,
    });
  }

  render() {
    const { error, isLoaded, genres, books } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="page-up-margin">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 offset-md-2 genre-margin">
                {genres.map((genre) => (
                  <div>
                    <input
                      type="checkbox"
                      name={genre}
                      key={genre}
                      onChange={this.handleGenreFilterChange.bind(this)}
                    />
                    <label>{genre}</label>
                  </div>
                ))}
              </div>

              <div class="col-md-6">
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
                  <span
                    class="align-middle"
                    onChange={this.handleOptionChange.bind(this)}
                  >
                    <input
                      type="radio"
                      name="secondFilter"
                      value="book"
                      checked={this.state.isBook}
                      className="margin-between"
                    />
                    <label for="book">Carte</label>
                    <input
                      type="radio"
                      name="secondFilter"
                      value="author"
                      checked={this.state.isAuthor}
                      className="margin-between"
                    />
                    <label for="author">Autor</label>
                  </span>
                </div>

                <div className="container-fluid bookText">
                  {books.map((book) => (
                    <div className="row margin" key={book}>
                      <Link to={`/book/${book.id}`}>
                        <div className="d-flex justify-content-start">
                          <img src={book.image} height="150" width="100" />
                          <div className="d-flex flex-column book">
                            <div> Nume: {book.name} </div>
                            <div> Autor: {book.author}</div>
                            <div> Data publicarii: {book.date}</div>
                            <div> Gen: {book.genre}</div>
                            <div>Numar exemplare disponibile: {book.free}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
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

export default Home;
