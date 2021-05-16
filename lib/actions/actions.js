"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMovies = setMovies;
exports.setFilter = setFilter;
exports.setUser = setUser;
exports.setUserToken = setUserToken;
exports.setFavoriteMovies = setFavoriteMovies;
exports.SET_FAVORITEMOVIES = exports.SET_USERTOKEN = exports.SET_USER = exports.SET_FILTER = exports.SET_MOVIES = void 0;
var SET_MOVIES = 'SET_MOVIES';
exports.SET_MOVIES = SET_MOVIES;
var SET_FILTER = 'SET_FILTER';
exports.SET_FILTER = SET_FILTER;
var SET_USER = 'SET_USER';
exports.SET_USER = SET_USER;
var SET_USERTOKEN = 'SET_USERTOKEN';
exports.SET_USERTOKEN = SET_USERTOKEN;
var SET_FAVORITEMOVIES = 'SET_FAVORITEMOVIES';
exports.SET_FAVORITEMOVIES = SET_FAVORITEMOVIES;

function setMovies(value) {
  return {
    type: SET_MOVIES,
    value: value
  };
}

function setFilter(value) {
  return {
    type: SET_FILTER,
    value: value
  };
}

function setUser(value) {
  return {
    type: SET_USER,
    value: value
  };
}

function setUserToken(value) {
  return {
    type: SET_USERTOKEN,
    value: value
  };
}

function setFavoriteMovies(value) {
  return {
    type: SET_FAVORITEMOVIES,
    value: value
  };
}