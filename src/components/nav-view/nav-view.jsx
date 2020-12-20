import React from 'react';
import './nav-view.scss';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

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
            <VisibilityFilterInput />
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
