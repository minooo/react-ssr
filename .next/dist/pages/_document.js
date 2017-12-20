'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _document = require('next\\dist\\server\\document.js');

var _document2 = _interopRequireDefault(_document);

var _server = require('styled-jsx/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\WORK\\react-ssr\\pages\\_document.js?entry';


var MyDocument = function (_Document) {
  (0, _inherits3.default)(MyDocument, _Document);

  function MyDocument() {
    (0, _classCallCheck3.default)(this, MyDocument);

    return (0, _possibleConstructorReturn3.default)(this, (MyDocument.__proto__ || (0, _getPrototypeOf2.default)(MyDocument)).apply(this, arguments));
  }

  (0, _createClass3.default)(MyDocument, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('html', { lang: 'en', __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, _react2.default.createElement(_document.Head, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, _react2.default.createElement('meta', { charSet: 'utf-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }), _react2.default.createElement('script', { src: 'https://cdn.bootcss.com/moment.js/2.17.1/moment.min.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }), _react2.default.createElement('script', { src: 'https://cdn.bootcss.com/moment.js/2.17.1/locale/zh-cn.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }), _react2.default.createElement('script', { src: 'https://cdn.bootcss.com/node-uuid/1.4.8/uuid.min.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }), _react2.default.createElement('script', { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }), _react2.default.createElement('script', { src: '/static/scripts/hd.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }), _react2.default.createElement('script', { src: '/static/scripts/local-storage.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }), _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/styles/antd_mobile_min.css', __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }), _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/styles/app_min.css', __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      })), _react2.default.createElement('body', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, this.props.customValue, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      })));
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var renderPage = _ref.renderPage;

      var _renderPage = renderPage(),
          html = _renderPage.html,
          head = _renderPage.head,
          errorHtml = _renderPage.errorHtml,
          chunks = _renderPage.chunks;

      var styles = (0, _server2.default)();
      return {
        html: html, head: head, errorHtml: errorHtml, chunks: chunks, styles: styles
      };
    }
  }]);

  return MyDocument;
}(_document2.default);

exports.default = MyDocument;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxfZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJEb2N1bWVudCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsImZsdXNoIiwiTXlEb2N1bWVudCIsInByb3BzIiwiY3VzdG9tVmFsdWUiLCJyZW5kZXJQYWdlIiwiaHRtbCIsImhlYWQiLCJlcnJvckh0bWwiLCJjaHVua3MiLCJzdHlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPLEFBQVksQUFBTSxBQUFNOzs7O0FBQy9CLEFBQU87Ozs7Ozs7OztJQUVjLEE7Ozs7Ozs7Ozs7OzZCQVdWLEFBQ1A7NkJBQ0UsY0FBQSxVQUFNLE1BQU4sQUFBVztvQkFBWDtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSxpREFDUSxTQUFOLEFBQWM7b0JBQWQ7c0JBREYsQUFDRSxBQUNBO0FBREE7b0RBQ1EsS0FBUixBQUFZO29CQUFaO3NCQUZGLEFBRUUsQUFDQTtBQURBO29EQUNRLEtBQVIsQUFBWTtvQkFBWjtzQkFIRixBQUdFLEFBQ0E7QUFEQTtvREFDUSxLQUFSLEFBQVk7b0JBQVo7c0JBSkYsQUFJRSxBQUNBO0FBREE7b0RBQ1EsS0FBUixBQUFZO29CQUFaO3NCQUxGLEFBS0UsQUFDQTtBQURBO29EQUNRLEtBQVIsQUFBWTtvQkFBWjtzQkFORixBQU1FLEFBQ0E7QUFEQTtvREFDUSxLQUFSLEFBQVk7b0JBQVo7c0JBUEYsQUFPRSxBQUNBO0FBREE7a0RBQ00sS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEI7b0JBQTVCO3NCQVJGLEFBUUUsQUFDQTtBQURBO2tEQUNNLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCO29CQUE1QjtzQkFWSixBQUNFLEFBU0UsQUFFRjtBQUZFOzJCQUVGLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGNBQ0csQUFBSyxNQURSLEFBQ2MsQUFDWiw2QkFBQSxBQUFDOztvQkFBRDtzQkFGRixBQUVFLEFBQ0E7QUFEQTtBQUFBLDBCQUNBLEFBQUM7O29CQUFEO3NCQWhCTixBQUNFLEFBWUUsQUFHRSxBQUlQO0FBSk87QUFBQTs7OzswQ0EzQitCO1VBQWQsQUFBYyxrQkFBZCxBQUFjOzt3QkFBQSxBQUdqQztVQUhpQyxBQUVuQyxtQkFGbUMsQUFFbkM7VUFGbUMsQUFFN0IsbUJBRjZCLEFBRTdCO1VBRjZCLEFBRXZCLHdCQUZ1QixBQUV2QjtVQUZ1QixBQUVaLHFCQUZZLEFBRVosQUFFekI7O1VBQU0sU0FBTixBQUFlLEFBQ2Y7O2NBQU8sTUFDQyxNQURELE1BQ08sV0FEUCxXQUNrQixRQURsQixRQUMwQixRQURqQyxBQUFPLEFBR1I7QUFIUSxBQUNMOzs7OztBQVBrQyxBOztrQkFBbkIsQSIsImZpbGUiOiJfZG9jdW1lbnQuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDovV09SSy9yZWFjdC1zc3IifQ==