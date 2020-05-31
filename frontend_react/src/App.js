import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./componets/home";
import Users from "./componets/users";
import Books from "./componets/books";
import Table from "./componets/table";
import Login from "./componets/login";
import UserEdit from "./componets/user-edit";
import BookEdit from "./componets/book-edit";
import BookDetails from "./componets/book-details";
import BookBorrow from "./componets/book-borrow";
import BookAdd from "./componets/book-add";
import UserAdd from "./componets/user-add";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }
  componentDidMount() {
    this.setState({
      isLogged: localStorage.getItem("loggedIn"),
    });
    console.log(localStorage.getItem("loggedIn"));
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar
            collapseOnSelect
            expand="lg"
            variant="dark"
            className="navbar-custom no-gutters"
          >
            <div className=" row col-md-8 offset-md-2">
              <Navbar.Brand>
                <Link to="/" className="link">
                  <i className="fas fa-book-open"></i> Biblioteca
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <CheckIfLogged isLoggedIn={this.state.isLogged} />
                </Nav>
                <Nav.Link>
                  <Link to="/login" className="link">
                    Conectare
                  </Link>
                </Nav.Link>
              </Navbar.Collapse>
            </div>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/users/edit/:id" component={UserEdit} />

            <Route path="/users/add">
              <UserAdd />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="/books/edit/:id" component={BookEdit} />

            <Route path="/books/add">
              <BookAdd />
            </Route>

            <Route path="/books">
              <Books />
            </Route>

            <Route path="/administration">
              <Table />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/table/:id" component={BookBorrow} />

            <Route path="/book/:id" component={BookDetails} />

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function LoggedIn(props) {
  return (
    <Nav>
      <NavDropdown title="Utilizatori" id="collasible-nav-dropdown">
        <NavDropdown.Item>
          <Link to="/users" className="dropdown-link">
            Lista utilizatori
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <Link to="/users/add" className="dropdown-link">
            Adauga utilizator
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Carti" id="collasible-nav-dropdown">
        <NavDropdown.Item>
          <Link to="/books" className="dropdown-link">
            Lista carti
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <Link to="/books/add" className="dropdown-link">
            Adauga carte
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link>
        <Link to="/administration" className="link">
          Tabel de administratie
        </Link>
      </Nav.Link>
    </Nav>
  );
}

function LoggedOut(props) {
  return <div>Please sign up.</div>;
}

function CheckIfLogged(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <LoggedIn />;
  }
  return <LoggedOut />;
}
export default App;
