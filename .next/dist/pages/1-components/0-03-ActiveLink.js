'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('next\\dist\\lib\\router\\index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\WORK\\react-ssr\\pages\\1-components\\0-03-ActiveLink.js';


// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

var ActiveLink = function ActiveLink(_ref) {
  var ico = _ref.ico,
      text = _ref.text,
      router = _ref.router,
      href = _ref.href;

  var handleClick = function handleClick(e) {
    e.preventDefault();
    router.push(href);
  };

  return _react2.default.createElement('a', {
    href: href,
    onClick: handleClick,
    className: 'equal flex column jc-center ai-center ' + (router.pathname === href ? 'c-main' : 'c-ccc'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement('i', { className: ico + ' font44 mb10', __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }), _react2.default.createElement('span', { className: 'font26 lh100', __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, text));
};

exports.default = (0, _index.withRouter)(ActiveLink);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFwxLWNvbXBvbmVudHNcXDAtMDMtQWN0aXZlTGluay5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIndpdGhSb3V0ZXIiLCJBY3RpdmVMaW5rIiwiaWNvIiwidGV4dCIsInJvdXRlciIsImhyZWYiLCJoYW5kbGVDbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInB1c2giLCJwYXRobmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVM7Ozs7Ozs7QUFFVDtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxhQUFhLFNBQWIsQUFBYSxpQkFFYjtNQURKLEFBQ0ksV0FESixBQUNJO01BREMsQUFDRCxZQURDLEFBQ0Q7TUFETyxBQUNQLGNBRE8sQUFDUDtNQURlLEFBQ2YsWUFEZSxBQUNmLEFBQ0o7O01BQU0sY0FBYyxTQUFkLEFBQWMsWUFBQSxBQUFDLEdBQU0sQUFDekI7TUFBQSxBQUFFLEFBQ0Y7V0FBQSxBQUFPLEtBQVAsQUFBWSxBQUNiO0FBSEQsQUFLQTs7eUJBQ0UsY0FBQTtVQUFBLEFBQ1EsQUFDTjthQUZGLEFBRVcsQUFDVDsyREFBb0QsT0FBQSxBQUFPLGFBQVAsQUFBb0IsT0FBcEIsQUFBMkIsV0FIakYsQUFHRSxBQUEwRjs7Z0JBSDVGO2tCQUFBLEFBS0U7QUFMRjtBQUNFLEdBREYsdUNBS0ssV0FBQSxBQUFjLE1BQWpCO2dCQUFBO2tCQUxGLEFBS0UsQUFDQTtBQURBO3NCQUNBLGNBQUEsVUFBTSxXQUFOLEFBQWdCO2dCQUFoQjtrQkFBQSxBQUFnQztBQUFoQztLQVBKLEFBQ0UsQUFNRSxBQUdMO0FBbEJELEFBb0JBOztrQkFBZSx1QkFBZixBQUFlLEFBQVciLCJmaWxlIjoiMC0wMy1BY3RpdmVMaW5rLmpzIiwic291cmNlUm9vdCI6IkQ6L1dPUksvcmVhY3Qtc3NyIn0=