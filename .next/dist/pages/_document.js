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

var pro = process.env.NODE_ENV === 'production';
var test = process.env.NODE_TEST === 'test';
var path = pro ? test ? '' : 'http://public.duduapp.net/finance/static' : '';

var MyDocument = function (_Document) {
  (0, _inherits3.default)(MyDocument, _Document);

  function MyDocument() {
    (0, _classCallCheck3.default)(this, MyDocument);

    return (0, _possibleConstructorReturn3.default)(this, (MyDocument.__proto__ || (0, _getPrototypeOf2.default)(MyDocument)).apply(this, arguments));
  }

  (0, _createClass3.default)(MyDocument, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('html', { lang: 'en' }, _react2.default.createElement(_document.Head, null, _react2.default.createElement('meta', { charSet: 'utf-8' }), _react2.default.createElement('meta', { name: 'version', content: '1.0.0' }), _react2.default.createElement('link', { rel: 'stylesheet', href: path + '/static/styles/antd_mobile_min.css' }), _react2.default.createElement('link', { rel: 'stylesheet', href: path + '/static/styles/app_min.css?7' }), _react2.default.createElement('title', null, '\u561F\u561Fe\u8D37')), _react2.default.createElement('body', null, this.props.customValue, _react2.default.createElement(_document.Main, null), _react2.default.createElement(_document.NextScript, null), _react2.default.createElement('script', { src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js' }), _react2.default.createElement('script', { src: path + '/static/scripts/hd.js' }), _react2.default.createElement('script', { src: path + '/static/scripts/local-storage.js' })));
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