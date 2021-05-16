"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("../../actions/actions");

var _moviesList = _interopRequireDefault(require("../movies-list/movies-list"));

var _movieView = require("../movie-view/movie-view");

var _loginView = require("../login-view/login-view");

var _registrationView = require("../registration-view/registration-view");

var _directorView = require("../director-view/director-view");

var _genreView = require("../genre-view/genre-view");

var _profileView = _interopRequireDefault(require("../profile-view/profile-view"));

var _navView = _interopRequireDefault(require("../nav-view/nav-view"));

require("./main-view.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MainView = /*#__PURE__*/function (_React$Component) {
  _inherits(MainView, _React$Component);

  var _super = _createSuper(MainView);

  function MainView() {
    var _this;

    _classCallCheck(this, MainView);

    _this = _super.call(this);

    _this.onLoggedIn = function (authData) {
      _this.props.setUser(authData.user.Username);

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);

      _this.getUserData(authData.token, authData.user.Username);
    };

    _this.state = {
      movies: [],
      user: null,
      register: null,
      favoriteMovies: []
    };
    return _this;
  }

  _createClass(MainView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var accessToken = localStorage.getItem('token');
      var user = localStorage.getItem('user');

      if (accessToken !== null) {
        /* this.setState({
          user: localStorage.getItem('user'),
        }); */
        this.props.setUser(localStorage.getItem('user'));
        this.getUserData(accessToken, user);
      }
    }
  }, {
    key: "getMovies",
    value: function getMovies(token) {
      var _this2 = this;

      _axios["default"].get('https://nikairu-flix-app.herokuapp.com/movies', {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      }).then(function (response) {
        // Assign the result to the state
        _this2.props.setMovies(response.data);
      })["catch"](function (error) {
        console.log(error);
        localStorage.clear();
        this.props.setUser(null);
      });
    }
  }, {
    key: "getUserData",
    value: function getUserData(userToken, user) {
      var _this3 = this;

      _axios["default"].get("https://nikairu-flix-app.herokuapp.com/user/".concat(user), {
        headers: {
          Authorization: "Bearer ".concat(userToken)
        }
      }).then(function (response) {
        _this3.getMovies(userToken);

        var userData = response.data[0];

        _this3.props.setUser(userData.Username);

        _this3.props.setUserToken(userToken);

        _this3.props.setFavoriteMovies(userData.FavoriteMovies);

        _this3.props.setUser(userData.Username);
      })["catch"](function (e) {
        _this3.props.setUser(null);

        console.log(e);
        console.log('Error Authenticating');
        localStorage.clear();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          movies = _this$props.movies,
          user = _this$props.user;
      /* let { user } = this.state; */
      // Before the movies have been loaded

      /*     if (movies.length < 1 && localStorage.getItem('user'))
        return <div className="main-view" />; */

      return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_navView["default"], null), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/",
        render: function render() {
          //no user logged in
          if (!user) return /*#__PURE__*/_react["default"].createElement("div", {
            className: "main-container"
          }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
            className: "welcome-banner"
          }, "Welcome to Myflix")), /*#__PURE__*/_react["default"].createElement(_loginView.LoginView, {
            onLoggedIn: _this4.onLoggedIn
          }));
          return /*#__PURE__*/_react["default"].createElement(_moviesList["default"], {
            movies: movies,
            user: user,
            userToken: _this4.props.userToken,
            favoriteMovies: _this4.props.favoriteMovies
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/register",
        render: function render() {
          return /*#__PURE__*/_react["default"].createElement(_registrationView.RegistrationView, null);
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/movies/:movieId",
        render: function render(_ref) {
          var match = _ref.match;
          return movies.length > 0 && /*#__PURE__*/_react["default"].createElement(_movieView.MovieView, {
            movie: movies.find(function (m) {
              return m._id === match.params.movieId;
            }),
            movieId: match.params.movieId,
            user: user,
            userToken: localStorage.getItem('token'),
            addFavorite: _this4.props.favoriteMovies.includes(match.params.movieId) ? false : true
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/directors/:name",
        render: function render(_ref2) {
          var match = _ref2.match;
          return /*#__PURE__*/_react["default"].createElement(_directorView.DirectorView, {
            director: movies.find(function (m) {
              return m.Director.Name === match.params.name;
            }).Director,
            movies: movies.filter(function (m) {
              return m.Director.Name === match.params.name;
            })
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/genres/:name",
        render: function render(_ref3) {
          var match = _ref3.match;
          if (!movies) return /*#__PURE__*/_react["default"].createElement("div", {
            className: "main-view"
          });
          return /*#__PURE__*/_react["default"].createElement(_genreView.GenreView, {
            genre: movies.find(function (m) {
              return m.Genre.Name === match.params.name;
            }).Genre,
            movies: movies.filter(function (m) {
              return m.Genre.Name === match.params.name;
            })
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/profile",
        render: function render() {
          return /*#__PURE__*/_react["default"].createElement(_profileView["default"], null);
        }
      }));
    }
  }]);

  return MainView;
}(_react["default"].Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setMovies: _actions.setMovies,
  setUser: _actions.setUser,
  setUserToken: _actions.setUserToken,
  setFavoriteMovies: _actions.setFavoriteMovies
})(MainView);

exports["default"] = _default;