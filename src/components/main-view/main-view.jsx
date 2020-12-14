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
    let user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getUserData(accessToken, user);
    }
  }

  onLoggedIn = (authData) => {
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUserData(authData.token, authData.user.Username);
  };

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

  getUserData(userToken, user) {
    axios
      .get(`https://nikairu-flix-app.herokuapp.com/user/${user}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let userData = response.data[0];
        this.setState({
          user: userData.Username,
          userToken: userToken,
          favoriteMovies: userData.FavoriteMovies,
          email: userData.Email,
          birthday: userData.Birthday,
        });
        this.getMovies(this.state.userToken);
      })
      .catch((e) => {
        this.setState({});
        console.log(e);
        console.log('Error Authenticating');
        localStorage.clear();
      });
  }

  render() {
    const { movies, user } = this.state;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    if (movies.length < 1 && localStorage.getItem('user'))
      return <div className="main-view" />;

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
                  <LoginView onLoggedIn={this.onLoggedIn} />
                </div>
              );

            return (
              <div className="main-view">
                {movies.map((m) => (
                  <MovieCard
                    user={user}
                    userToken={this.state.userToken}
                    key={m._id}
                    movie={m}
                    addFavorite={
                      this.state.favoriteMovies.includes(m._id) ? false : true
                    }
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
              movieId={match.params.movieId}
              user={user}
              userToken={localStorage.getItem('token')}
              addFavorite={
                this.state.favoriteMovies.includes(match.params.movieId)
                  ? false
                  : true
              }
            />
          )}
        />

        <Route
          path="/directors/:name"
          render={({ match }) => {
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
                movies={movies}
              />
            );
          }}
        />
      </Router>
    );
  }
}
