const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  chainWebpack: config => {
    config.entry('index').add('babel-polyfill').end()
    config.optimization.minimize(true)
    config.optimization.splitChunks({
      chunks: 'all'
    })
    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        data: `
              @import "@/assets/scss/index.scss";
              `
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    hotOnly: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '',
        },
        //ws: true,
      }
    }
  }
}
