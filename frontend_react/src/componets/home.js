import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getBooks } from "../services/bookService";

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
              <div className="col-md-2 offset-md-2">
                {genres.map((genre) => (
                  <div>
                    <input type="checkbox" key={genre} />
                    {genre}
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
                  />
                  <div class="input-group-append">
                    <span
                      class="input-group-text amber lighten-3"
                      id="basic-text1"
                    >
                      <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <span class="align-middle">
                    <input type="radio" value="book" class="margin-between" />
                    <label for="male">Carte</label>
                    <input type="radio" value="author" class="margin-between" />
                    <label for="female">Autor</label>
                  </span>
                </div>

                <div class="container-fluid">
                  {books.map((book) => (
                    <div class="row margin" key={book}>
                      <Link to={`/book/${book.id}`}>
                        <div class="d-flex justify-content-start">
                          <img src={book.image} height="150" width="100" />
                          <div class="d-flex flex-column book">
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
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
