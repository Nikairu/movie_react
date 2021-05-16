"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Card = _interopRequireDefault(require("react-bootstrap/Card"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

var _actions = require("../../actions/actions");

var _reactRouterDom = require("react-router-dom");

require("./movie-card.scss");

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

var MovieCard = /*#__PURE__*/function (_React$Component) {
  _inherits(MovieCard, _React$Component);

  var _super = _createSuper(MovieCard);

  function MovieCard(props) {
    var _this;

    _classCallCheck(this, MovieCard);

    _this = _super.call(this, props);

    _this.addFavorite = function () {
      _this.setState({
        addFavorite: false
      });

      (0, _axios["default"])({
        method: 'post',
        url: "https://nikairu-flix-app.herokuapp.com/users/".concat(_this.state.username, "/Movies/").concat(_this.state.movie._id),
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

    _this.removeFavorite = function () {
      _this.props.updateFavorites(_this.state.movie._id);

      _this.setState({
        removeFavorite: false
      });

      _axios["default"]["delete"]("https://nikairu-flix-app.herokuapp.com/users/".concat(_this.state.username, "/Movies/").concat(_this.state.movie._id), {
        headers: {
          Authorization: "Bearer ".concat(_this.state.userToken)
        }
      }).then(function (response) {
        console.log(response);
      })["catch"](function (e) {
        console.log(e);
        console.log('could not remove favorite');
      });
    };

    var addFavorite = false;

    if (props.addFavorite) {
      addFavorite = true;
    }

    var removeFavorite = false;

    if (props.removeFavorite) {
      removeFavorite = true;
    }

    _this.state = {
      movie: _this.props.movie,
      username: props.user,
      userToken: props.userToken,
      addFavorite: addFavorite,
      removeFavorite: removeFavorite
    };
    return _this;
  }

  _createClass(MovieCard, [{
    key: "render",
    value: function render() {
      var movie = this.props.movie;
      return /*#__PURE__*/_react["default"].createElement(_Card["default"], null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Img, {
        variant: "top",
        src: movie.ImagePath
      }), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, {
        className: "bg-dark"
      }, /*#__PURE__*/_react["default"].createElement("table", {
        className: "main_div"
      }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
        valign: "top"
      }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, movie.Title), /*#__PURE__*/_react["default"].createElement(_Card["default"].Text, null, movie.Description))), /*#__PURE__*/_react["default"].createElement("tr", {
        valign: "bottom",
        className: "button-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        to: "/movies/".concat(movie._id)
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        className: "more-button",
        variant: "primary"
      }, "More")), this.state.addFavorite && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        className: "favorite-button",
        variant: "secondary",
        type: "submit",
        onClick: this.addFavorite
      }, "Add Favorite"), this.state.removeFavorite && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        className: "remove-button",
        variant: "secondary",
        type: "submit",
        onClick: this.removeFavorite
      }, "Remove Favorite")))))));
    }
  }]);

  return MovieCard;
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
  setFavoriteMovies: _actions.setFavoriteMovies
})(MovieCard);

exports["default"] = _default;
MovieCard.propTypes = {
  movie: _propTypes["default"].shape({
    Title: _propTypes["default"].string.isRequired,
    Description: _propTypes["default"].string.isRequired,
    Genre: _propTypes["default"].shape({
      Name: _propTypes["default"].string.isRequired
    }).isRequired,
    Director: _propTypes["default"].shape({
      Name: _propTypes["default"].string.isRequired
    }).isRequired,
    ImagePath: _propTypes["default"].string.isRequired
  }).isRequired
};