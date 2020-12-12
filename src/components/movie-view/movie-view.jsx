import React from 'react';
import { BackButtonView } from '../back-button-view/back-button-view';
import './movie-view.scss';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const username = this.props.user;
    const movieid = this.props.movie._id;
    const movie = this.props.movie;
    const userToken = this.props.userToken;

    console.log(this.props.user);
    console.log(this.props.movie._id);
    console.log(this.props.userToken);
    function addFavorite() {
      axios
        .post(
          `https://nikairu-flix-app.herokuapp.com/users/${username}/Movies/${movieid}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          const data = response.data;
        })
        .catch((e) => {
          console.log(e);
          console.log('movie not added');
        });
    }

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <Button
          className="favorite-button"
          variant="primary"
          type="submit"
          onClick={addFavorite}
        >
          Add to Favorites!
        </Button>
      </div>
    );
  }
}
