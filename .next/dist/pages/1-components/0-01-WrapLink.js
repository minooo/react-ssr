'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next\\dist\\lib\\link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\WORK\\react-ssr\\pages\\1-components\\0-01-WrapLink.js';


// 判断是否为站内路由
var isLink = function isLink(path) {
  return path && (typeof path === 'string' && !path.includes('http') || Object.prototype.toString.call(path) === '[object Object]');
};

// 判断是否为站外链接
var isHref = function isHref(path) {
  return path && typeof path === 'string' && path.includes('http');
};

var _default = function (_PureComponent) {
  (0, _inherits3.default)(_default, _PureComponent);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          clickparams = _this$props.clickparams;

      if (onClick) {
        onClick(clickparams);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(_default, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          path = _props.path,
          children = _props.children,
          className = _props.className,
          as = _props.as,
          style = _props.style,
          rest = (0, _objectWithoutProperties3.default)(_props, ['path', 'children', 'className', 'as', 'style']);

      if (isLink(path)) {
        return _react2.default.createElement(_link2.default, { href: path, as: as, __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          }
        }, _react2.default.createElement('a', (0, _extends3.default)({ className: className, style: style }, rest, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          }
        }), children));
      } else if (isHref(path)) {
        return _react2.default.createElement('a', (0, _extends3.default)({ href: path, className: className, style: style }, rest, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          }
        }), children);
      }
      return _react2.default.createElement('div', {
        onClick: this.onClick,
        tabIndex: '0',
        role: 'button',
        onKeyDown: this.onClick,
        className: className,
        style: style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, children);
    }
  }]);

  return _default;
}(_react.PureComponent);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFwxLWNvbXBvbmVudHNcXDAtMDEtV3JhcExpbmsuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiTGluayIsImlzTGluayIsInBhdGgiLCJpbmNsdWRlcyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImlzSHJlZiIsIm9uQ2xpY2siLCJwcm9wcyIsImNsaWNrcGFyYW1zIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJhcyIsInN0eWxlIiwicmVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTzs7Ozs7Ozs7O0FBRVA7QUFDQSxJQUFNLFNBQVMsU0FBVCxBQUFTLGFBQUE7U0FBUSxTQUNwQixPQUFBLEFBQU8sU0FBUCxBQUFnQixZQUFZLENBQUMsS0FBQSxBQUFLLFNBQW5DLEFBQThCLEFBQWMsV0FDM0MsT0FBQSxBQUFPLFVBQVAsQUFBaUIsU0FBakIsQUFBMEIsS0FBMUIsQUFBK0IsVUFGbkIsQUFBUSxBQUVxQjtBQUY1Qzs7QUFLQTtBQUNBLElBQU0sU0FBUyxTQUFULEFBQVMsYUFBQTtTQUFRLFFBQVMsT0FBQSxBQUFPLFNBQVAsQUFBZ0IsWUFBWSxLQUFBLEFBQUssU0FBbEQsQUFBNkMsQUFBYztBQUExRTs7Ozs7Ozs7Ozs7Ozs7OztnTkFHRSxBLFVBQVUsWUFBTTt3QkFDbUIsTUFEbkIsQUFDd0I7VUFEeEIsQUFDTixzQkFETSxBQUNOO1VBRE0sQUFDRywwQkFESCxBQUNHLEFBQ2pCOztVQUFBLEFBQUksU0FBUyxBQUNYO2dCQUFBLEFBQVEsQUFDVDtBQUNGO0E7Ozs7OzZCQUVRO21CQUdILEtBSEcsQUFHRTtVQUhGLEFBRUwsY0FGSyxBQUVMO1VBRkssQUFFQyxrQkFGRCxBQUVDO1VBRkQsQUFFVyxtQkFGWCxBQUVXO1VBRlgsQUFFc0IsWUFGdEIsQUFFc0I7VUFGdEIsQUFFMEIsZUFGMUIsQUFFMEI7VUFGMUIsQUFFb0MsOEZBRTNDOztVQUFJLE9BQUosQUFBSSxBQUFPLE9BQU8sQUFDaEI7K0JBQU8sQUFBQyxnQ0FBSyxNQUFOLEFBQVksTUFBTSxJQUFsQixBQUFzQjtzQkFBdEI7d0JBQUEsQUFBMEI7QUFBMUI7U0FBQSxrQkFBMEIsY0FBQSw4QkFBRyxXQUFILEFBQWMsV0FBVyxPQUF6QixBQUFnQyxTQUFoQyxBQUEyQzs7c0JBQTNDO3dCQUFBLEFBQWtEO0FBQWxEO0FBQUEsWUFBakMsQUFBTyxBQUEwQixBQUNsQztBQUZELGFBRU8sSUFBSSxPQUFKLEFBQUksQUFBTyxPQUFPLEFBQ3ZCOytCQUFPLGNBQUEsOEJBQUcsTUFBSCxBQUFTLE1BQU0sV0FBZixBQUEwQixXQUFXLE9BQXJDLEFBQTRDLFNBQTVDLEFBQXVEOztzQkFBdkQ7d0JBQUEsQUFBOEQ7QUFBOUQ7QUFBQSxVQUFBLEVBQVAsQUFBTyxBQUNSO0FBQ0Q7NkJBQ0UsY0FBQTtpQkFDVyxLQURYLEFBQ2dCLEFBQ2Q7a0JBRkYsQUFFVyxBQUNUO2NBSEYsQUFHTyxBQUNMO21CQUFXLEtBSmIsQUFJa0IsQUFDaEI7bUJBTEYsQUFLYSxBQUNYO2VBTkYsQUFNUzs7b0JBTlQ7c0JBQUEsQUFRRztBQVJIO0FBQ0UsT0FERixFQURGLEFBQ0UsQUFXSDs7Ozs7QUE3QjBCLEEiLCJmaWxlIjoiMC0wMS1XcmFwTGluay5qcyIsInNvdXJjZVJvb3QiOiJEOi9XT1JLL3JlYWN0LXNzciJ9