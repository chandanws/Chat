const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    if (isProduction) {
      config.entry('index').add('babel-polyfill').end()
      config.optimization.minimize(true)
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })

    config.resolve.alias
      .set('@', resolve('src'))

    config.module
      .rule('svg')
      .exclude.add(resolve('./src/assets/icon'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
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
    extract: isProduction ? true : false,
    sourceMap: false,
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
    hot: true,
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    proxy: {
      '/api': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '',
        },
      }
    }
  }
}

