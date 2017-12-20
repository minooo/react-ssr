// 一个常见的`webpack`配置文件
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    antd_mobile_min: path.join(__dirname, '/static/scripts/just-generate-css/antd-mobile-min.js'),
    app_min: path.join(__dirname, '/static/scripts/just-generate-css/app-min.js'),
  }, // 已多次提及的唯一入口文件
  output: {
    path: path.join(__dirname, '/static/styles'),
    filename: '[name].js',
  },
  devtool: 'none',
  devServer: {
    contentBase: './public', // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true,
    hot: true,
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/,
    }, {
      test: /\.(eot|svg|ttf|woff).*$/,
      loader: 'url-loader',
      options: {
        limit: 15000,
      },
    },
    {
      test: /\.(gif|jpe?g|png|ico).*$/,
      loader: 'url-loader',
      options: {
        limit: 15000,
      },
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      }),
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } },
        ],
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
}
