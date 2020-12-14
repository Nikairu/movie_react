import React from 'react';
import './nav-view.scss';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class NavView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  logout = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  render() {
    const user = this.props.user;

    if (!user) return null;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">My-Flix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Features</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Genres</NavDropdown.Item>
              <NavDropdown.Item href="#">Directors</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Soon...</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link className="profile-button btn btn-primary" to={`/profile`}>
              Profile
            </Link>
          </Nav>
          <Nav>
            <Button
              className="logout-button"
              variant="outline-danger"
              onClick={this.logout}
            >
              logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
