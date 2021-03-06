import React, { useState } from 'react';
import './profile-view.scss';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import { ProfileEditView } from '../profile-edit-view/profile-edit-view';

import { connect } from 'react-redux';

import { setUser, setFavoriteMovies } from '../../actions/actions';

export function ProfileView(props) {
  console.log(props);
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(new Date());

  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  if (username === '') {
    axios
      .get(`https://nikairu-flix-app.herokuapp.com/user/${props.user}`, {
        headers: { Authorization: `Bearer ${props.userToken}` },
      })
      .then((response) => {
        console.log('thisloaded');
        let userData = response.data[0];
        setUsername(userData.Username);
        setUser(userData.Username);
        setEmail(userData.Email);
        setBirthday(new Date(userData.Birthday));

        props.setFavoriteMovies(userData.FavoriteMovies);

        console.log(userData.FavoriteMovies);
        console.log(props.favoriteMovies);
      })
      .catch((e) => {
        console.log(e);
        console.log('no such user');
      });
  }

  if (username === '') return null;

  /**
   * Deletes the current user from the database
   * @function handleDelete
   * @axios
   */
  function deregister() {
    axios
      .delete(`https://nikairu-flix-app.herokuapp.com/users/${props.user}`, {
        headers: { Authorization: `Bearer ${props.userToken}` },
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

  let favorites = props.movies.filter(
    (m) => props.favoriteMovies && props.favoriteMovies.includes(m._id)
  );

  const updateFavorites = (mov) => {
    setFavoriteMovies(
      props.favoriteMovies.filter((fm) => {
        return fm !== mov;
      })
    );
  };

  const editUser = () => {
    setEdit(!edit);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='user-view'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-light'>Accept Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-light'>
          Are you sure you want to delete your user data?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={deregister}>
            Accept changes
          </Button>
          <Button
            className='text-light'
            variant='secondary'
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='user-data-container'>
        <div className='current-data'>
          <div className='user-name'>
            <span className='lable'>Username: </span>
            <span className='value'>{username}</span>
          </div>
          <div className='user-email'>
            <span className='label'>Email: </span>
            <span className='value'>{email}</span>
          </div>
          <div className='user-birthday'>
            <span className='label'>Birthday: </span>
            <span className='value'>
              {birthday.getDate() +
                '/' +
                birthday.getMonth() +
                '/' +
                birthday.getFullYear()}
            </span>
          </div>
          <Button className='edit-button' variant='primary' onClick={editUser}>
            Edit
          </Button>

          <Button
            className='deregister-button'
            variant='secondary'
            type='submit'
            onClick={handleShow}
          >
            Delete account
          </Button>
        </div>
        {edit && (
          <ProfileEditView user={props.user} userToken={props.userToken} />
        )}
      </div>

      <div className='label'>Favorite Movies: </div>

      <div className='favorite-movies'>
        {favorites.map((m) => (
          <MovieCard
            user={props.user}
            userToken={props.userToken}
            key={m._id}
            movie={m}
            removeFavorite={true}
            updateFavorites={updateFavorites}
          />
        ))}
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  console.log(state);
  return {
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies,
  };
};

export default connect(mapStateToProps, {
  setUser,
  setFavoriteMovies,
})(ProfileView);
