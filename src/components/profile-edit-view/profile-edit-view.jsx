import React, { useState } from 'react';
import Fade from 'react-bootstrap/Fade';
import './profile-edit-view.scss';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import { connect } from 'react-redux';

import { setUser } from '../../actions/actions';

export function ProfileEditView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  /**
   * Update user details
   * @function applyChanges
   * @axios
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {date} birthday
   */
  function applyChanges(e) {
    e.preventDefault();
    axios
      .put(
        `https://nikairu-flix-app.herokuapp.com/users/${props.user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${props.userToken}` },
        }
      )
      .then((response) => {
        setUser();
        console.log(response);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response.data.errors[0].msg);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  }

  return (
    <form className='profile-edit-form'>
      <Fade in={showAlert}>
        <div className='alert-container'>
          <Alert variant='danger'>{errorMessage}</Alert>
        </div>
      </Fade>
      <Form.Group controlId='formBasicUsername'>
        <Form.Label>New Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Text className='text-muted'>(min. length 5)</Form.Text>
      </Form.Group>

      <Form.Group controlId='formBasicEmail'>
        <Form.Label>New Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='formBasicBirthday'>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type='text'
          placeholder='MM/DD/YYYY'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        className='login-button'
        variant='primary'
        type='submit'
        onClick={applyChanges}
      >
        Apply
      </Button>
    </form>
  );
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    userToken: state.userToken,
  };
};

export default connect(mapStateToProps, {
  setUser,
})(ProfileEditView);
