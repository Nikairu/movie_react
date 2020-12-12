import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavView } from '../nav-view/nav-view';
import { ProfileEditView } from '../profile-edit-view/profile-edit-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      console.log(localStorage);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });
    console.log(authData.user);
    localStorage.setItem('userData', authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://nikairu-flix-app.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        localStorage.clear();
        this.setState({
          user: null,
        });
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <NavView user={user} />
        <Route
          exact
          path="/"
          render={() => {
            //no user logged in
            if (!user)
              return (
                <div className="main-container">
                  <div>
                    <h2 className="welcome-banner">Welcome to Myflix</h2>
                  </div>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </div>
              );

            return (
              <div className="main-view">
                {movies.map((m) => (
                  <MovieCard
                    key={m._id}
                    movie={m}
                    onClick={(movie) => {
                      this.onMovieClick(movie);
                    }}
                  />
                ))}
              </div>
            );
          }}
        />
        <Route path="/register" render={() => <RegistrationView />} />
        <Route
          path="/movies/:movieId"
          render={({ match }) => (
            <MovieView
              movie={movies.find((m) => m._id === match.params.movieId)}
              user={user}
              userToken={localStorage.getItem('token')}
            />
          )}
        />

        <Route
          path="/directors/:name"
          render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (
              <DirectorView
                director={
                  movies.find((m) => m.Director.Name === match.params.name)
                    .Director
                }
                movies={movies.filter(
                  (m) => m.Director.Name === match.params.name
                )}
              />
            );
          }}
        />
        <Route
          path="/genres/:name"
          render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (
              <GenreView
                genre={
                  movies.find((m) => m.Genre.Name === match.params.name).Genre
                }
                movies={movies.filter(
                  (m) => m.Genre.Name === match.params.name
                )}
              />
            );
          }}
        />
        <Route
          path="/profile"
          render={() => {
            return (
              <ProfileView
                user={user}
                userToken={localStorage.getItem('token')}
              />
            );
          }}
        />
        <Route
          path="/profile/edit"
          render={() => {
            return (
              <ProfileEditView
                user={user}
                userToken={localStorage.getItem('token')}
              />
            );
          }}
        />
      </Router>
    );
  }
}
