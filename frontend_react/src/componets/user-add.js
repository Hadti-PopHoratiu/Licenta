import React from "react";
import "./user-add.css";
import { addUser } from "../services/userService";

class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cnp: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    addUser({ name: this.state.name, cnp: this.state.cnp }).then((result) => {
      this.props.history.push("/users");
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid page-up-margin">
        <div className="row">
          <div className="col-md-2 offset-md-5">
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
                    value={this.state.value}
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

export default UserAdd;
