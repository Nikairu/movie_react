"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileView = ProfileView;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./profile-view.scss");

var _axios = _interopRequireDefault(require("axios"));

var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));

var _reactBootstrap = require("react-bootstrap");

var _movieCard = _interopRequireDefault(require("../movie-card/movie-card"));

var _profileEditView = require("../profile-edit-view/profile-edit-view");

var _reactRedux = require("react-redux");

var _actions = require("../../actions/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ProfileView(props) {
  console.log(props);

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      username = _useState2[0],
      setUsername = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      email = _useState4[0],
      setEmail = _useState4[1];

  var _useState5 = (0, _react.useState)(new Date()),
      _useState6 = _slicedToArray(_useState5, 2),
      birthday = _useState6[0],
      setBirthday = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      edit = _useState8[0],
      setEdit = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      show = _useState10[0],
      setShow = _useState10[1];

  if (username === '') {
    _axios["default"].get("https://nikairu-flix-app.herokuapp.com/user/".concat(props.user), {
      headers: {
        Authorization: "Bearer ".concat(props.userToken)
      }
    }).then(function (response) {
      console.log('thisloaded');
      var userData = response.data[0];
      setUsername(userData.Username);
      (0, _actions.setUser)(userData.Username);
      setEmail(userData.Email);
      setBirthday(new Date(userData.Birthday));
      props.setFavoriteMovies(userData.FavoriteMovies);
      console.log(userData.FavoriteMovies);
      console.log(props.favoriteMovies);
    })["catch"](function (e) {
      console.log(e);
      console.log('no such user');
    });
  }

  if (username === '') return null;

  function deregister() {
    _axios["default"]["delete"]("https://nikairu-flix-app.herokuapp.com/users/".concat(props.user), {
      headers: {
        Authorization: "Bearer ".concat(props.userToken)
      }
    }).then(function (response) {
      console.log(response);
      localStorage.clear();
      window.open('/', '_self');
    })["catch"](function (e) {
      console.log(e);
      console.log('no such user');
    });
  }

  var favorites = props.movies.filter(function (m) {
    return props.favoriteMovies && props.favoriteMovies.includes(m._id);
  });

  var updateFavorites = function updateFavorites(mov) {
    (0, _actions.setFavoriteMovies)(props.favoriteMovies.filter(function (fm) {
      return fm !== mov;
    }));
  };

  var editUser = function editUser() {
    setEdit(!edit);
  };

  var handleClose = function handleClose() {
    return setShow(false);
  };

  var handleShow = function handleShow() {
    return setShow(true);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "user-view"
  }, /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    show: show,
    onHide: handleClose
  }, /*#__PURE__*/_react["default"].createElement(_Modal["default"].Header, {
    closeButton: true
  }, /*#__PURE__*/_react["default"].createElement(_Modal["default"].Title, {
    className: "text-light"
  }, "Accept Changes")), /*#__PURE__*/_react["default"].createElement(_Modal["default"].Body, {
    className: "text-light"
  }, "Are you sure you want to delete your user data?"), /*#__PURE__*/_react["default"].createElement(_Modal["default"].Footer, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "danger",
    onClick: deregister
  }, "Accept changes"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "text-light",
    variant: "secondary",
    onClick: handleClose
  }, "Close"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "user-data-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "current-data"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "user-name"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "lable"
  }, "Username: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: "value"
  }, username)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "user-email"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "label"
  }, "Email: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: "value"
  }, email)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "user-birthday"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "label"
  }, "Birthday: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: "value"
  }, birthday.getDate() + '/' + birthday.getMonth() + '/' + birthday.getFullYear())), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "edit-button",
    variant: "primary",
    onClick: editUser
  }, "Edit"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "deregister-button",
    variant: "secondary",
    type: "submit",
    onClick: handleShow
  }, "Delete account")), edit && /*#__PURE__*/_react["default"].createElement(_profileEditView.ProfileEditView, {
    user: props.user,
    userToken: props.userToken
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "label"
  }, "Favorite Movies: "), /*#__PURE__*/_react["default"].createElement("div", {
    className: "favorite-movies"
  }, favorites.map(function (m) {
    return /*#__PURE__*/_react["default"].createElement(_movieCard["default"], {
      user: props.user,
      userToken: props.userToken,
      key: m._id,
      movie: m,
      removeFavorite: true,
      updateFavorites: updateFavorites
    });
  })));
}

var mapStateToProps = function mapStateToProps(state) {
  console.log(state);
  return {
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setUser: _actions.setUser,
  setFavoriteMovies: _actions.setFavoriteMovies
})(ProfileView);

exports["default"] = _default;