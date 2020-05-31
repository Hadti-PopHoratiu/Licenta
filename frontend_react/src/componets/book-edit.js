import React from "react";
import { getGenres } from "../services/genreService";
import { getBookById, editBookById } from "../services/bookService";

class BookEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      author: "",
      date: "",
      genres: [],
      selectedGenre: "",
      bookTotal: 0,
      isbn: 0,
      description: "",
      image: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getBookById(this.props.match.params.id).then(
      (result) => {
        console.log(result.author);
        this.setState({
          isLoaded: true,
          name: result.name,
          author: result.author,
          date: result.date,
          selectedGenre: result.genre,
          bookTotal: result.total,
          isbn: result.isbn,
          description: result.description,
          image: result.image,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

    getGenres().then(
      (result) => {
        console.log(this.props.match.params.id);
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
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    editBookById(this.props.match.params.id, {
      name: this.state.name,
      author: this.state.author,
      date: this.state.date,
      genre: this.state.selectedGenre,
      description: this.state.description,
      isbn: this.state.isbn,
      total: this.state.bookTotal,
      image: this.state.image,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 offset-md-2">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>
                  Nume:
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Autor:
                  <input
                    type="text"
                    name="author"
                    value={this.state.author}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Data:
                  <input
                    type="text"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
                <label>
                  Gen:
                  <select
                    value={this.state.selectedGenre}
                    onChange={this.handleChange}
                    name="selectedGenre"
                    className="form-control input-md"
                  >
                    <option value="" disabled>
                      Alege genul
                    </option>
                    {this.state.genres.map((genre) => (
                      <option value={genre}>{genre}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Nr Exemplare:
                  <input
                    type="text"
                    name="bookTotal"
                    value={this.state.bookTotal}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
                <label>
                  ISBN:
                  <input
                    type="text"
                    name="isbn"
                    value={this.state.isbn}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
                <label>
                  Descriere:
                  <input
                    type="description"
                    name="date"
                    value={this.state.description}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
                <label>
                  Imagine:
                  <input
                    type="text"
                    name="image"
                    value={this.state.image}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BookEdit;
