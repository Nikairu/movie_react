"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _actions = require("../../actions/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function VisibilityFilterInput(props) {
  console.log(props);
  return /*#__PURE__*/_react["default"].createElement(_Form["default"].Control, {
    onChange: function onChange(e) {
      return props.setFilter(e.target.value);
    },
    value: props.visibilityFilter,
    placeholder: "filter"
  });
}

var _default = (0, _reactRedux.connect)(null, {
  setFilter: _actions.setFilter
})(VisibilityFilterInput);

exports["default"] = _default;