import React from "react";
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
    });
    console.log(this.props.history);
    // this.props.history.push("../../users");
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

export default UserEdit;
