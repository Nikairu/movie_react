import React, { useState } from 'react';
import { BackButtonView } from '../back-button-view/back-button-view';
import './profile-view.scss';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [password, setPassword] = useState('');

  const user = props.user;
  const userToken = props.userToken;
  if (username === '') {
    axios
      .get(`https://nikairu-flix-app.herokuapp.com/user/${user}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let userData = response.data[0];
        setUsername(userData.Username);
        setEmail(userData.Email);
        setBirthday(userData.Birthday);
        setFavoriteMovies(userData.FavoriteMovies);

        console.log(userData);
      })
      .catch((e) => {
        console.log(e);
        console.log('no such user');
      });
  }

  if (!username) return null;

  function deregister() {
    axios
      .delete(`https://nikairu-flix-app.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        console.log(response);
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
        console.log('no such user');
      });
  }

  return (
    <div className="user-view">
      <div className="user-name">
        <span className="lable">Username: </span>
        <span className="value">{username}</span>
      </div>
      <div className="user-email">
        <span className="label">Email: </span>
        <span className="value">{email}</span>
      </div>
      <div className="user-birthday">
        <span className="label">Birthday: </span>
        <span className="value">{birthday}</span>
      </div>
      <div className="favorite-movies">
        <span className="label">Favorite Movies: </span>
        {favoriteMovies.map((m) => (
          <span>
            {m.Title}
            <i>; </i>
          </span>
        ))}
      </div>
      <Link to={`/profile/edit`}>
        <Button className="edit-button" variant="primary" type="submit">
          Edit
        </Button>
      </Link>

      <Button
        className="deregister-button"
        variant="primary"
        type="submit"
        onClick={deregister}
      >
        Delete your account!
      </Button>
    </div>
  );
}
