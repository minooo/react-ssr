'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\WORK\\react-ssr\\pages\\1-components\\0-02-Btn.js';

exports.default = function (_ref) {
  var ver = _ref.ver,
      hor = _ref.hor,
      btnClass = _ref.btnClass,
      path = _ref.path,
      icoClass = _ref.icoClass,
      con = _ref.con,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['ver', 'hor', 'btnClass', 'path', 'icoClass', 'con']);

  return _react2.default.createElement(_index.WrapLink, (0, _extends3.default)({
    path: path,
    className: (btnClass ? btnClass : '') + ' relative ' + (ver || hor ? 'flex jc-center ai-center' : '') + ' ' + (ver ? 'column' : '') // eslint-disable-line
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), icoClass && _react2.default.createElement('i', { className: icoClass, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), con);
};

/*
* 使用范例
<Btn
    ver
    ink
    btnClass="bg-input r6 h60 equal"
    path="/search"
    icoClass="i-search font30 mr10"
    con={<span class="c999">123</span>}
    onClick={balabala}
/>
*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFwxLWNvbXBvbmVudHNcXDAtMDItQnRuLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiV3JhcExpbmsiLCJ2ZXIiLCJob3IiLCJidG5DbGFzcyIsInBhdGgiLCJpY29DbGFzcyIsImNvbiIsInJlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVMsQUFFVDs7Ozs7O2tCQUFlLGdCQUFBO01BQUEsQUFDYixXQURhLEFBQ2I7TUFEYSxBQUNSLFdBRFEsQUFDUjtNQURRLEFBQ0gsZ0JBREcsQUFDSDtNQURHLEFBQ08sWUFEUCxBQUNPO01BRFAsQUFDYSxnQkFEYixBQUNhO01BRGIsQUFDdUIsV0FEdkIsQUFDdUI7TUFEdkIsQUFDK0IsbUdBRC9COzt5QkFHYixBQUFDO1VBQUQsQUFDUSxBQUNOO2dCQUFjLFdBQUEsQUFBVyxXQUF6QixBQUFvQyxzQkFBZ0IsT0FBRCxBQUFRLE1BQVIsQUFBZSw2QkFBbEUsQUFBK0YsYUFBTSxNQUFBLEFBQU0sV0FGN0csQUFFRSxBQUFzSCxJQUZ4SCxBQUU4SDtBQUQ1SCxLQURGLEFBR007O2dCQUhOO2tCQUFBLEFBS0c7QUFMSDtBQUFBLElBQUEsbURBS2tCLFdBQUgsQUFBYztnQkFBZDtrQkFMZixBQUtlLEFBQ1o7QUFEWTtHQUFBLEdBUkYsQUFHYjtBQUhGOztBQWFBIiwiZmlsZSI6IjAtMDItQnRuLmpzIiwic291cmNlUm9vdCI6IkQ6L1dPUksvcmVhY3Qtc3NyIn0=