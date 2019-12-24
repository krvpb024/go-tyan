const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),
    ],
  },
}
