"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _actions = require("../actions/actions");

function visibilityFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SET_FILTER:
      return action.value;

    default:
      return state;
  }
}

function movies() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SET_MOVIES:
      return action.value;

    default:
      return state;
  }
}

function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SET_USER:
      return action.value;

    default:
      return state;
  }
}

function userToken() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SET_USERTOKEN:
      return action.value;

    default:
      return state;
  }
}

function favoriteMovies() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SET_FAVORITEMOVIES:
      return action.value;

    default:
      return state;
  }
}

var moviesApp = (0, _redux.combineReducers)({
  visibilityFilter: visibilityFilter,
  movies: movies,
  user: user,
  userToken: userToken,
  favoriteMovies: favoriteMovies
});
var _default = moviesApp;
exports["default"] = _default;