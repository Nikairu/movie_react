import React from 'react';
import { BackButtonView } from '../back-button-view/back-button-view';
import './movie-view.scss';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    let addFavorite = false;

    if (props.addFavorite) {
      addFavorite = true;
    }

    this.state = {
      movie: this.props.movie,
      username: this.props.user,
      userToken: this.props.userToken,
      movieid: this.props.movieId,
      Favoritebutton: addFavorite,
    };
  }
  addFavorite = () => {
    this.setState({
      Favoritebutton: false,
    });
    axios({
      method: 'post',
      url: `https://nikairu-flix-app.herokuapp.com/users/${this.state.username}/Movies/${this.state.movieid}`,
      headers: { Authorization: `Bearer ${this.state.userToken}` },
      data: {},
    })
      .then((response) => {
        console.log('movie added');
      })
      .catch((e) => {
        console.log(e);
        console.log('movie not added');
      });
  };

  render() {
    const movie = this.state.movie;

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

        {this.state.Favoritebutton && (
          <Button
            className="favorite-button"
            variant="primary"
            type="submit"
            onClick={this.addFavorite}
          >
            Add to Favorites!
          </Button>
        )}
      </div>
    );
  }
}
