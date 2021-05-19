"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("./nav-view.scss");

var _reactBootstrap = require("react-bootstrap");

var _reactRouterDom = require("react-router-dom");

var _visibilityFilterInput = _interopRequireDefault(require("../visibility-filter-input/visibility-filter-input"));

var _reactRedux = require("react-redux");

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

var NavView = /*#__PURE__*/function (_React$Component) {
  _inherits(NavView, _React$Component);

  var _super = _createSuper(NavView);

  function NavView() {
    var _this;

    _classCallCheck(this, NavView);

    _this = _super.call(this);

    _this.logout = function () {
      localStorage.clear();
      window.open('/', '_self');
    };

    _this.state = {};
    return _this;
  }

  _createClass(NavView, [{
    key: "render",
    value: function render() {
      var user = this.props.user;
      if (!user) return null;
      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar, {
        collapseOnSelect: true,
        expand: "lg",
        bg: "dark",
        variant: "dark"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar.Brand, {
        href: "/"
      }, "My-Flix"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar.Toggle, {
        "aria-controls": "responsive-navbar-nav"
      }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar.Collapse, {
        id: "responsive-navbar-nav"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, {
        className: "mr-auto"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
        href: "#"
      }, "Features"), /*#__PURE__*/_react["default"].createElement(_visibilityFilterInput["default"], null)), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        className: "profile-button btn btn-primary",
        to: "/profile"
      }, "Profile")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        className: "logout-button",
        variant: "outline-danger",
        onClick: this.logout
      }, "logout"))));
    }
  }]);

  return NavView;
}(_react["default"].Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(NavView);

exports["default"] = _default;