'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _carousel = require('antd-mobile/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

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

var _reactRedux = require('react-redux');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _reduxPage = require('../store/reduxPage.js');

var _reduxPage2 = _interopRequireDefault(_reduxPage);

var _index = require('../store/actions/index.js');

var _index2 = require('../utils/index.js');

var _index3 = require('../components/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dec,
    _class,
    _jsxFileName = 'D:\\WORK\\react-ssr\\pages\\index.js?entry';

var util = require('util');

var _default = (_dec = (0, _reactRedux.connect)(function (_ref) {
  var home = _ref.home;
  return { home: home };
}), (0, _reduxPage2.default)(_class = _dec(_class = function (_Component) {
  (0, _inherits3.default)(_default, _Component);

  function _default() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = _default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      messageList: ['136****5422成功贷款2万元', '186****7399成功贷款3万元', '158****0919成功贷款5万元', '151****6655成功贷款3000元']
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(_default, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          home = _props.home,
          err = _props.err;
      var messageList = this.state.messageList;

      if (err) {
        return _react2.default.createElement(_index3.ErrorFetch, { err: err, __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          }
        });
      }
      if (!home) return null;
      return _react2.default.createElement(_index3.Layout, { title: '\u9996\u9875', __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, _react2.default.createElement('div', { className: 'equal relative overflow-y', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, _react2.default.createElement(_index3.Btn, {
        style: {
          position: 'absolute',
          top: '0.2rem',
          right: '0.27rem'
        },
        ver: true,
        btnClass: 'w52 h52 r100 bg-main z-index10',
        href: '/search',
        icoClass: 'i-search font26 c-white',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }), _react2.default.createElement('div', { className: 'relative', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, _react2.default.createElement(_carousel2.default, {
        style: { height: '37.6vw', maxHeight: '3.76rem', borderBottom: '0.04rem solid #f4f4f4' },
        className: 'home-banner',
        autoplay: true,
        dots: false,
        infinite: true,
        selectedIndex: 0,
        speed: 200,
        autoplayInterval: 3000,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, home.tui_loans_banner && home.tui_loans_banner.length > 0 && home.tui_loans_banner.map(function (item) {
        return _react2.default.createElement(_index3.WrapLink, {
          key: (0, _v2.default)(),
          path: '/loan/' + item.id,
          className: 'block h-100',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          }
        }, _react2.default.createElement('img', { src: (0, _index2.imgUrl)(item.banner), className: 'h-100', alt: '\u9996\u9875banner', __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          }
        }));
      })), _react2.default.createElement('div', { className: 'plr20 home-message-box', __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, _react2.default.createElement(_index3.HomeMessage, { list: messageList, __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }))), _react2.default.createElement('div', { className: 'h46 bg-white', __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }), _react2.default.createElement(_index3.HomeLimit, { list: home && home.limits, __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }), _react2.default.createElement(_index3.HomeLoanTypes, { list: home && home.types, __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }), _react2.default.createElement('div', { className: 'plr25 pt20 pb10 lh100 font30 c333 bg-white', __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, '\u70ED\u95E8\u8D37\u6B3E\u63A8\u8350'), home.hot_loans && home.hot_loans.map(function (item, index) {
        return _react2.default.createElement('div', { key: (0, _v2.default)(), __source: {
            fileName: _jsxFileName,
            lineNumber: 104
          }
        }, _react2.default.createElement(_index3.ProductList, (0, _extends3.default)({}, item, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 105
          }
        })), index !== home.hot_loans.length - 1 ? _react2.default.createElement('div', { className: 'h20', __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          }
        }) : null);
      }), _react2.default.createElement(_index3.Btn, {
        hor: true,
        btnClass: 'h80 bg-white border-top row-reverse mb20',
        href: '/1-loan/1-home',
        as: '/loan',
        icoClass: 'i-right font18 c-main',
        con: _react2.default.createElement('span', { className: 'c-main font30 mr10', __source: {
            fileName: _jsxFileName,
            lineNumber: 116
          }
        }, '\u5168\u90E8\u8D37\u6B3E\u4EA7\u54C1'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }), _react2.default.createElement('div', { className: 'plr25 pt20 pb10 lh100 font30 c333 bg-white', __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, '\u70ED\u95E8\u4FE1\u7528\u5361\u63A8\u8350'), home.hot_cards && home.hot_cards.map(function (item, index) {
        return _react2.default.createElement('div', { key: (0, _v2.default)(), __source: {
            fileName: _jsxFileName,
            lineNumber: 122
          }
        }, _react2.default.createElement(_index3.ProductList, (0, _extends3.default)({}, item, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 123
          }
        })), index !== home.hot_cards.length - 1 ? _react2.default.createElement('div', { className: 'h20', __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        }) : null);
      }), _react2.default.createElement(_index3.Btn, {
        hor: true,
        btnClass: 'h80 bg-white border-top row-reverse',
        path: '/card/list',
        icoClass: 'i-right font18 c-main',
        con: _react2.default.createElement('span', { className: 'c-main font30 mr10', __source: {
            fileName: _jsxFileName,
            lineNumber: 133
          }
        }, '\u5168\u90E8\u4FE1\u7528\u5361\u4EA7\u54C1'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }), _react2.default.createElement('div', { className: 'h90 flex column jc-center ai-center', __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        }
      }, _react2.default.createElement('div', { className: 'font24 c-ccc mb10 lh100 home-foot-text', __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        }
      }, '\u561F\u561F\u597D\u4EAB\u8D37\u51FA\u54C1'), _react2.default.createElement('div', { className: 'font20 c-ccc lh100 home-foot-text', __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }, 'DD Finance'))), _react2.default.createElement(_index3.Nav, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var store, pathname, query, asPath, homeFetch, homeData, err;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                store = ctx.store, pathname = ctx.pathname, query = ctx.query, asPath = ctx.asPath;

                if (store.getState().home) {
                  _context.next = 14;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return _index2.http.callApi('home', 'get', {}, ctx);

              case 5:
                homeFetch = _context.sent;
                homeData = homeFetch.data;

                store.dispatch((0, _index.getHome)(homeData));
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](2);
                err = util.inspect(_context.t0);
                return _context.abrupt('return', { err: err });

              case 14:
                return _context.abrupt('return', { pathname: pathname, query: query, asPath: asPath });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function getInitialProps(_x) {
        return _ref3.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return _default;
}(_react.Component)) || _class) || _class);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNvbm5lY3QiLCJ1dWlkIiwicmVkdXhQYWdlIiwiZ2V0SG9tZSIsImltZ1VybCIsImh0dHAiLCJFcnJvckZldGNoIiwiTGF5b3V0IiwiTmF2IiwiQnRuIiwiV3JhcExpbmsiLCJIb21lTWVzc2FnZSIsIkhvbWVMaW1pdCIsIkhvbWVMb2FuVHlwZXMiLCJQcm9kdWN0TGlzdCIsInV0aWwiLCJyZXF1aXJlIiwiaG9tZSIsInN0YXRlIiwibWVzc2FnZUxpc3QiLCJwcm9wcyIsImVyciIsInBvc2l0aW9uIiwidG9wIiwicmlnaHQiLCJoZWlnaHQiLCJtYXhIZWlnaHQiLCJib3JkZXJCb3R0b20iLCJ0dWlfbG9hbnNfYmFubmVyIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsImlkIiwiYmFubmVyIiwibGltaXRzIiwidHlwZXMiLCJob3RfbG9hbnMiLCJpbmRleCIsImhvdF9jYXJkcyIsImN0eCIsInN0b3JlIiwicGF0aG5hbWUiLCJxdWVyeSIsImFzUGF0aCIsImdldFN0YXRlIiwiY2FsbEFwaSIsImhvbWVGZXRjaCIsImhvbWVEYXRhIiwiZGF0YSIsImRpc3BhdGNoIiwiaW5zcGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUVoQixBQUFTOztBQUNULEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFDVCxBQUFTLEFBQVE7O0FBQ2pCLEFBQ0UsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7OztBQUdGLElBQU0sT0FBTixBQUFNLEFBQU87O2dEQUVKLGdCQUFBO01BQUEsQUFBRyxZQUFILEFBQUc7U0FBWSxFQUFFLE1BQWpCLEFBQWU7QUFBdkIsQSxDQUFBLEcsQUFEQTs7Ozs7Ozs7Ozs7Ozs7a04sQUFxQkM7bUJBQ2UsQ0FBQSxBQUFD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O2NBSEYsQUFHTyxBQUNMO1lBSkYsQUFJSyxBQUNIO2tCQUxGLEFBS1csQUFDVDs2QkFBSyxjQUFBLFVBQU0sV0FBTixBQUFnQjtzQkFBaEI7d0JBQUE7QUFBQTtTQUFBLEVBTlAsQUFNTzs7b0JBTlA7c0JBeERGLEFBd0RFLEFBU0E7QUFUQTtBQUNFLDBCQVFGLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUE7QUFBQTtTQWpFRixBQWlFRSxBQUVFLG9EQUFBLEFBQUssa0JBQWEsQUFBSyxVQUFMLEFBQWUsSUFBSSxVQUFBLEFBQUMsTUFBRCxBQUFPLE9BQVA7K0JBQ25DLGNBQUEsU0FBSyxLQUFMLEFBQVU7c0JBQVY7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsQUFBQyw4REFBRCxBQUFpQjs7c0JBQWpCO3dCQURGLEFBQ0UsQUFDQztBQUREO0FBQUEsdUJBQ1csS0FBQSxBQUFLLFVBQUwsQUFBZSxTQUF6QixBQUFrQywyQ0FBUyxXQUFMLEFBQWU7c0JBQWY7d0JBQXRDLEFBQXNDO0FBQUE7U0FBQSxJQUhOLEFBQ25DLEFBRW1FO0FBdEV6RSxBQW1Fc0IsQUFPcEIsT0FQb0IsbUJBT3BCLEFBQUM7YUFBRCxBQUVFO2tCQUZGLEFBRVcsQUFDVDtjQUhGLEFBR08sQUFDTDtrQkFKRixBQUlXLEFBQ1Q7NkJBQUssY0FBQSxVQUFNLFdBQU4sQUFBZ0I7c0JBQWhCO3dCQUFBO0FBQUE7U0FBQSxFQUxQLEFBS087O29CQUxQO3NCQTFFRixBQTBFRSxBQU9BO0FBUEE7QUFDRSwwQkFNRixjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjt5QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBO0FBQUE7U0FERixBQUNFLEFBQ0EsK0RBQUEsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQTtBQUFBO1NBcEZOLEFBQ0UsQUFpRkUsQUFFRSxBQUdKLGlDQUFBLEFBQUM7O29CQUFEO3NCQXhGSixBQUNFLEFBdUZFLEFBR0w7QUFISztBQUFBOzs7Ozs0RyxBQW5IdUI7Ozs7O21CQUV6QjtBLHdCQUNFLEEsSSxBQURGLE9BQU8sQSxXQUNMLEEsSUFESyxBLFUsQUFBVSxRLEFBQ2YsSSxBQURlLE9BQU8sQSxTQUN0QixBLElBRHNCLEE7O29CQUdyQixNQUFBLEFBQU0sV0FBVyxBOzs7Ozs7O3VCQUVNLGFBQUEsQUFBSyxRQUFMLEFBQWEsUUFBYixBQUFxQixPQUFyQixBQUE0QixJQUE1QixBLEFBQWdDOzttQkFBbEQ7QSxxQ0FDQTtBLDJCQUFXLFVBQVUsQSxBQUMzQjs7c0JBQUEsQUFBTSxTQUFTLG9CQUFmLEFBQWUsQUFBUTs7Ozs7O2dEQUVqQjtBLHNCQUFNLEtBQUEsQUFBSyxpQjtpREFDVixFQUFFLEtBQUYsQTs7O2lEQUdKLEVBQUUsVUFBRixVQUFZLE9BQVosT0FBbUIsUUFBbkIsQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWhCa0IsQSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJEOi9XT1JLL3JlYWN0LXNzciJ9