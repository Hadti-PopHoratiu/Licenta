import React from "react";
import "./login.css";
import { login } from "../services/userService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: 0,
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
    login({ username: this.state.name, password: this.state.password }).then(
      (result) => {
        console.log(result.message);
        if (result.message === "Date false") {
          alert("date gresite");
        } else {
          localStorage.setItem("loggedIn", JSON.stringify(true));
          this.props.updateLoggedInStatus();
        }
      },
      (error) => {
        console.log(error);
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid page-up-margin">
        <div className="row">
          <div className="col-md-2 offset-md-5">
            <form onSubmit={this.handleSubmit} className="text-format">
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
                  Parola:
                  <input
                    type="password"
                    name="password"
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

export default Login;
