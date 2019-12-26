const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const indexJsonLd = require('./src/jsonLd/index.json')
// const indexAuthor = require('./src/jsonLd/indexAuthor.json')
const indexBreadcrumbList = require('./src/jsonLd/indexBreadcrumbList.json')

module.exports = {
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        jsonLd:
          `<script type="application/ld+json">${JSON.stringify(indexJsonLd)}</script>` +
          // `<script type="application/ld+json">${JSON.stringify(indexAuthor)}</script>` +
          `<script type="application/ld+json">${JSON.stringify(indexBreadcrumbList)}</script>`,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
  },
}
