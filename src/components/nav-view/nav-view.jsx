import React from 'react';
import './nav-view.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export class NavView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const user = this.props.user;

    if (!user) return null;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link className="navbar-brand" to={`/`}>
          My-Flix
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Features</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Movies</NavDropdown.Item>
              <NavDropdown.Item href="#">Genres</NavDropdown.Item>
              <NavDropdown.Item href="#">Directors</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Soon...</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link to={`/profile`}>User Profile</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
