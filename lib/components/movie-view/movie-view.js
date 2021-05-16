"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieView = void 0;

var _react = _interopRequireDefault(require("react"));

var _backButtonView = require("../back-button-view/back-button-view");

require("./movie-view.scss");

var _axios = _interopRequireDefault(require("axios"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactRouterDom = require("react-router-dom");

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

var MovieView = /*#__PURE__*/function (_React$Component) {
  _inherits(MovieView, _React$Component);

  var _super = _createSuper(MovieView);

  function MovieView(props) {
    var _this;

    _classCallCheck(this, MovieView);

    _this = _super.call(this, props);

    _this.addFavorite = function () {
      _this.setState({
        Favoritebutton: false
      });

      (0, _axios["default"])({
        method: 'post',
        url: "https://nikairu-flix-app.herokuapp.com/users/".concat(_this.state.username, "/Movies/").concat(_this.state.movieid),
        headers: {
          Authorization: "Bearer ".concat(_this.state.userToken)
        },
        data: {}
      }).then(function (response) {
        console.log('movie added');
      })["catch"](function (e) {
        console.log(e);
        console.log('movie not added');
      });
    };

    console.log(props);
    var addFavorite = false;

    if (props.addFavorite) {
      addFavorite = true;
    }

    _this.state = {
      movie: _this.props.movie,
      username: _this.props.user,
      userToken: _this.props.userToken,
      movieid: _this.props.movieId,
      Favoritebutton: addFavorite
    };
    return _this;
  }

  _createClass(MovieView, [{
    key: "render",
    value: function render() {
      var movie = this.state.movie;
      if (!movie) return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "movie-view"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: "movie-poster",
        src: movie.ImagePath
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "movie-title"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "label"
      }, "Title: "), /*#__PURE__*/_react["default"].createElement("span", {
        className: "value"
      }, movie.Title)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "movie-description"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "label"
      }, "Description: "), /*#__PURE__*/_react["default"].createElement("span", {
        className: "value"
      }, movie.Description)), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        to: "/directors/".concat(movie.Director.Name)
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "link"
      }, "Director")), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        to: "/genres/".concat(movie.Genre.Name)
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "link"
      }, "Genre")), this.state.Favoritebutton && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        className: "favorite-button",
        variant: "primary",
        type: "submit",
        onClick: this.addFavorite
      }, "Add to Favorites!"));
    }
  }]);

  return MovieView;
}(_react["default"].Component);

exports.MovieView = MovieView;