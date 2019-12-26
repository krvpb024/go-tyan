const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),
      new HtmlWebpackPlugin({
        minify: true,
        template: path.join(__dirname, 'public/index.html'),
      }),
    ],
  },
}
