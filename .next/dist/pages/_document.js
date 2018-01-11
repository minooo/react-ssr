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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\WORK\\react-ssr\\pages\\_document.js?entry';


var dev = process.env.NODE_ENV !== 'production';
var path = dev ? '' : 'http://public.duduapp.net/finance/static';

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
      }), _react2.default.createElement('link', { rel: 'stylesheet', href: path + '/static/styles/antd_mobile_min.css', __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }), _react2.default.createElement('link', { rel: 'stylesheet', href: path + '/static/styles/app_min.css?1', __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }), _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, '\u561F\u561F\u91D1\u878D')), _react2.default.createElement('body', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, this.props.customValue, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }), _react2.default.createElement('script', { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }), _react2.default.createElement('script', { src: path + '/static/scripts/hd.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }), _react2.default.createElement('script', { src: path + '/static/scripts/local-storage.js', __source: {
          fileName: _jsxFileName,
          lineNumber: 31
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

      return {
        html: html, head: head, errorHtml: errorHtml, chunks: chunks
      };
    }
  }]);

  return MyDocument;
}(_document2.default);

exports.default = MyDocument;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxfZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJkZXYiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwYXRoIiwiTXlEb2N1bWVudCIsInByb3BzIiwiY3VzdG9tVmFsdWUiLCJyZW5kZXJQYWdlIiwiaHRtbCIsImhlYWQiLCJlcnJvckh0bWwiLCJjaHVua3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVksQUFBTSxBQUFNOzs7Ozs7Ozs7QUFFL0IsSUFBTSxNQUFNLFFBQUEsQUFBUSxJQUFSLEFBQVksYUFBeEIsQUFBcUM7QUFDckMsSUFBTSxPQUFPLE1BQUEsQUFBTSxLQUFuQixBQUF3Qjs7SUFFSCxBOzs7Ozs7Ozs7Ozs2QkFVVixBQUNQOzZCQUNFLGNBQUEsVUFBTSxNQUFOLEFBQVc7b0JBQVg7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsaURBQ1EsU0FBTixBQUFjO29CQUFkO3NCQURGLEFBQ0UsQUFDQTtBQURBO2tEQUNNLEtBQU4sQUFBVSxjQUFhLE1BQUEsQUFBUyxPQUFoQztvQkFBQTtzQkFGRixBQUVFLEFBQ0E7QUFEQTtrREFDTSxLQUFOLEFBQVUsY0FBYSxNQUFBLEFBQVMsT0FBaEM7b0JBQUE7c0JBSEYsQUFHRSxBQUNBO0FBREE7MEJBQ0EsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBTEosQUFDRSxBQUlFLEFBRUYsOENBQUEsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRztBQURIO0FBQUEsY0FDRyxBQUFLLE1BRFIsQUFDYyxBQUNaLDZCQUFBLEFBQUM7O29CQUFEO3NCQUZGLEFBRUUsQUFDQTtBQURBO0FBQUEsMEJBQ0EsQUFBQzs7b0JBQUQ7c0JBSEYsQUFHRSxBQUNBO0FBREE7QUFBQSxvREFDUSxLQUFSLEFBQVk7b0JBQVo7c0JBSkYsQUFJRSxBQUNBO0FBREE7b0RBQ1EsS0FBQSxBQUFRLE9BQWhCO29CQUFBO3NCQUxGLEFBS0UsQUFDQTtBQURBO29EQUNRLEtBQUEsQUFBUSxPQUFoQjtvQkFBQTtzQkFkTixBQUNFLEFBT0UsQUFNRSxBQUlQO0FBSk87Ozs7OzBDQXhCK0I7VUFBZCxBQUFjLGtCQUFkLEFBQWM7O3dCQUFBLEFBR2pDO1VBSGlDLEFBRW5DLG1CQUZtQyxBQUVuQztVQUZtQyxBQUU3QixtQkFGNkIsQUFFN0I7VUFGNkIsQUFFdkIsd0JBRnVCLEFBRXZCO1VBRnVCLEFBRVoscUJBRlksQUFFWixBQUV6Qjs7O2NBQU8sTUFDQyxNQURELE1BQ08sV0FEUCxXQUNrQixRQUR6QixBQUFPLEFBR1I7QUFIUSxBQUNMOzs7OztBQU5rQyxBOztrQkFBbkIsQSIsImZpbGUiOiJfZG9jdW1lbnQuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDovV09SSy9yZWFjdC1zc3IifQ==