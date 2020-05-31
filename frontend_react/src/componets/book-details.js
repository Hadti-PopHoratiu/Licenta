import React from "react";
import { getBookById } from "../services/bookService";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bookInfo: [],
    };
    console.log("constructor");
    console.log(this.props);
  }

  componentDidMount() {
    getBookById(this.props.match.params.id).then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          bookInfo: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );

    console.log(this.props.match.params.id);
  }

  render() {
    const { error, isLoaded, bookInfo } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="d-flex justify-content-start">
                <img src={bookInfo.image} height="150" width="100" />
                <div className="d-flex flex-column book">
                  <div> Numele cartii: {bookInfo?.name}}</div>
                  <div> Autor: bookInfo.author}}</div>
                  <div> Data publicarii: {bookInfo.date}</div>
                  <div> Gen: {bookInfo.genre}</div>
                  <div> Numar exemplare disponibile: {bookInfo.free}</div>
                </div>
              </div>
              <div>Description: {bookInfo.description}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BookDetails;
