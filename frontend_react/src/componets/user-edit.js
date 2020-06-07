import React from "react";
import "./user-edit.css";
import { getUserById, editUserById } from "../services/userService";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cnp: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getUserById(this.props.match.params.id).then(
      (result) => {
        this.setState({
          isLoaded: true,
          name: result.name,
          cnp: result.cnp,
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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    editUserById(this.props.match.params.id, {
      name: this.state.name,
      cnp: this.state.cnp,
    }).then((result) => {
      this.props.history.push("/users");
    });
    console.log(this.props.history);

    event.preventDefault();
  }

  render() {
    return (
      <div className="container page-up-margin">
        <div className="row">
          <div className="offset-md-5">
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
                  CNP:
                  <input
                    type="text"
                    name="cnp"
                    value={this.state.cnp}
                    onChange={this.handleChange}
                    className="form-control input-md"
                  />
                </label>
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  value="Trimite"
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

export default UserEdit;
