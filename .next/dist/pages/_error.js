'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../components/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement('div', { className: 'flex column ai-center jc-center plr25 ptb20 h-full' }, _react2.default.createElement(_icon2.default, { type: 'cross-circle-o', className: 'w100 h100', style: { fill: '#F13642' } }), _react2.default.createElement('div', { className: 'font32 c333 ptb20' }, '404'), _react2.default.createElement('div', { className: 'font28 c999' }, '\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728\uFF0C\u8BF7 ', _react2.default.createElement(_index.WrapLink, { href: '/', className: 'font30 c-main' }, '\u8FD4\u56DE\u9996\u9875')));
};