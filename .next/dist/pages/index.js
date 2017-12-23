'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _reduxPage = require('../store/reduxPage.js');

var _reduxPage2 = _interopRequireDefault(_reduxPage);

var _index = require('../components/index.js');

var _index2 = require('../store/actions/index.js');

var _index3 = require('../utils/index.js');

var _tryHome = require('../tryHome');

var _tryHome2 = _interopRequireDefault(_tryHome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'E:\\VS_NODE\\react-ssr\\pages\\index.js?entry';

var util = require('util');

var HH = function (_Component) {
  (0, _inherits3.default)(HH, _Component);

  function HH() {
    (0, _classCallCheck3.default)(this, HH);

    return (0, _possibleConstructorReturn3.default)(this, (HH.__proto__ || (0, _getPrototypeOf2.default)(HH)).apply(this, arguments));
  }

  (0, _createClass3.default)(HH, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.props, 'pageDid');
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.data) {
        return _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          }
        }, '123', console.log(this.props.err));
      }
      return _react2.default.createElement(_tryHome2.default, (0, _extends3.default)({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var store, res, data, err;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                store = ctx.store;
                // if (!store.getState().fetchOnce) {
                //   store.dispatch(fetchOnce())
                //   store.dispatch(getHome(ctx))
                // }
                // setTimeout(() => {
                //   return { homea: 'homepppp11' }
                // },2000)
                // const res = await http.callApi('home1', 'get', {}, ctx)
                // if (!res.data && ctx.res) {
                //   ctx.res.statusCode = 404
                // }
                // return { data: res.data }


                // const data = await http.callApi('home1', 'get', {}, ctx)
                // if ((!data || !data.data) && ctx && ctx.res) ctx.res.statusCode = 404
                // ctx.res.end('11')
                // return { data: data.data }

                _context.prev = 1;
                _context.next = 4;
                return _index3.http.callApi('home', 'get', {}, ctx);

              case 4:
                res = _context.sent;
                data = res.data;
                return _context.abrupt('return', { data: data });

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](1);

                // ctx.res.statusCode = 404
                // ctx.res.end('Not found')
                err = util.inspect(_context.t0);
                return _context.abrupt('return', { err: err });

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return HH;
}(_react.Component);

exports.default = (0, _nextReduxWrapper2.default)(_reduxPage2.default, function (state) {
  return { home: state.home };
})(HH);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIndpdGhSZWR1eCIsInJlZHV4UGFnZSIsIkVycm9yIiwiZ2V0SG9tZSIsImZldGNoT25jZSIsImh0dHAiLCJIb21lIiwidXRpbCIsInJlcXVpcmUiLCJISCIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsImRhdGEiLCJlcnIiLCJjdHgiLCJzdG9yZSIsImNhbGxBcGkiLCJyZXMiLCJpbnNwZWN0IiwiaG9tZSIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVM7O0FBQ1QsQUFBUyxBQUFTOztBQUNsQixBQUFTOztBQUNULEFBQU87Ozs7Ozs7O0FBQ1AsSUFBTSxPQUFOLEFBQU0sQUFBTzs7SUFFUCxBOzs7Ozs7Ozs7Ozt3Q0FrQ2dCLEFBQ2xCO2NBQUEsQUFBUSxJQUFJLEtBQVosQUFBaUIsT0FBakIsQUFBd0IsQUFDekI7Ozs7NkJBRVEsQUFDUDtVQUFJLENBQUMsS0FBQSxBQUFLLE1BQVYsQUFBZ0IsTUFBTSxBQUNwQjsrQkFBTyxjQUFBOztzQkFBQTt3QkFBQTtBQUFBO0FBQUEsU0FBQSxFQUFTLGVBQUEsQUFBUSxJQUFJLEtBQUEsQUFBSyxNQUFqQyxBQUFPLEFBQVMsQUFBdUIsQUFDeEM7QUFDRDs2QkFDRSxBQUFDLDREQUFTLEtBQVYsQUFBZTs7b0JBQWY7c0JBREYsQUFDRSxBQUVIO0FBRkc7QUFBQSxRQUFBOzs7OzsyR0ExQ3lCLEE7Ozs7O21CQUNuQjtBLHdCQUFVLEEsSUFBVixBLEFBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7OztBQUNBO0FBQ0E7QUFDQTs7Ozs7dUJBR29CLGFBQUEsQUFBSyxRQUFMLEFBQWEsUUFBYixBQUFxQixPQUFyQixBQUE0QixJQUE1QixBQUFnQyxBOzttQkFBNUM7QSwrQkFDQTtBLHVCQUFPLElBQUksQTtpREFDVixFQUFFLE1BQUYsQTs7OztnREFFUDs7QUFDQTtBQUNNO0Esc0JBQU0sS0FBQSxBQUFLLGlCO2lEQUNWLEVBQUUsS0FBRixBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOUJJLEFBZ0RqQixBOzt1RUFBb0MsaUJBQUE7U0FBVSxFQUFFLE1BQU0sTUFBbEIsQUFBVSxBQUFjO0FBQTdDLENBQUEsQUFBVSxFQUF6QixBQUFlLEFBQXNEIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6IkU6L1ZTX05PREUvcmVhY3Qtc3NyIn0=