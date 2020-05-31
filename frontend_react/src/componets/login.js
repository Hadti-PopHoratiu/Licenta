import React from "react";

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
    alert("A name was submitted: " + this.state.name + this.state.password);
    localStorage.setItem("loggedIn", JSON.stringify(true));
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

export default Login;
