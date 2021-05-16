"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegistrationView = RegistrationView;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Alert = _interopRequireDefault(require("react-bootstrap/Alert"));

var _Fade = _interopRequireDefault(require("react-bootstrap/Fade"));

require("./registration-view.scss");

var _backButtonView = require("../back-button-view/back-button-view");

var _axios = _interopRequireDefault(require("axios"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function RegistrationView(props) {
  var history = (0, _reactRouterDom.useHistory)();

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      username = _useState2[0],
      setUsername = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      email = _useState4[0],
      setEmail = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      birthday = _useState6[0],
      setBirthday = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      favoriteMovies = _useState8[0],
      setFavoriteMovies = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = _slicedToArray(_useState9, 2),
      password = _useState10[0],
      setPassword = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      showAlert = _useState12[0],
      setShowAlert = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      errorMessage = _useState14[0],
      setErrorMessage = _useState14[1];

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    _axios["default"].post('https://nikairu-flix-app.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }).then(function (response) {
      var data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })["catch"](function (e) {
      console.log('error registering the user');

      try {
        setErrorMessage(e.response.data.errors[0].msg);
      } catch (err) {
        setErrorMessage(e.response.data);
      }

      setShowAlert(true);
      setTimeout(function () {
        setShowAlert(false);
      }, 3000);
    });
  };

  var cancelRegistration = function cancelRegistration() {
    history.push('/');
  };

  return /*#__PURE__*/_react["default"].createElement("form", {
    className: "registration-form"
  }, /*#__PURE__*/_react["default"].createElement(_Fade["default"], {
    "in": showAlert
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert-container"
  }, /*#__PURE__*/_react["default"].createElement(_Alert["default"], {
    variant: "danger"
  }, errorMessage))), /*#__PURE__*/_react["default"].createElement(_backButtonView.BackButtonView, {
    cancel: cancelRegistration
  }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "formBasicUsername"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Username"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "text",
    placeholder: "Enter username",
    value: username,
    onChange: function onChange(e) {
      return setUsername(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, "(min. length 5)")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "formBasicEmail"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Email"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "email",
    placeholder: "Enter email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, "We'll never share your email with anyone else.")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "formBasicBirthday"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Birthday"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "text",
    placeholder: "MM/DD/YYYY",
    value: birthday,
    onChange: function onChange(e) {
      return setBirthday(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "formBasicPassword"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Password"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "primary",
    type: "submit",
    onClick: handleSubmit
  }, "Register"));
}