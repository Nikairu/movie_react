"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileEditView = ProfileEditView;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Fade = _interopRequireDefault(require("react-bootstrap/Fade"));

require("./profile-edit-view.scss");

var _axios = _interopRequireDefault(require("axios"));

var _reactBootstrap = require("react-bootstrap");

var _Alert = _interopRequireDefault(require("react-bootstrap/Alert"));

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

function ProfileEditView(props) {
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
      password = _useState8[0],
      setPassword = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showAlert = _useState10[0],
      setShowAlert = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      errorMessage = _useState12[0],
      setErrorMessage = _useState12[1];

  function applyChanges(e) {
    e.preventDefault();

    _axios["default"].put("https://nikairu-flix-app.herokuapp.com/users/".concat(props.user), {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: {
        Authorization: "Bearer ".concat(props.userToken)
      }
    }).then(function (response) {
      (0, _actions.setUser)();
      console.log(response);
      window.open('/', '_self');
    })["catch"](function (e) {
      console.log(e);
      setErrorMessage(e.response.data.errors[0].msg);
      setShowAlert(true);
      setTimeout(function () {
        setShowAlert(false);
      }, 3000);
    });
  }

  return /*#__PURE__*/_react["default"].createElement("form", {
    className: "profile-edit-form"
  }, /*#__PURE__*/_react["default"].createElement(_Fade["default"], {
    "in": showAlert
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert-container"
  }, /*#__PURE__*/_react["default"].createElement(_Alert["default"], {
    variant: "danger"
  }, errorMessage))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "formBasicUsername"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "New Username"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
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
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "New Email"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
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
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "New Password"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "login-button",
    variant: "primary",
    type: "submit",
    onClick: applyChanges
  }, "Apply"));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user,
    userToken: state.userToken
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  setUser: _actions.setUser
})(ProfileEditView);

exports["default"] = _default;