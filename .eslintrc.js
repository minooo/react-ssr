const path = require('path')

module.exports = {
  root: true,
  globals: {
    moment: true,
    wx: true,
    flex: true,
    uuid: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  // https://npm.taobao.org/package/babel-eslint
  // babel-eslint 你使用 babel-eslint 的唯一理由就是你在使用类型检查工具，
  // 比如Flow，抑或使用了一些Babel支持的实验性的 但Eslint 还不支持的语法 。
  parser: 'babel-eslint',

  // https://npm.taobao.org/package/eslint-plugin-babel
  // eslint-plugin-babel 解决babel-eslint不能解决的使内置规则支持实验性语法特性的问题，
  // 总之这是一款和 babel-eslint 配套使用的 eslint 规则插件。
  plugins: [
    'babel',
  ],

  // https://npm.taobao.org/package/eslint-config-airbnb
  // airbnb 高度集成了 eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-jsx-a11y

  // https://npm.taobao.org/package/eslint-plugin-import
  // eslint-plugin-import 旨在解决 ES6 中 import/export 语法问题，和路径太长易拼错的问题。

  // https://github.com/yannickcr/eslint-plugin-react
  // eslint-plugin-react 一个指定的React 语法规则检查工具。

  // https://github.com/evcohen/eslint-plugin-jsx-a11y
  // eslint-plugin-jsx-a11y  对JSX 元素上可访问属性的静态检查 。
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },

  // https://eslint.org/docs/rules/
  // 0 1 2 -> off warn error
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'max-len': ['error', 200],
    'no-shadow': 'off', // 解构需要，比如 const { getUser } = this.props
    'no-return-assign': 'off', // 这与 react 中获取元素的方式冲突， ref = {ele => this.input = ele}
    'no-nested-ternary': 'off', // 习惯了在jsx语法各种三元操作了。。。

    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/prop-types': 0,
    'react/no-danger': 'off',
    'react/react-in-jsx-scope': 0,

    'jsx-a11y/anchor-is-valid': ['error', {
      components: [''],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
  },
}
