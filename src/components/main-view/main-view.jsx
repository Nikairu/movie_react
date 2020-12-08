import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null,
    };
  }
  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get('https://nikairu-flix-app.herokuapp.com/movies')
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  goBack() {
    this.setState({
      selectedMovie: null,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  startRegister() {
    this.setState({
      register: true,
    });
  }
  finishRegister() {
    this.setState({
      register: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (register) {
      return <RegistrationView finishRegister={() => this.finishRegister()} />;
    }

    if (!user)
      return (
        <div className="main-container">
          <div>
            <h2 className="welcome-banner">Welcome to Myflix</h2>
          </div>
          <LoginView
            onLoggedIn={(user) => this.onLoggedIn(user)}
            startRegister={() => this.startRegister()}
          />
        </div>
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} goback={() => this.goBack()} />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={(movie) => {
                this.onMovieClick(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
