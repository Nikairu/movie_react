import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login-view.scss';

import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://nikairu-flix-app.herokuapp.com/login?Username=${encodeURIComponent(
          username
        )}&Password=${encodeURIComponent(password)}`
      )
      .then((response) => {
        const authData = response.data;
        props.onLoggedIn(authData);
      })
      .catch((e) => {
        console.log(e);
        console.log('no such user');
      });
  };

  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        className="login-button"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>

      <Link to={`/register`}>
        <Button className="login-button" variant="primary" type="submit">
          Register
        </Button>
      </Link>
      {/* <Button variant="primary" type="submit" onClick={startRegister}>
        Register
      </Button> */}
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
