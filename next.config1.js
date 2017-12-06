const path = require('path')

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve.alias = {
        '@components': path.resolve(__dirname, 'src/js/1-components/index.js'),
        '@utils': path.resolve(__dirname, 'src/js/6-utils/index.js'),
        '@actions': path.resolve(__dirname, 'src/js/3-actions/index.js'),
        // 以前你可能这样引用 import { Nav } from '../../components'
        // 现在你可以这样引用 import { Nav } from 'components'
    }
    return config
  }
}