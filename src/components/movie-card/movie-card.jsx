import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import { connect } from 'react-redux';

import { setFavoriteMovies } from '../../actions/actions';

import { Link } from 'react-router-dom';

import './movie-card.scss';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    let addFavorite = false;
    if (props.addFavorite) {
      addFavorite = true;
    }

    let removeFavorite = false;
    if (props.removeFavorite) {
      removeFavorite = true;
    }

    this.state = {
      movie: this.props.movie,
      username: props.user,
      userToken: props.userToken,
      addFavorite: addFavorite,
      removeFavorite: removeFavorite,
    };
  }

  /**
   * Adds a movie to list of user´s favorites
   * @function addFavorite
   * @axios
   */
  addFavorite = () => {
    this.setState({
      addFavorite: false,
    });
    axios({
      method: 'post',
      url: `https://nikairu-flix-app.herokuapp.com/users/${this.state.username}/Movies/${this.state.movie._id}`,
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

  /**
   * Remove movie from user's list of favorites
   * @function removeFavorite
   * @axios
   */
  removeFavorite = () => {
    this.props.updateFavorites(this.state.movie._id);
    this.setState({
      removeFavorite: false,
    });
    axios
      .delete(
        `https://nikairu-flix-app.herokuapp.com/users/${this.state.username}/Movies/${this.state.movie._id}`,
        {
          headers: { Authorization: `Bearer ${this.state.userToken}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        console.log('could not remove favorite');
      });
  };

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Card.Body className='bg-dark'>
          <table className='main_div'>
            <tbody>
              <tr>
                <td valign='top'>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                </td>
              </tr>
              <tr valign='bottom' className='button-wrapper'>
                <td>
                  <Link to={`/movies/${movie._id}`}>
                    <Button className='more-button' variant='primary'>
                      More
                    </Button>
                  </Link>
                  {this.state.addFavorite && (
                    <Button
                      className='favorite-button'
                      variant='secondary'
                      type='submit'
                      onClick={this.addFavorite}
                    >
                      Add Favorite
                    </Button>
                  )}
                  {this.state.removeFavorite && (
                    <Button
                      className='remove-button'
                      variant='secondary'
                      type='submit'
                      onClick={this.removeFavorite}
                    >
                      Remove Favorite
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies,
  };
};

export default connect(mapStateToProps, {
  setFavoriteMovies,
})(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
