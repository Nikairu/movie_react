"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

require("./movies-list.scss");

var _movieCard = _interopRequireDefault(require("../movie-card/movie-card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MoviesList(props) {
  var movies = props.movies,
      visibilityFilter = props.visibilityFilter;
  var filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(function (m) {
      return m.Title.toUpperCase().includes(visibilityFilter.toUpperCase());
    });
  }

  if (!movies) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "main-view"
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "main-view"
  }, filteredMovies.map(function (m) {
    return /*#__PURE__*/_react["default"].createElement(_movieCard["default"], {
      user: props.user,
      userToken: props.userToken,
      key: m._id,
      movie: m,
      addFavorite: props.favoriteMovies.includes(m._id) ? false : true
    });
  }));
}

var mapStateToProps = function mapStateToProps(state) {
  var visibilityFilter = state.visibilityFilter;
  return {
    visibilityFilter: visibilityFilter
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(MoviesList);

exports["default"] = _default;