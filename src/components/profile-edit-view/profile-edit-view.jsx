import React, { useState } from 'react';
import { BackButtonView } from '../back-button-view/back-button-view';
import './profile-edit-view.scss';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function ProfileEditView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const user = props.user;
  const userToken = props.userToken;

  function applyChanges(e) {
    e.preventDefault();
    axios
      .put(
        `https://nikairu-flix-app.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
        console.log('Failed to update data');
      });
  }

  return (
    <form className="profile-edit-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label>New Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Text className="text-muted">(min. length 5)</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>New Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="text"
          placeholder="MM/DD/YYYY"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
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
        onClick={applyChanges}
      >
        Apply
      </Button>
    </form>
  );
}