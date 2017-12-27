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
            lineNumber: 50
          }
        });
      }
      if (!home) return null;
      return _react2.default.createElement(_index3.Layout, { title: '\u9996\u9875', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, _react2.default.createElement('div', { className: 'equal relative overflow-y', __source: {
          fileName: _jsxFileName,
          lineNumber: 55
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
          lineNumber: 56
        }
      }), _react2.default.createElement('div', { className: 'relative', __source: {
          fileName: _jsxFileName,
          lineNumber: 67
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
          lineNumber: 69
        }
      }, home.tui_loans_banner && home.tui_loans_banner.length > 0 && home.tui_loans_banner.map(function (item) {
        return _react2.default.createElement(_index3.WrapLink, {
          key: (0, _v2.default)(),
          href: '/1-loan/2-detail',
          as: '/loan/' + item.id,
          className: 'block h-100',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        }, _react2.default.createElement('img', { src: (0, _index2.imgUrl)(item.banner), className: 'h-100', alt: '\u9996\u9875banner', __source: {
            fileName: _jsxFileName,
            lineNumber: 87
          }
        }));
      })), _react2.default.createElement('div', { className: 'plr20 home-message-box', __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, _react2.default.createElement(_index3.HomeMessage, { list: messageList, __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }))), _react2.default.createElement('div', { className: 'h46 bg-white', __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }), _react2.default.createElement(_index3.HomeLimit, { list: home && home.limits, __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }), _react2.default.createElement(_index3.HomeLoanTypes, { list: home && home.types, __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }), _react2.default.createElement('div', { className: 'plr25 pt20 pb10 lh100 font30 c333 bg-white', __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }, '\u70ED\u95E8\u8D37\u6B3E\u63A8\u8350'), home.hot_loans && home.hot_loans.map(function (item, index) {
        return _react2.default.createElement('div', { key: (0, _v2.default)(), __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          }
        }, _react2.default.createElement(_index3.ProductList, (0, _extends3.default)({}, item, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          }
        })), index !== home.hot_loans.length - 1 ? _react2.default.createElement('div', { className: 'h20', __source: {
            fileName: _jsxFileName,
            lineNumber: 108
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
            lineNumber: 118
          }
        }, '\u5168\u90E8\u8D37\u6B3E\u4EA7\u54C1'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }), _react2.default.createElement('div', { className: 'plr25 pt20 pb10 lh100 font30 c333 bg-white', __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, '\u70ED\u95E8\u4FE1\u7528\u5361\u63A8\u8350'), home.hot_cards && home.hot_cards.map(function (item, index) {
        return _react2.default.createElement('div', { key: (0, _v2.default)(), __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        }, _react2.default.createElement(_index3.ProductList, (0, _extends3.default)({}, item, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          }
        })), index !== home.hot_cards.length - 1 ? _react2.default.createElement('div', { className: 'h20', __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          }
        }) : null);
      }), _react2.default.createElement(_index3.Btn, {
        hor: true,
        btnClass: 'h80 bg-white border-top row-reverse',
        href: '/2-card/2-list',
        as: '/card/list',
        icoClass: 'i-right font18 c-main',
        con: _react2.default.createElement('span', { className: 'c-main font30 mr10', __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          }
        }, '\u5168\u90E8\u4FE1\u7528\u5361\u4EA7\u54C1'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      }), _react2.default.createElement('div', { className: 'h90 flex column jc-center ai-center', __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        }
      }, _react2.default.createElement('div', { className: 'font24 c-ccc mb10 lh100 home-foot-text', __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, '\u561F\u561F\u597D\u4EAB\u8D37\u51FA\u54C1'), _react2.default.createElement('div', { className: 'font20 c-ccc lh100 home-foot-text', __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, 'DD Finance'))), _react2.default.createElement(_index3.Nav, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
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
                // err req res pathname query asPath isServer
                store = ctx.store, pathname = ctx.pathname, query = ctx.query, asPath = ctx.asPath;

                if (store.getState().home) {
                  _context.next = 14;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return _index2.http.get('home');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNvbm5lY3QiLCJ1dWlkIiwicmVkdXhQYWdlIiwiZ2V0SG9tZSIsImltZ1VybCIsImh0dHAiLCJFcnJvckZldGNoIiwiTGF5b3V0IiwiTmF2IiwiQnRuIiwiV3JhcExpbmsiLCJIb21lTWVzc2FnZSIsIkhvbWVMaW1pdCIsIkhvbWVMb2FuVHlwZXMiLCJQcm9kdWN0TGlzdCIsInV0aWwiLCJyZXF1aXJlIiwiaG9tZSIsInN0YXRlIiwibWVzc2FnZUxpc3QiLCJwcm9wcyIsImVyciIsInBvc2l0aW9uIiwidG9wIiwicmlnaHQiLCJoZWlnaHQiLCJtYXhIZWlnaHQiLCJib3JkZXJCb3R0b20iLCJ0dWlfbG9hbnNfYmFubmVyIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsImlkIiwiYmFubmVyIiwibGltaXRzIiwidHlwZXMiLCJob3RfbG9hbnMiLCJpbmRleCIsImhvdF9jYXJkcyIsImN0eCIsInN0b3JlIiwicGF0aG5hbWUiLCJxdWVyeSIsImFzUGF0aCIsImdldFN0YXRlIiwiZ2V0IiwiaG9tZUZldGNoIiwiaG9tZURhdGEiLCJkYXRhIiwiZGlzcGF0Y2giLCJpbnNwZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBRWhCLEFBQVM7O0FBQ1QsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEFBQVMsQUFBUTs7QUFDakIsQUFDRSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7Ozs7O0FBR0YsSUFBTSxPQUFOLEFBQU0sQUFBTzs7Z0RBRUosZ0JBQUE7TUFBQSxBQUFHLFlBQUgsQUFBRztTQUFZLEVBQUUsTUFBakIsQUFBZTtBQUF2QixBLENBQUEsRyxBQURBOzs7Ozs7Ozs7Ozs7OztrTixBQXNCQzttQkFDZSxDQUFBLEFBQUMsc0JB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RixBQUVXLEFBQ1Q7Y0FIRixBQUdPLEFBQ0w7WUFKRixBQUlLLEFBQ0g7a0JBTEYsQUFLVyxBQUNUOzZCQUFLLGNBQUEsVUFBTSxXQUFOLEFBQWdCO3NCQUFoQjt3QkFBQTtBQUFBO1NBQUEsRUFOUCxBQU1POztvQkFOUDtzQkF6REYsQUF5REUsQUFTQTtBQVRBO0FBQ0UsMEJBUUYsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQTtBQUFBO1NBbEVGLEFBa0VFLEFBRUUsb0RBQUEsQUFBSyxrQkFBYSxBQUFLLFVBQUwsQUFBZSxJQUFJLFVBQUEsQUFBQyxNQUFELEFBQU8sT0FBUDsrQkFDbkMsY0FBQSxTQUFLLEtBQUwsQUFBVTtzQkFBVjt3QkFBQSxBQUNFO0FBREY7U0FBQSxrQkFDRSxBQUFDLDhEQUFELEFBQWlCOztzQkFBakI7d0JBREYsQUFDRSxBQUNDO0FBREQ7QUFBQSx1QkFDVyxLQUFBLEFBQUssVUFBTCxBQUFlLFNBQXpCLEFBQWtDLDJDQUFTLFdBQUwsQUFBZTtzQkFBZjt3QkFBdEMsQUFBc0M7QUFBQTtTQUFBLElBSE4sQUFDbkMsQUFFbUU7QUF2RXpFLEFBb0VzQixBQU9wQixPQVBvQixtQkFPcEIsQUFBQzthQUFELEFBRUU7a0JBRkYsQUFFVyxBQUNUO2NBSEYsQUFHTyxBQUNMO1lBSkYsQUFJSyxBQUNIO2tCQUxGLEFBS1csQUFDVDs2QkFBSyxjQUFBLFVBQU0sV0FBTixBQUFnQjtzQkFBaEI7d0JBQUE7QUFBQTtTQUFBLEVBTlAsQUFNTzs7b0JBTlA7c0JBM0VGLEFBMkVFLEFBUUE7QUFSQTtBQUNFLDBCQU9GLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO3lCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUE7QUFBQTtTQURGLEFBQ0UsQUFDQSwrREFBQSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBO0FBQUE7U0F0Rk4sQUFDRSxBQW1GRSxBQUVFLEFBR0osaUNBQUEsQUFBQzs7b0JBQUQ7c0JBMUZKLEFBQ0UsQUF5RkUsQUFHTDtBQUhLO0FBQUE7Ozs7OzRHQXRIdUIsQTs7Ozs7bUJBQzNCO0FBRUU7QSx3QkFDRSxBLElBREYsQSxPQUFPLEEsVyxBQUNMLEksQUFESyxVLEFBQVUsUUFDZixBLElBRGUsQSxPQUFPLEEsUyxBQUN0QixJLEFBRHNCOztvQkFHckIsTUFBQSxBQUFNLFcsQUFBVzs7Ozs7Ozt1QkFFTSxhQUFBLEFBQUssSUFBTCxBQUFTLEE7O21CQUEzQjtBLHFDQUNBO0EsMkJBQVcsVUFBVSxBQUMzQixBOztzQkFBQSxBQUFNLFNBQVMsb0JBQWYsQUFBZSxBQUFROzs7Ozs7Z0RBRWpCO0Esc0JBQU0sS0FBQSxBQUFLLGlCO2lEQUNWLEVBQUUsS0FBRixBOzs7aURBR0osRUFBRSxVQUFGLFVBQVksT0FBWixPQUFtQixRQUFuQixBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBakJrQixBIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6IkQ6L1dPUksvcmVhY3Qtc3NyIn0=